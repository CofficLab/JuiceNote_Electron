import { release } from 'os'
import { createWindow } from './window'
import { app, BrowserWindow } from 'electron'
import path from 'path'

const ROOT_PATH = {
    dist: path.join(__dirname, '../..'),
    public: path.join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}
const url = process.env.VITE_DEV_SERVER_URL as string
const indexHtml = path.join(ROOT_PATH.dist, 'index.html')

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
    win = createWindow()
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
    console.log('event: activate')
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})

export { app, win,ROOT_PATH,url,indexHtml }