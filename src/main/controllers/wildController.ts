import { ipcMain } from "electron"
import Config from "../config"
import { createWindow } from "../window"

export default function setWildController(app: Electron.App) {
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

    ipcMain.on('is-packaged', () => app.isPackaged)
}