import path from 'path'
import electron from 'electron'

const markdownRootPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'markdown')
const renderedHtmlPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'rendered')
const configFilePath = path.join(markdownRootPath, 'config.json')
const nconf = require('nconf').use('file', { file: configFilePath });

const get = (key: string) => nconf.get(key)
const set = function (key: string, value: string | string[]) {
    console.log('set', key, value)
    nconf.set(key, value)
    nconf.save();
}

export default {
    get,
    set,
    markdownRootPath,
    configFilePath,
    renderedHtmlPath
}