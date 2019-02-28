import mongoose from 'mongoose';

import config from '../config';

export default {
  connect: () => {
    try {
      return mongoose.connect(config.db.url, { useNewUrlParser: true });
    } catch (error) {
      console.error('Mongoose failed to connect');
      console.error(error);
    }
  },
  disconnect: () => {
    return mongoose.disconnect();
  }
};
