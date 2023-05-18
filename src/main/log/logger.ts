import log from 'electron-log'
import Config from '../config';
import { writeFileSync } from 'fs';

log.initialize({ preload: true });
log.transports.file.level = 'debug'
log.transports.file.resolvePathFn = () => Config.LOG_PATH;

writeFileSync(Config.LOG_PATH, '', 'utf8')

export default log