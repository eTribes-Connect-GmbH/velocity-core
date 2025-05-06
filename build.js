import esbuild from 'esbuild';
import { fork, spawn } from 'node:child_process';
import { existsSync, rmSync, watch } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const buildDir = `.build/${process.env.NODE_ENV.toLowerCase()}`;
const destination = `${buildDir}/index.js`;

// esbuild configuration

const commonOptions = {
  format: 'esm',
  treeShaking: true,
  bundle: true,
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
  loader: {
    '.html': 'text',
    '.svg': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.webp': 'file',
    '.ico': 'file',
    '.txt': 'text',
    '.woff': 'file',
    '.woff2': 'file',
    '.entry.js': 'file',
    '.entry.css': 'file'
  }
};

const bundleMapping = {
  name: 'path-mapping',
  setup(build) {
    build.onResolve({ filter: /^bundle:/ }, args => ({
      path: path.resolve(`${buildDir}/assets/${args.path.replace(/^bundle:/, '')}`)
    }));
  }
};

const clientOptions = {
  ...commonOptions,
  minify: true,
  sourcemap: true,
  outdir: `${buildDir}/assets/`,
  outbase: 'src/assets/',
  platform: 'browser',
  splitting: true
};

const serverOptions = {
  ...commonOptions,
  target: 'esnext',
  minify: isProduction,
  sourcemap: isProduction ? 'external' : 'inline',
  entryPoints: ['./src/index.ts'],
  jsxImportSource: '@nanoweb/jsx',
  jsx: 'transform',
  jsxFactory: 'createElement',
  jsxFragment: 'fragment',
  assetNames: 'assets/[name]-[hash]',
  publicPath: '/',
  outfile: destination,
  platform: 'node',
  plugins: [bundleMapping],
  banner: { js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);" }
};

// Build execution

const runService = (command, args, stdout = 'inherit') =>
  spawn(command, args.split(' '), {
    stdio: ['pipe', !isDevelopment || process.env.CI ? 'inherit' : stdout, 'inherit']
  });

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}

const waitForFile = async filePath => {
  while (!existsSync(filePath)) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
};

if (isProduction) {
  rmSync(buildDir, { recursive: true, force: true });
}

const tailwindPath = `${buildDir}/assets/style.css`;
runService(
  './node_modules/.bin/tailwindcss',
  `${isDevelopment ? '-w' : '-m'} -i ./src/assets/style.css -o ${tailwindPath}`,
  'ignore'
);

await waitForFile(tailwindPath);

const clientBuildDone = new Deferred();
const getClientBuild = async () =>
  esbuild.context({
    ...clientOptions,
    // Any file with a `.entry.ts` suffix is considered to be an entrypoint for
    // the client build
    entryPoints: (await readdir('./src/', { recursive: true }))
      .filter(filename => filename.endsWith('.entry.ts'))
      .map(filename => `./src/${filename}`),
    plugins: [
      {
        name: 'build',
        setup(build) {
          build.onEnd(clientBuildDone.resolve);
        }
      },
      bundleMapping
    ]
  });

let clientBuild = await getClientBuild();
const serverBuild = await esbuild.context(serverOptions);

if (isDevelopment) {
  await clientBuild.watch();
  // We have to wait for the client build to finish before the build result is
  // referenced by the server build.
  await clientBuildDone.promise;
  await serverBuild.watch();
  await waitForFile(destination);
  fork(destination, {
    execArgv: ['--inspect', '--enable-source-maps', '--watch', '--no-warnings', '--watch-preserve-output']
  });
  console.log('Dev server listening on http://localhost:8888');

  // The TypeScript transpilation is done by esbuild but we still want to check the types
  runService('./node_modules/.bin/tsc', '--noEmit --watch -p tsconfig.json --preserveWatchOutput --pretty');
  watch('./src', { recursive: true }, async (event, filename) => {
    if (event === 'rename' && filename.endsWith('.entry.ts')) {
      clientBuild.dispose();
      clientBuild = await getClientBuild();
      await clientBuild.watch();
    }
  });
} else {
  await clientBuild.rebuild();
  await clientBuildDone.promise;
  await serverBuild.rebuild();
  clientBuild.dispose();
  serverBuild.dispose();
}
