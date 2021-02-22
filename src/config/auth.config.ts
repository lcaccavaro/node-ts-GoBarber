export default {
  jwt: {
    secret: process.env.APP_SECRET || 'fake',
    expiresIn: '1d',
  },
};
