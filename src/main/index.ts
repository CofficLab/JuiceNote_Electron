import { createWindow } from './window'
import { BrowserWindow, app } from 'electron'
import setNodeController from './controllers/localNodeController'
import setTerminalController from './controllers/terminalController'
import setRunController from './controllers/runner'
import { release } from 'os'
import { autoUpdater } from 'electron-updater';
import setWildController from './controllers/wildController'
import log from 'electron-log'

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
    log.info('app.whenReady:创建窗口')
    win = createWindow()

    setTerminalController(win)
    setWildController(app)
    setRunController()
    setNodeController()
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
    log.info('主进程检测到事件: activate')
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})

/**
 * 更新的相关逻辑
 */
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.setFeedURL({
    provider: 'generic',
    channel: process.platform === 'darwin' ? 'latest' : 'latest-win32',
    url: `https://www.kuaiyizhi.cn/apps`,
});
autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
});
app.on('ready', function () {
    if (!app.isPackaged) {
        autoUpdater.forceDevUpdateConfig = true
        autoUpdater.checkForUpdatesAndNotify();
    }
});