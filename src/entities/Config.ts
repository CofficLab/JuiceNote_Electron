import fs from "fs"
import path from "path"
import FileTree from "../tools/FileTree"
import BookNode from "./BookNode"
import Id from "./Id"
import Variables from "./Variables"

interface LooseObject {
    [key: string]: any
}

class Settings {
    children: object = {}

    constructor(config: object) {
        if (config.children != undefined) {
            this.children = config.children
        }
    }
}

class Config {
    children: [] = []

    static getConfigFilePath(): string {
        return path.join(Variables.markdownRootPath, 'config.json')
    }
    static createConfigFile(config: object) {
        fs.writeFileSync(Config.getConfigFilePath(), JSON.stringify(config, null, 2))
    }

    static getChildren(id: string) {
        let settings = Config.getSettings()
        let childrenSettings: LooseObject = settings.children
        let childrenSetting = Object.getOwnPropertyDescriptor(childrenSettings, id)


        childrenSettings[id] = id.split('@')
        settings.children = childrenSettings
        Config.updateSettings(settings)


        return null
    }

    static getSettings(): Settings {
        if (!fs.existsSync(this.getConfigFilePath())) {
            Config.createConfigFile({ children: {} })
            return new Settings({})
        }

        let json = fs.readFileSync(this.getConfigFilePath()).toString()
        if (json == "") {
            return new Settings({})
        }

        let config = JSON.parse(json)
        let settings = new Settings(config)

        return settings
    }

    static updateSettings(settings: Settings) {
        console.log('更新配置', settings)
        fs.writeFileSync(Config.getConfigFilePath(), JSON.stringify(settings, null, 2))
    }
}

export default Config