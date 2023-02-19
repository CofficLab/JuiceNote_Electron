import fs from 'fs'
import path from "path"
import Variables from "./Variables"
var nconf = require('nconf');

class Config {
    static getConfigFilePath(): string {
        let configFilePath = path.join(Variables.markdownRootPath, 'config.json')

        if (!fs.existsSync(configFilePath)) {
            fs.writeFileSync(configFilePath, '{}')
        }

        return configFilePath
    }

    static get(key: string) {
        nconf.file({ file: Config.getConfigFilePath() });

        return nconf.get(key)
    }

    static set(key: string, value: string | string[]) {
        console.log('set', key, value)
        nconf.file({ file: Config.getConfigFilePath() });
        nconf.set(key, value)

        nconf.save();
    }
}

export default Config