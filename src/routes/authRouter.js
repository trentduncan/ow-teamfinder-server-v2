import express from 'express';

import authenticationController from '../_registry/authenticationController';
import passport from '../_registry/passport';

const router = express.Router();

router.use(passport.initialize());

router.post(
  '/login',
  (request, response, next) => {
    passport.authenticate('local', {
      session: false,
      failWithError: true
    })(request, response, next);
  },
  authenticationController.getToken
);

export default router;
