
import { autoUpdater } from 'electron-updater';
import { App, BrowserWindow } from 'electron';
import updateLogger from '../log/updateLogger';
import Config from '../models/Config';

const createUpdater = (app: App, win: BrowserWindow) => {
    autoUpdater.logger = updateLogger;
    // autoUpdater.updateConfigPath = Config.Updates_Path
    autoUpdater.setFeedURL({
        provider: 'generic',
        channel: process.platform === 'darwin' ? 'latest-win32' : 'latest-win32',
        url: `https://www.kuaiyizhi.cn/apps`,
    });

    autoUpdater.forceDevUpdateConfig = true

    // updateLogger.info('下载存储的文件夹', autoUpdater.updateConfigPath)

    if (!app.isPackaged) {
        updateLogger.info('未打包，仅检查更新，不下载')
        autoUpdater.autoDownload = false
        autoUpdater.checkForUpdates()
    } else {
        updateLogger.info('打包了，检查并下载更新')
        autoUpdater.autoDownload = true
        autoUpdater.checkForUpdatesAndNotify()
    } 

    autoUpdater.on('checking-for-update', () => {
        updateLogger.info('检查更新')
        win.webContents.send('checking-for-update')
    })
    autoUpdater.on('update-downloaded', () => {
        updateLogger.info('更新下载完成')
        win!.webContents.send('update-downloaded')
        // autoUpdater.quitAndInstall();
    });
    autoUpdater.on('update-available', (e) => {
        updateLogger.info('更新可用',e.version)
        win!.webContents.send('update-available',e)
    })
    autoUpdater.on('update-not-available', () => {
        updateLogger.info('没有可用的更新')
        win!.webContents.send('update-not-available')
    })
    autoUpdater.on('download-progress', (e) => {
        updateLogger.info('正在下载', e.percent.toString().substring(0,4) + '%')
        win!.webContents.send('download-progress', e)
    })
}

export default createUpdater