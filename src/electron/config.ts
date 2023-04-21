import { app } from 'electron'
import path from 'path'

const ROOT_PATH = {
    dist: path.join(__dirname, '../..'),
    public: path.join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

// Here, you can also use other preload
const preload = path.join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL as string
const indexHtml = path.join(ROOT_PATH.dist, 'src/ui/index.html')

export {
    ROOT_PATH,
    preload,
    url,
    indexHtml
}