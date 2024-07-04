import { render } from '@nanoweb/jsx';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FastifyReply {
    render: (element: JSX.Element) => Promise<FastifyReply>;
  }
}

const renderer: FastifyPluginAsync = fp(async server => {
  server.decorateReply('render', async function (element: JSX.Element) {
    const html = await render(element);
    if (this.sent) {
      return this;
    }
    if (!this.hasHeader('Content-Type')) {
      this.header('Content-Type', 'text/html');
    }
    return this.send(html);
  });
});

export default renderer;
