import mongoose from 'mongoose';

import config from '../config';
import Role from '../_registry/roleModel';

const roles = [
  { name: 'DPS', imgPath: '/overwatch-imgs/dps-icon.png' },
  { name: 'Tank', imgPath: '/overwatch-imgs/tank-icon.png' },
  { name: 'Support', imgPath: '/overwatch-imgs/support-icon.png' }
];

async function seedDatabase() {
  try {
    await mongoose.connect(config.db.url, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    // await mongoose.connection.db.dropDatabase()

    await Role.insertMany(roles);
    await Role.createIndexes();

    await mongoose.disconnect();
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    console.error(error);
  }
}

seedDatabase();
