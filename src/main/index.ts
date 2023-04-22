import { createWindow } from './window'
import { ipcMain } from 'electron'
import { app, win } from './app'
import Config from './config'
import setNodeController from './controllers/nodeController'
import { setTerminalController } from './controllers/terminalController'
import setRunController from './controllers/runner'

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

ipcMain.handle('open-win', createWindow)
ipcMain.handle('get-config', () => Config)

// 供子进程查询app path
ipcMain.on('get-app-path', (event) => event.returnValue = app.getAppPath())

// 供子进程查询app version
ipcMain.on('get-app-version', (event) => event.returnValue = app.getVersion())

// 供子进程查询platform
ipcMain.on('get-platform', (event) => event.returnValue = process.platform)

ipcMain.on('versions', () => {
    return {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    }
})

setRunController()
setNodeController()
setTerminalController(win)