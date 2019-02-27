if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV =
    process.env.NODE_ENV ||
    require('dotenv').config({
      path: `../../.env.${process.env.NODE_ENV}`
    });
}

export default {
  db: {
    url: process.env.DATABASE_URL || 'mongodb://localhost/ow-teamfinder-backend'
  },
  port: process.env.PORT || 8080,
  clientOrigin: process.env.CLIENT_ORIGIN || 'localhost:3000'
};
