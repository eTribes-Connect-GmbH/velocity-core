import fastifyJwt from '@fastify/jwt';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import createJwksGetter from 'get-jwks';
import config from '~/config';
import useI18n from '~/i18n';
import getNamesFromEmail from '~/utilities/getNamesFromEmail';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  optIn: boolean;
  emailVerified: boolean;
};

const formatUser = (payload: any): User => {
  const namesFromEmail = getNamesFromEmail(payload.email);
  return {
    id: payload.sub,
    email: payload.email,
    firstName: payload.given_name ?? payload.user_metadata?.firstname ?? namesFromEmail?.firstName ?? payload.email,
    lastName: payload.family_name ?? payload.user_metadata?.lastname ?? namesFromEmail?.lastName,
    optIn: payload.user_metadata?.optin,
    emailVerified: payload.email_verified
  };
};

const jwksGetter = createJwksGetter({ issuersWhitelist: [config.auth.baseUrl] });

const auth: FastifyPluginAsync = fp(async localePrefixedRouter => {
  localePrefixedRouter.get<{ Params: { type: 'login' | 'register' } }>(
    '/auth/:type(login|register)',
    (request, reply) => {
      const { locale, addLocalePrefix } = useI18n();
      const params = {
        response_type: 'code',
        client_id: config.auth.clientId,
        scope: config.auth.scopes.join(' '),
        redirect_uri: `${config.baseUrl}${addLocalePrefix('/auth/callback')}`,
        prompt: 'login',
        ui_locales: locale,
        ...(request.params.type === 'register' && { screen_hint: 'signup' })
      };
      reply.redirect(`${config.auth.baseUrl}/authorize?${new URLSearchParams(params).toString()}`);
    }
  );
  localePrefixedRouter.get<{ Querystring: { code?: string } }>('/auth/callback', async (request, reply) => {
    if (!request.query.code) {
      throw new Error('Auth code missing');
    }
    const { addLocalePrefix } = useI18n();
    const payload = {
      grant_type: 'authorization_code',
      code: request.query.code,
      redirect_uri: `${config.baseUrl}${addLocalePrefix('/auth/callback')}`
    };
    const tokenResponse = await fetch(`${config.auth.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${config.auth.clientId}:${config.auth.clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams(payload).toString()
    });
    if (!tokenResponse.ok) {
      throw new Error('Error fetching token');
    }
    const { id_token: token } = await tokenResponse.json();
    reply.setCookie('token', token, {
      path: '/',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      secure: !config.isDevelopment
    });
    // const user = formatUser(localePrefixedRouter.jwt.decode<any>(token).payload);
    reply.redirect(addLocalePrefix('/'));
  });
  localePrefixedRouter.get('/auth/logout', (_request, reply) => {
    reply.clearCookie('token');
    const { addLocalePrefix } = useI18n();
    reply.redirect(addLocalePrefix('/'));
  });
  localePrefixedRouter.register(fastifyJwt, {
    cookie: { cookieName: 'token', signed: false },
    decode: { complete: true },
    secret: (_request: unknown, { header, payload }: any) =>
      jwksGetter.getPublicKey({ kid: header.kid, domain: payload.iss, alg: header.alg }),
    formatUser
  });
  localePrefixedRouter.addHook('onRequest', async (request, reply) => {
    if (request.url.startsWith('/assets/')) {
      return;
    }
    try {
      // populates request.user with jwt payload or throws for missing or invalid token
      await request.jwtVerify();
    } catch {
      if (request.cookies.token) {
        // clean up old or corrupted token
        reply.clearCookie('token');
      }
    }
  });
});

export default auth;
