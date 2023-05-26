import { join } from "path"
import { app } from "electron"
import { copyFileSync, existsSync } from "fs"
import databaseLogger from "../log/databaseLogger"
import Config from "../models/Config"

function prepareDatabase() {
    databaseLogger.info('准备节点数据库')
    const databaseFileTemplate = join(Config.DATABASE_PATH, 'blueprint.db')
    const databasePath = Config.getPreferences().databasePath

    databaseLogger.info(`从配置读取的数据库目录: ${databasePath}`)

    const databaseFile = join(Config.getPreferences().databasePath, 'local.db')

    databaseLogger.info(`用户节点数据库: ${databaseFile}`)

    if (!existsSync(databaseFile)) {
        databaseLogger.info(`复制数据库文件到用户数据目录 \n ${databaseFileTemplate} \n ${databaseFile}`)
        copyFileSync(databaseFileTemplate, databaseFile)
    }
}

export default prepareDatabase