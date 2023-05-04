
import { autoUpdater } from 'electron-updater';
import log from 'electron-log'
import { App, BrowserWindow } from 'electron';

const createUpdater = (app: App, win: BrowserWindow) => {
    autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = 'info';
    autoUpdater.setFeedURL({
        provider: 'generic',
        channel: process.platform === 'darwin' ? 'latest-win32' : 'latest-win32',
        url: `https://www.kuaiyizhi.cn/apps`,
    });

    autoUpdater.forceDevUpdateConfig = true
    autoUpdater.autoDownload = true
    // autoUpdater.checkForUpdates()
    autoUpdater.checkForUpdatesAndNotify()

    autoUpdater.on('checking-for-update', () => {
        log.info('检查更新')
        win!.webContents.send('checking-for-update')
    })
    autoUpdater.on('update-downloaded', () => {
        log.info('更新下载完成')
        win!.webContents.send('update-downloaded')
        // autoUpdater.quitAndInstall();
    });
    autoUpdater.on('update-available', () => {
        log.info('更新可用')
        win!.webContents.send('update-available')
    })
    autoUpdater.on('update-not-available', () => {
        log.info('没有可用的更新')
        win!.webContents.send('update-not-available')
    })
    autoUpdater.on('download-progress', (e) => {
        log.info('正在下载', e)
        win!.webContents.send('download-progress', e)
    })
}

export default createUpdater