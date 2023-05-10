import { app } from 'electron'
import path from 'path'

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

const Config = {
    ROOT_PATH,
    DIST_PATH,
    PUBLIC_PATH,
    PRELOAD_FILE,
    URL,
    DATABASE_PATH,
    LOG_PATH,
    INDEX_HTML_PATH
}

export default Config