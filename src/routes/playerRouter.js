import express from 'express';

import Player from '../_registry/playerModel';
import playerController from '../_registry/playerController';
// const passport = require('passport');

// const options = {session: false, failWithError: true};
// const localAuth = passport.authenticate('local', options);

const router = express.Router();

// const jwtAuth = passport.authenticate('jwt', {
//   session: false,
//   failWithError: true
// });

router.get('/', playerController.getAll);

router.get('/:username', (req, res, next) => {
  const { id } = req.user;
  return Player.findById(id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(
    field => !(field in req.body.players)
  );

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }
  const stringFields = ['username', 'password'];
  const notString = stringFields.find(
    field =>
      field in req.body.players && typeof req.body.players[field] !== 'string'
  );
  if (notString) {
    const err = new Error('Incorrect field type: expected string');
    err.status = 422;
    return next(err);
  }

  const trimmedFields = ['username', 'password'];
  const nonTrimmedFields = trimmedFields.find(
    field => req.body.players[field].trim() !== req.body.players[field]
  );
  if (nonTrimmedFields) {
    const err = new Error(
      'username or password cannot start or end with whitespace'
    );
    err.status = 422;
    return next(err);
  }

  const {
    username,
    password,
    skillRating,
    roles,
    heroPool,
    email
  } = req.body.players;

  return Player.hashPassword(password)
    .then(digest => {
      const newPlayer = {
        username,
        password: digest,
        skillRating: Number(skillRating),
        roles,
        heroPool,
        email
      };
      return Player.create(newPlayer);
    })
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
      next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const { id, username } = req.user;
  const { skillRating, roles, heroPool, email } = req.body.updatedPlayer;

  const updatedPlayer = {
    username,
    skillRating,
    roles,
    heroPool,
    email
  };

  return Player.findByIdAndUpdate(id, updatedPlayer, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

router.delete('/', (req, res, next) => {
  const { id } = req.user;
  return Player.findByIdAndRemove(id)
    .then(data => {
      if (data) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

export default router;
