import log from 'electron-log'
import { writeFileSync } from 'fs';
import Config from '../models/Config';

log.initialize({ preload: true });
log.transports.file.level = 'debug'
log.transports.file.resolvePathFn = () => Config.LOG_PATH;

writeFileSync(Config.LOG_PATH, '', 'utf8')

export default log