import BaseService from './BaseService';

export default class PlayerService extends BaseService {
  constructor({ logger, playerModel }) {
    super({ logger });
    this._playerModel = playerModel;
  }

  async getAll(parameters) {
    try {
      this._logTrace(parameters, 'getAll/input');

      let players = await this._playerModel.find();

      players = players.map(player => player.serialize());

      this._logTrace(players, 'getAll/output');

      return players;
    } catch (error) {
      this._logTrace(error, 'getAll/error');
      throw this._normalizeError(error);
    }
  }
}
