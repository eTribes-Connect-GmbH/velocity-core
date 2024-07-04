const config = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  baseUrl: process.env.BASE_URL!,
  port: parseInt(process.env.PORT!),
  logLevel: process.env.LOG_LEVEL!,
  basicAuth: {
    username: process.env.BASIC_AUTH_USERNAME!,
    password: process.env.BASIC_AUTH_PASSWORD!
  },
  auth: {
    baseUrl: process.env.AUTH_BASE_URL!,
    clientId: process.env.AUTH_CLIENT_ID!,
    clientSecret: process.env.AUTH_CLIENT_SECRET!,
    scopes: ['openid', 'profile', 'email']
  }
};

export default config;
