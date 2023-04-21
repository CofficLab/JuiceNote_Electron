import { app, BrowserWindow, shell, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'
import setMenus from './menus/all'
import { ROOT_PATH,preload,indexHtml,url } from './config'

function createWindow(option?: BrowserWindowConstructorOptions):BrowserWindow {
    const defaultOption = {
        minWidth: 780,
        height: app.isPackaged ? 800 : 1600,
        width: 1300,
        backgroundColor: '#07404b',
        title: 'Main window',
        icon: path.join(ROOT_PATH.public, 'favicon.ico'),
        frame: process.platform == 'win32' ? true : false, // false：不显示可拖动的那个顶栏，形成一个无边框窗口
        titleBarStyle: 'hidden',
        trafficLightPosition: { x: 8, y: 8 },
        titleBarOverlay: true,
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
            spellcheck: false,
        },
    }

    let win: BrowserWindow | null = null
    win = new BrowserWindow(Object.assign({}, defaultOption, option))

    if (app.isPackaged) {
        win.loadFile(indexHtml)
    } else {
        win.loadURL(url)
        win.webContents.openDevTools()
    }

    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        if (win.isFullScreen()) {
            win?.webContents.send('main-process-message', 'enter-full-screen')
        }

        win?.webContents.send('main-process-message', 'did_finish-load')
    })

    // 配置菜单
    setMenus(win)

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return { action: 'deny' }
    })

    // 进入全屏状态事件
    win.on('enter-full-screen', () => {
        win?.webContents.send('main-process-message', 'enter-full-screen')
    })

    win.on('leave-full-screen', () => {
        win?.webContents.send('main-process-message', 'leave-full-screen')
    })

    return win
}

export { createWindow }