import { BrowserWindow } from "electron"
import indexLogger from "../log/indexLogger"

function setExceptionHandler(win:BrowserWindow|null|undefined) {
    process.on('uncaughtException', (err) => {
        indexLogger.error('主进程捕获到异常:', err)
        indexLogger.info('通知渲染进程异常信息')
        win?.webContents.send('exception', err)
    })
}

export default setExceptionHandler