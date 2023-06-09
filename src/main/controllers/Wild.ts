import { dialog, ipcMain, shell } from "electron"
import { createWindow } from "../bootstrap/window"
import Config from "../models/Config"

export default function setWildController(app: Electron.App) {
    ipcMain.handle('open-win', createWindow)

    // 供子进程查询app path
    ipcMain.on('get-app-path', (event) => event.returnValue = app.getAppPath())

    // 供子进程查询app version
    ipcMain.on('get-app-version', (event) => event.returnValue = app.getVersion())

    ipcMain.on('get-app-name', (event) => event.returnValue = app.getName())

    // 供子进程查询platform
    ipcMain.on('get-platform', (event) => event.returnValue = process.platform)

    ipcMain.on('versions', () => {
        return {
            node: () => process.versions.node,
            chrome: () => process.versions.chrome,
            electron: () => process.versions.electron,
        }
    })

    ipcMain.on('is-packaged', (event) => event.returnValue = app.isPackaged)

    // 打开一个文件夹
    ipcMain.handle('open-folder-dialog', (event) => { 
        return dialog.showOpenDialog({ properties: ['openDirectory'] })
    })

    ipcMain.handle('get-config', (event) => {
        return Config.getPreferences()
    })

    ipcMain.handle('set-config', (event, config) => {
        return Config.setPreferences(config)
    })

    ipcMain.handle('open-user-data-path', (event) => { 
        shell.openPath(Config.User_Data_Path)
    })
}