import fastifyBasicAuth from '@fastify/basic-auth';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import config from '~/config.js';

const basicAuth: FastifyPluginAsync = fp(async server => {
  await server.register(fastifyBasicAuth, {
    authenticate: true,
    validate: async (username, password) => {
      if (username !== config.basicAuth.username || password !== config.basicAuth.password) {
        return new Error('Wrong username or password');
      }
      return undefined;
    }
  });
  server.addHook('onRequest', server.basicAuth);
});

export default basicAuth;
