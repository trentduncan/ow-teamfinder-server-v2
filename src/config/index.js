if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV =
    process.env.NODE_ENV ||
    require('dotenv').config({
      path: `../../.env.${process.env.NODE_ENV}`
    });
}

export default {
  jwt: {
    expiry: process.env.JWT_EXPIRY || '1d',
    secret: process.env.JWT_SECRET || 'test'
  },
  clientOrigin: process.env.CLIENT_ORIGIN || 'localhost:3000',
  db: {
    url: process.env.DATABASE_URL || 'mongodb://localhost/ow-teamfinder-backend'
  },
  logger: {
    level: process.env.LOG_LEVEL
  },
  port: process.env.PORT || 8080
};
