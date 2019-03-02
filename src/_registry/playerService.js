import logger from './logger';
import PlayerService from '../services/PlayerService';
import playerModel from './playerModel';

export default new PlayerService({ logger, playerModel });
