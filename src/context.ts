import { FastifyPluginAsync, FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import fp from 'fastify-plugin';
import { AsyncLocalStorage } from 'node:async_hooks';
import { User } from './plugins/auth.js';

const asyncLocalStorage = new AsyncLocalStorage();

type Context<T extends RouteGenericInterface> = {
  request: FastifyRequest<T>;
  reply: FastifyReply;
};

export const contextCreator: FastifyPluginAsync = fp(async server => {
  server.addHook('onRequest', (request, reply, done) => {
    if (request.url.startsWith('/assets/')) {
      done();
      return;
    }
    asyncLocalStorage.run({ request, reply }, done);
  });
});

export const useContext = <T extends RouteGenericInterface>() => asyncLocalStorage.getStore() as Context<T>;

export const useRequest = <T extends RouteGenericInterface>() => useContext<T>().request;

export const useReply = () => useContext().reply;

export const useUser = () => useRequest().user as User | undefined;
