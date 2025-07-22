import styles from 'bundle:client.entry.css';
import client from 'bundle:client.entry.js';
import favicon from '~/assets/favicon.ico';
import logo from '~/assets/logo.svg';
import { useRequest } from '~/context.js';
import useI18n, { LocaleAlternates, getLocaleAlternates } from '~/i18n/index.js';
import AccountFlyout from './AccountFlyout.js';
import LocaleSelectorFlyout from './LocaleSelectorFlyout.js';

type LayoutProps = {
  title?: string;
  customLocaleAlternates?: LocaleAlternates;
  additionalScripts?: string[];
  children: JSX.Element;
};

const Layout = async ({ title, customLocaleAlternates, additionalScripts, children }: LayoutProps) => {
  const { locale, addLocalePrefix } = useI18n();
  const request = useRequest();
  const localeAlternates = customLocaleAlternates ?? getLocaleAlternates(request);
  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="turbo-refresh-method" content="morph" />
        <meta name="turbo-refresh-scroll" content="preserve" />
        <title>{[title, 'Velocity Boilerplate'].filter(Boolean).join(' | ')}</title>
        <link rel="icon" href={favicon} />
        <link rel="stylesheet" href={styles} />
        {Object.entries(localeAlternates).map(([eachLocale, eachUrl]) => (
          <link rel="alternate" hrefLang={eachLocale} href={eachUrl} />
        ))}
        <script async type="module" src={client} />
        {additionalScripts?.map(script => (
          <script async src={script} />
        ))}
      </head>
      <body class="min-h-screen bg-linear-to-br from-white to-blue-200">
        <div class="m-auto max-w-(--breakpoint-lg) p-6 sm:p-10">
          <header class="mb-6 flex items-center justify-between">
            <a href={addLocalePrefix('/')} class="flex items-center gap-6">
              <img src={logo} alt="Velocity" class="w-36" />
              <div class="hidden sm:block">
                <span class="font-bold">Velocity</span> Boilerplate
              </div>
            </a>
            <div class="flex items-center gap-1">
              <AccountFlyout />
              <LocaleSelectorFlyout localeAlternates={localeAlternates} />
            </div>
          </header>
          <main class="min-h-96 rounded-2xl bg-white p-8 shadow-2xl sm:p-10">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
