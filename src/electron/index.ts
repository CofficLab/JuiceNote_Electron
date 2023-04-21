import { createWindow } from './window'
import { registerTerminal } from './terminal'
import { ipcMain } from 'electron'
import { app, win } from './app'

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// 打开新窗口
ipcMain.handle('open-win', createWindow)

// 实时的终端
ipcMain.handle("terminal-create", () => registerTerminal(win!));

// 供子进程查询app path
ipcMain.on('get-app-path', (event) => event.returnValue = app.getAppPath())

// 供子进程查询app version
ipcMain.on('get-app-version', (event) => event.returnValue = app.getVersion())

// 供子进程查询platform
ipcMain.on('get-platform', (event) => event.returnValue = process.platform)
