const ERROR_INVALID_INPUT = 'ERROR_INVALID_INPUT';
const ERROR_PERMISSION_DENIED = 'ERROR_PERMISSION_DENIED';
const ERROR_UNEXPECTED = 'ERROR_UNEXPECTED';

export default class EntityController {
  constructor({ entityService, logger }) {
    this._entityService = entityService;
    this._logger = logger;
  }

  getAll = async (req, res, next) => {
    try {
      this._logTrace(req.query, 'getAll/input');

      const entities = await this._entityService.getAll(req.query);

      this._logTrace({ entities }, 'getAll/output');

      res.status(200).json(entities);
    } catch (error) {
      this._logError(error, 'getAll/error');
      next(this._normalizeError(error));
    }
  };

  createErrorPermissionDenied(qualifier) {
    return new Error(
      `${this.constructor.name}.${ERROR_PERMISSION_DENIED}${
        qualifier ? `/${qualifier}` : ''
      }`
    );
  }

  createErrorInvalidInput(qualifier) {
    return new Error(
      `${this.constructor.name}.${ERROR_INVALID_INPUT}${
        qualifier ? `/${qualifier}` : ''
      }`
    );
  }

  createErrorUnexpected(qualifier) {
    return new Error(
      `${this.constructor.name}.${ERROR_UNEXPECTED}${
        qualifier ? `/${qualifier}` : ''
      }`
    );
  }

  _normalizeError(error) {
    error = /\w+\.ERROR_/.test(error.message)
      ? new Error(error.message.replace(/\w+\.ERROR_/, 'ERROR_'))
      : new Error(ERROR_UNEXPECTED);
    if (error.message.startsWith('ERROR_INVALID_INPUT')) {
      error.status = 400;
      return error;
    }
    if (error.message.startsWith('ERROR_PERMISSION_DENIED')) {
      error.status = 403;
      return error;
    }
    return error;
  }

  _logTrace(payload, tag) {
    return this._logger.trace(payload, `${this.constructor.name}.${tag}`);
  }

  _logError(payload, tag) {
    return this._logger.error(payload, `${this.constructor.name}.${tag}`);
  }
}
