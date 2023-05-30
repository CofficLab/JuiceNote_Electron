import { app } from 'electron'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import indexLogger from '../log/indexLogger'
import databaseLogger from '../log/databaseLogger'

// 根目录，对应打包后的 ...app/Contents/Resources/app
const ROOT_PATH = path.join(__dirname, '../..')

// 存放main、preload、ui三部分的代码
const DIST_PATH = path.join(ROOT_PATH, 'dist')

// 数据库目录
const DATABASE_PATH = path.join(ROOT_PATH, 'database')

// 打包后的预加载文件
const PRELOAD_FILE = path.join(DIST_PATH, 'preload/index.js')

// public路径
const PUBLIC_PATH = app.isPackaged ? DIST_PATH : path.join(ROOT_PATH, 'public')

// 仅在开发阶段有用，开发阶段ui部分的代码是通过url加载的
const URL = process.env.VITE_DEV_SERVER_URL as string

// 打包后的index.html路径
const INDEX_HTML_PATH = path.join(ROOT_PATH, 'index.html')

const LOG_PATH = path.join(ROOT_PATH, 'logs/main.log')

/**
 * 以下是用户数据的存储位置
 */

const User_Data_Path = path.join(app.getPath('userData'))
const Updates_Path = path.join(path.dirname(app.getPath('userData')),'Caches/kuaiyizhi-updater')
const Preferences_File_Path = path.join(User_Data_Path, 'config.json')
const Logs_Path = path.join(User_Data_Path, 'logs')

interface Preferences {
    databasePath: string
}

const defaultPreferences:Preferences = {
    databasePath: User_Data_Path
}

function initPreferences() {
    if (!existsSync(Preferences_File_Path)) {
        writeFileSync(Preferences_File_Path, JSON.stringify(defaultPreferences,null,2))
    }
}

function getPreferences(): Preferences {
    initPreferences()

    let configString = readFileSync(Preferences_File_Path, 'utf-8')
    let configObject = JSON.parse(configString)
    databaseLogger.info(`get-config \n ${Preferences_File_Path} \n`,typeof configObject, configObject)

    return configObject
}

function setPreferences(config: string) {
    initPreferences()

    let preferences:Preferences = JSON.parse(config)

    indexLogger.info('set-config，目标文件', Preferences_File_Path)
    indexLogger.info('set-config',typeof config, config)
    writeFileSync(Preferences_File_Path, JSON.stringify(preferences,null,2))
}

const Config = {
    ROOT_PATH,
    DIST_PATH,
    PUBLIC_PATH,
    PRELOAD_FILE,
    URL,
    DATABASE_PATH,
    LOG_PATH,
    INDEX_HTML_PATH,
    User_Data_Path,
    Updates_Path,
    Logs_Path,
    getPreferences,
    setPreferences
}

export default Config