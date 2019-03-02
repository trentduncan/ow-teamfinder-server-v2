import BaseController from './BaseController';

export default class EntityController extends BaseController {
  constructor({ entityService, logger }) {
    super({ logger });
    this._entityService = entityService;
  }

  getAll = async (req, res, next) => {
    try {
      this._logTrace(req.params, 'getAll/input');

      const entities = await this._entityService.getAll();

      this._logTrace({ entities }, 'getAll/output');

      res.status(200).json(entities);
    } catch (error) {
      this._logError(error, 'getAll/error');
      next(this._normalizeError(error));
    }
  };
}
