import faker from 'faker';
import mongoose from 'mongoose';

import config from '../config';
import Hero from '../_registry/heroModel';
import Player from '../_registry/playerModel';
import Role from '../_registry/roleModel';

const roles = [
  { name: 'DPS', imgPath: '/overwatch-imgs/dps-icon.png' },
  { name: 'Tank', imgPath: '/overwatch-imgs/tank-icon.png' },
  { name: 'Support', imgPath: '/overwatch-imgs/support-icon.png' }
];

const heroes = [
  {
    name: 'Doomfist',
    imgPath: '/overwatch-imgs/doomfist.png',
    role: 'DPS'
  },
  { name: 'Genji', imgPath: '/overwatch-imgs/genji.png', role: 'DPS' },
  { name: 'McCree', imgPath: '/overwatch-imgs/mccree.png', role: 'DPS' },
  { name: 'Pharah', imgPath: '/overwatch-imgs/pharah.png', role: 'DPS' },
  { name: 'Reaper', imgPath: '/overwatch-imgs/reaper.png', role: 'DPS' },
  {
    name: 'Soldier: 76',
    imgPath: '/overwatch-imgs/soldier76.png',
    role: 'DPS'
  },
  { name: 'Sombra', imgPath: '/overwatch-imgs/sombra.png', role: 'DPS' },
  { name: 'Tracer', imgPath: '/overwatch-imgs/tracer.png', role: 'DPS' },
  { name: 'Bastion', imgPath: '/overwatch-imgs/bastion.png', role: 'DPS' },
  { name: 'Hanzo', imgPath: '/overwatch-imgs/hanzo.png', role: 'DPS' },
  { name: 'Junkrat', imgPath: '/overwatch-imgs/junkrat.png', role: 'DPS' },
  { name: 'Mei', imgPath: '/overwatch-imgs/mei.png', role: 'DPS' },
  { name: 'Torbjörn', imgPath: '/overwatch-imgs/torb.png', role: 'DPS' },
  { name: 'Widowmaker', imgPath: '/overwatch-imgs/widow.png', role: 'DPS' },
  { name: 'D Va', imgPath: '/overwatch-imgs/dva.png', role: 'Tank' },
  { name: 'Orisa', imgPath: '/overwatch-imgs/orisa.png', role: 'Tank' },
  { name: 'Reinhardt', imgPath: '/overwatch-imgs/rein.png', role: 'Tank' },
  { name: 'Roadhog', imgPath: '/overwatch-imgs/roadhog.png', role: 'Tank' },
  { name: 'Winston', imgPath: '/overwatch-imgs/winston.png', role: 'Tank' },
  { name: 'Zarya', imgPath: '/overwatch-imgs/zarya.png', role: 'Tank' },
  { name: 'Ana', imgPath: '/overwatch-imgs/ana.png', role: 'Support' },
  {
    name: 'Brigitte',
    imgPath: '/overwatch-imgs/brigette.png',
    role: 'Support'
  },
  { name: 'Lúcio', imgPath: '/overwatch-imgs/lucio.png', role: 'Support' },
  { name: 'Mercy', imgPath: '/overwatch-imgs/mercy.png', role: 'Support' },
  { name: 'Moira', imgPath: '/overwatch-imgs/moira.png', role: 'Support' },
  {
    name: 'Symmetra',
    imgPath: '/overwatch-imgs/symmetra.png',
    role: 'Support'
  },
  {
    name: 'Zenyatta',
    imgPath: '/overwatch-imgs/zenyatta.png',
    role: 'Support'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(config.db.url, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    await mongoose.connection.db.dropDatabase();

    const seededRoles = await Role.insertMany(roles);
    await Role.createIndexes();

    console.log('Seeded Roles and created Indexes');

    const roleIdsKeyedByNames = seededRoles.reduce((acc, role) => {
      acc[role.name] = role._id;
      return acc;
    }, {});

    const seededHeroes = await Hero.insertMany(
      heroes.map(hero => ({ ...hero, role: roleIdsKeyedByNames[hero.role] }))
    );
    await Hero.createIndexes();

    console.log('Seeded Heroes and created Indexes');

    const heroIdsKeyedByNames = seededHeroes.reduce((acc, hero) => {
      acc[hero.name] = hero._id;
      return acc;
    }, {});

    const newPlayers = [];
    for (let i = 0; i < faker.random.number({ min: 5, max: 15 }); i++) {
      newPlayers.push(
        generateRandomPlayer(
          heroIdsKeyedByNames,
          'bronze',
          roleIdsKeyedByNames,
          seededHeroes
        )
      );
    }
    for (let i = 0; i < faker.random.number({ min: 5, max: 15 }); i++) {
      newPlayers.push(
        generateRandomPlayer(
          heroIdsKeyedByNames,
          'gold',
          roleIdsKeyedByNames,
          seededHeroes
        )
      );
    }
    for (let i = 0; i < faker.random.number({ min: 5, max: 15 }); i++) {
      newPlayers.push(
        generateRandomPlayer(
          heroIdsKeyedByNames,
          'platinum',
          roleIdsKeyedByNames,
          seededHeroes
        )
      );
    }
    for (let i = 0; i < faker.random.number({ min: 5, max: 15 }); i++) {
      newPlayers.push(
        generateRandomPlayer(
          heroIdsKeyedByNames,
          'diamond',
          roleIdsKeyedByNames,
          seededHeroes
        )
      );
    }
    for (let i = 0; i < faker.random.number({ min: 5, max: 15 }); i++) {
      newPlayers.push(
        generateRandomPlayer(
          heroIdsKeyedByNames,
          'master',
          roleIdsKeyedByNames,
          seededHeroes
        )
      );
    }
    for (let i = 0; i < faker.random.number({ min: 5, max: 15 }); i++) {
      newPlayers.push(
        generateRandomPlayer(
          heroIdsKeyedByNames,
          'grandmaster',
          roleIdsKeyedByNames,
          seededHeroes
        )
      );
    }

    await Player.insertMany(newPlayers);
    await Player.createIndexes();

    console.log('Seeded Players and created Indexes');

    await mongoose.disconnect();
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    console.error(error);
  }
}

function generateRandomPlayer(
  heroIdsKeyedByNames,
  rank,
  roleIdsKeyedByNames,
  seededHeroes
) {
  const rankOptions = {
    bronze: { min: 1, max: 1499 },
    silver: { min: 1500, max: 1999 },
    gold: { min: 2000, max: 2499 },
    platinum: { min: 2500, max: 2999 },
    diamond: { min: 3000, max: 3499 },
    master: { min: 3500, max: 3999 },
    grandmaster: { min: 4000, max: 5000 }
  };

  const roleNames = roles.map(role => role.name);

  const playerRoles = [];

  for (let name of roleNames) {
    if (playerRoles.length === 2) break;
    if (faker.random.boolean()) playerRoles.push(roleIdsKeyedByNames[name]);
  }

  if (playerRoles.length === 0) {
    playerRoles.push(roleIdsKeyedByNames[faker.random.arrayElement(roleNames)]);
  }

  const playerHeroes = [];

  for (let role of playerRoles) {
    let heroNamesWithSpecificRole = seededHeroes
      .filter(hero => hero.role === role)
      .map(hero => hero.name);

    const heroesToAdd = faker.random.number({ min: 2, max: 6 });
    for (let i = 0; i < heroesToAdd; i++) {
      const randomHeroName = faker.random.arrayElement(
        heroNamesWithSpecificRole
      );

      playerHeroes.push(heroIdsKeyedByNames[randomHeroName]);

      heroNamesWithSpecificRole = heroNamesWithSpecificRole.filter(
        name => name !== randomHeroName
      );
    }
  }

  return {
    email: faker.internet.email(),
    skillRating: faker.random.number(rankOptions[rank]),
    password: '$2a$10$zA2cQsPP7oul12j7PIv0/eiWZrX16oKaEzurG6NHQtHBUXU7DQgha',
    roles: playerRoles,
    heroes: playerHeroes
  };
}

// TODO: pull out the logic of making multiple loops, and clean this file up

// function createMultiplePlayers(
//   options,
//   heroIdsKeyedByNames,
//   rank,
//   roleIdsKeyedByNames,
//   seededHeroes
// ) {

// }

seedDatabase();
