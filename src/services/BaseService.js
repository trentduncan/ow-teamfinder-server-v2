const ERROR_INVALID_INPUT = 'ERROR_INVALID_INPUT';
const ERROR_PERMISSION_DENIED = 'ERROR_PERMISSION_DENIED';
const ERROR_UNEXPECTED = 'ERROR_UNEXPECTED';

export default class BaseService {
  constructor({ logger }) {
    this._logger = logger;
  }

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
    return error.message.startsWith(`${this.constructor.name}.ERROR_`)
      ? error
      : this.createErrorUnexpected();
  }

  _logTrace(payload, tag) {
    return this._logger.trace(payload, `${this.constructor.name}.${tag}`);
  }

  _logError(payload, tag) {
    return this._logger.error(payload, `${this.constructor.name}.${tag}`);
  }
}
