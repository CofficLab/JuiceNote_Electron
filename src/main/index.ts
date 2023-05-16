import { createWindow } from './window'
import { BrowserWindow, app } from 'electron'
import setRunController from './controllers/RunnerController'
import { release } from 'os'
import createUpdater from './updater'
import setWildController from './controllers/WildController'
import setTerminalController from './controllers/TerminalController'
import logger from './logger'
import setNodeController from './controllers/NodeController'

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

let win: BrowserWindow | null = null

app.whenReady().then(function () {
    logger.info('创建窗口')
    win = createWindow()

    setWildController(app)
    setTerminalController(win)
    setRunController()
    setNodeController()

    win.webContents.on('did-finish-load', () => {
        logger.info('webContents.on:did-finish-load')

        createUpdater(app, win!)
    })

    process.on('uncaughtException', (err) => {
        logger.error('主进程捕获到异常:', err)
        logger.info('通知渲染进程异常信息')
        win!.webContents.send('exception', err)
    })
})

app.on('window-all-closed', () => {
    win = null
    app.quit()
})

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore()
        win.focus()
    }
})

app.on('activate', () => {
    logger.info('主进程检测到事件: activate')
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})