import AuthenticationService from '../services/AuthenticationService';
import config from '../config';
import logger from './logger';
import playerModel from './playerModel';

export default new AuthenticationService({
  playerModel,
  tokenExpiry: config.jwt.expiry,
  tokenSecret: config.jwt.secret,
  logger
});
