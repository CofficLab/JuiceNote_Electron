import path from "path"
import Variables from "./Variables"
var nconf = require('nconf');

class Config {
    static getConfigFilePath(): string {
        return path.join(Variables.markdownRootPath, 'config.json')
    }

    static get(key: string) {
        nconf.file({ file: Config.getConfigFilePath() });

        return nconf.get(key)
    }

    static set(key: string, value: string | string[]) {
        nconf.file({ file: Config.getConfigFilePath() });
        nconf.set(key, value)

        nconf.save();
    }
}

export default Config