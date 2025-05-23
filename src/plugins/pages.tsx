import { FastifyPluginAsync } from 'fastify';
import FormPage from '~/pages/FormPage.js';
import StartPage from '~/pages/StartPage.js';

const pages: FastifyPluginAsync = async localePrefixedRouter => {
  localePrefixedRouter.get('/', (_request, reply) => reply.render(<StartPage />));
  localePrefixedRouter.route({
    method: ['GET', 'POST'],
    url: '/form',
    handler: (_request, reply) => reply.render(<FormPage />)
  });
};

export default pages;
