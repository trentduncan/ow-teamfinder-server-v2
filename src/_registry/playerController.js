import Controller from '../controllers/EntityController';
import logger from './logger';
import playerService from './playerService';

export default new Controller({ entityService: playerService, logger });
