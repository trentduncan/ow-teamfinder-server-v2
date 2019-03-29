import jwt from 'jsonwebtoken';

import { isBlank, isString, omit } from '../utils/lodash';
import BaseService from './BaseService';

export const ERROR_INVALID_CREDENTIALS = 'ERROR_INVALID_CREDENTIALS';

export default class AuthenticationService extends BaseService {
  static ERROR_INVALID_CREDENTIALS = ERROR_INVALID_CREDENTIALS;

  constructor({ playerModel, tokenExpiry, tokenSecret, logger }) {
    super({ logger });
    this._tokenExpiry = tokenExpiry;
    this._tokenSecret = tokenSecret;
    this._playerModel = playerModel;
  }

  async authenticate(parameters) {
    try {
      this._logTrace(omit(parameters, ['password']), 'authenticate/input');

      const { email, password } = parameters;

      if (!isString(email) || isBlank(email)) {
        throw this.createErrorInvalidInput('parameters.email');
      }

      if (!isString(password) || isBlank(password)) {
        throw this.createErrorInvalidInput('parameters.password');
      }

      let player = await this._playerModel.findOne({ email });

      if (!player) {
        throw this.createErrorPermissionDenied();
      }

      const isValid = await player.validatePassword(password);

      if (!isValid) {
        throw this.createErrorPermissionDenied();
      }

      const token = this.generateToken(player);

      player = player.serialize();

      this._logTrace({ player, token }, 'authenticate/output');

      return { player, token };
    } catch (error) {
      this._logError(error, 'authenticate/error');
      throw this._normalizeError(error);
    }
  }

  generateToken(player) {
    // can we just use player:player here instead?
    return jwt.sign({ user: player }, this._tokenSecret, {
      subject: player.email,
      expiresIn: this._tokenExpiry
    });
  }
}
