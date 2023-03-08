import path from 'path'
import electron from 'electron'

const rootPath = electron.ipcRenderer.sendSync('get-app-path')
const publicPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'public')
const imagesPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'public/images')
const renderedHtmlPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'rendered')

export default {
    rootPath,
    imagesPath,
    publicPath,
    renderedHtmlPath
}