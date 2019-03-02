import { isError, stringify } from './lodash';

const ERROR_UNEXPECTED = 'ERROR_UNEXPECTED';

const methods = ['trace', 'error', 'silent'];

export default class Logger {
  static ERROR_UNEXPECTED = ERROR_UNEXPECTED;

  static LEVEL_TRACE = 0;
  static LEVEL_ERROR = 1;
  static LEVEL_SILENT = 2;

  constructor({ console, level }) {
    this._console = console;
    this._level = methods[level] ? level : Logger.LEVEL_TRACE;
  }

  trace() {
    return this.log(Logger.LEVEL_TRACE, ...arguments);
  }

  error() {
    return this.log(Logger.LEVEL_ERROR, ...arguments);
  }

  async log(level, payload, tag) {
    if (this._skip(level)) return;
    this._console(this._format(level, payload, tag));
  }

  _skip(level) {
    return (
      this._level === Logger.LEVEL_SILENT ||
      level < this._level ||
      !methods[level]
    );
  }

  _format(level, payload, tag) {
    return stringify(
      {
        level: methods[level].toUpperCase(),
        timestamp: new Date().toISOString(),
        tag,
        payload: isError(payload)
          ? payload.stack.split('\n').map(line => line.trim())
          : payload
      },
      null,
      2
    );
  }
}
