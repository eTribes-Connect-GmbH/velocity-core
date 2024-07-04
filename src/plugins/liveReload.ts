import { FastifyPluginAsync } from 'fastify';

const liveReload: FastifyPluginAsync = async server => {
  // We needed a *simple* way to inform the browser that the server is
  // restarting. So we provide an endpoint that never finishes unless the server
  // restarts. The client bundle calls this endpoint and once the request gets
  // terminated by the server the client bundle knows that a restart is in
  // process.
  server.get('/_closing', () => {});
  // The client then polls the following endpoint to find out when the server is
  // available for new requests again.
  server.get('/_ready', (_, reply) => reply.send('OK'));
};

export default liveReload;
