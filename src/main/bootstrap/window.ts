import { app, BrowserWindow, shell, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'
import indexLogger from '../log/indexLogger'
import Config from '../models/Config'

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

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return { action: 'deny' }
    })

    return win
}

function createMainWindow():BrowserWindow {
    let win = createWindow();

    if (app.isPackaged) {
        indexLogger.info('项目已打包，加载 index.html 文件')
        win.loadFile(Config.INDEX_HTML_PATH)
    } else {
        indexLogger.info('项目未打包，加载 URL')
        win.loadURL(Config.URL)
        // win.webContents.openDevTools()
    }

    // 进入全屏状态事件
    win.on("enter-full-screen", () => {
        win?.webContents.send("main-process-message", "enter-full-screen");
    });

    win.on("leave-full-screen", () => {
        win?.webContents.send("main-process-message", "leave-full-screen");
    });

    // Test actively push message to the Electron-Renderer
    win.webContents.on("did-finish-load", () => {
        if (win!.isFullScreen()) {
            win?.webContents.send("main-process-message", "enter-full-screen");
        }

        win?.webContents.send("main-process-message", "did_finish-load");
    });

    return win
}

function createAboutWindow() {
    const win = createWindow({
        width: 400,
        height: 400,
    })
    
    if (app.isPackaged) {
        win.loadFile(Config.INDEX_HTML_PATH, { hash: '/about' })
    } else {
        win.loadURL(Config.URL + '#about')
    }

    return win
}

function createSettingWindow() {
    const win = createWindow({
        width: 700,
        height: 400,
    })

    if (app.isPackaged) {
        win.loadFile(Config.INDEX_HTML_PATH, { hash: '/setting' })
    } else {
        win.loadURL(Config.URL + '#setting')
    }

    return win
}

export { createWindow,createMainWindow,createAboutWindow,createSettingWindow }