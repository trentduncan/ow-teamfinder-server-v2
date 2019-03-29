import { Strategy as LocalStrategy } from 'passport-local';

import authenticationService from './authenticationService';
import AuthenticationService, {
  ERROR_INVALID_CREDENTIALS
} from '../services/AuthenticationService';
import {
  ERROR_INVALID_INPUT,
  ERROR_PERMISSION_DENIED,
  ERROR_UNEXPECTED
} from '../services/BaseService';
import passport from 'passport';

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (request, username, password, done) => {
      try {
        const { player, token } = await authenticationService.authenticate({
          email: username,
          password
        });
        request.token = token;
        done(null, player);
      } catch (error) {
        if (
          [
            `${AuthenticationService.name}.${ERROR_INVALID_INPUT}`,
            `${AuthenticationService.name}.${ERROR_PERMISSION_DENIED}`
          ].includes(error.message)
        ) {
          console.log('gets here', ERROR_INVALID_CREDENTIALS);
          done(null, false, { message: ERROR_INVALID_CREDENTIALS });
          return;
        } else {
          done(null, false, {
            message: ERROR_UNEXPECTED
          });
          return;
        }
      }
    }
  )
);

export default passport;
