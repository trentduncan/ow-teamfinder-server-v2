import config from '../config';
import Logger from '../utils/Logger';

export default new Logger({
  console: console.log.bind(console),
  level: Logger[`LEVEL_${config.logger.level || 'TRACE'}`]
});
