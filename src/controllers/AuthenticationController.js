export default class AuthenticationController {
  constructor({ logger }) {
    this._logger = logger;
  }

  getToken = async (request, response, next) => {
    const { player, token } = request;

    this._logTrace({ player, token }, 'getToken/info');

    response.status(200).json(token);
  };

  _logTrace(payload, tag) {
    return this._logger.trace(payload, `${this.constructor.name}.${tag}`);
  }
}
