
import { App, BrowserWindow } from 'electron';
import Config from '../models/Config';
import indexLogger from '../log/indexLogger';
import path from 'path';

const downloadShopDb = (app: App, win: BrowserWindow) => {
    win.webContents.session.on('will-download', (event, item, webContents) => {
        item.setSavePath(path.join(Config.User_Data_Path, item.getFilename()));
        indexLogger.info('商店数据库将保存到', item.savePath)
        
        item.once("done", () => {
            indexLogger.info('商店数据库下载完毕')
        })
    })
    win.webContents.downloadURL("https://www.kuaiyizhi.cn/apps/shop.db")
}

export default downloadShopDb