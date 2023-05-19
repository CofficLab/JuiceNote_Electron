import { join } from "path"
import Config from "./config"
import { app } from "electron"
import { copyFileSync, existsSync } from "fs"
import databaseLogger from "../log/databaseLogger"

function prepareDatabase() {
    const databaseFileTemplate = join(Config.DATABASE_PATH, 'local.db')
    const databaseFile = join(app.getPath('userData'), 'local.db')

    if (!existsSync(databaseFile)) {
        databaseLogger.info(`复制数据库文件到用户数据目录 \n ${databaseFileTemplate} \n ${databaseFile}`)
        copyFileSync(databaseFileTemplate, databaseFile)
    }

    databaseLogger.info(`用户节点数据库 \n ${databaseFile}`)
}

export default prepareDatabase