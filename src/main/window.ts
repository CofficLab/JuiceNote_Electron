import { app, BrowserWindow, shell, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'
import setMenus from './menus/all'
import Config from './config'

function createWindow(option?: BrowserWindowConstructorOptions): BrowserWindow {
    const defaultOption = {
        minWidth: 780,
        height: app.isPackaged ? 800 : 1600,
        width: 1300,
        // backgroundColor: '#07404b',
        transparent: true,
        title: 'Main window',
        icon: path.join(Config.PUBLIC_PATH, 'favicon.ico'),
        frame: process.platform == 'win32' ? true : false, // false：不显示可拖动的那个顶栏，形成一个无边框窗口
        titleBarStyle: 'hidden',
        trafficLightPosition: { x: 8, y: 8 },
        titleBarOverlay: true,
        webPreferences: {
            worldSafeExecuteJavaScript: true,
            preload: Config.PRELOAD_FILE,
            // nodeIntegration: true,
            // contextIsolation: false,
            spellcheck: false,
        },
    }

    let win = new BrowserWindow(Object.assign({}, defaultOption, option))

    if (app.isPackaged) {
        win.loadFile(Config.INDEX_HTML_PATH)
        win.webContents.openDevTools()
    } else {
        win.loadURL(Config.URL)
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