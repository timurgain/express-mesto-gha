const config = {
  app: {
    port: 3000,
    name: 'express-mesto',
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'mestodb',
  },
  jwt: {
    secretKey: 'asdasd3esdwq23',
  },
};

module.exports = config;
