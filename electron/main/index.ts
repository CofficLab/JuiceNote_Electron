import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron'
import { release } from 'os'
import path from 'path'
import menus from '../menus/all'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  // /dist
  dist: path.join(__dirname, '../..'),
  // /dist or /public
  public: path.join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = path.join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL as string
const indexHtml = path.join(ROOT_PATH.dist, 'index.html')

// 配置菜单
Menu.setApplicationMenu(menus)

async function createWindow() {
  win = new BrowserWindow({
    minWidth: 780,
    height: 880,
    width: 1300,
    backgroundColor: '#07404b',
    title: 'Main window',
    icon: path.join(ROOT_PATH.public, 'favicon.ico'),
    frame: false, // false：不显示可拖动的那个顶栏，形成一个无边框窗口
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    titleBarOverlay:true,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      spellcheck: false,
    },
  })

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
}

app.whenReady().then(function () {
  createWindow()
  // let appPath = app.getAppPath()
  // fs.appendFileSync(path.join(app.getPath('downloads'), 'app.log'), 'APP路径：' + appPath)
})

app.on('window-all-closed', () => {
  win = null
  // if (process.platform !== 'darwin')
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

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    childWindow.loadURL(`${url}/#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})

// 实时的终端
const pty = require("node-pty");
const os = require("os");
const shellType = os.platform() === "win32" ? "powershell.exe" : "zsh";
ipcMain.handle("terminal-create", (event) => {
  let term = pty.spawn(shellType, [], {
    name: "xterm-color",
    cwd: process.env.PWD,
    env: process.env
  });
  const pid = term.pid;
  const channels = ["terminal-incomingData-" + pid, "terminal-keystroke-" + pid, "terminal-resize-" + pid, "terminal-close-" + pid];
  // 命令反馈
  term.onData(function (data) {
    win.webContents.send(channels[0], data);
  })
  // 命令输入
  ipcMain.on(channels[1], (event, key) => {
    term.write(key);
  });
  // 尺寸调整
  ipcMain.on(channels[2], (event, cols, rows) => {
    term.resize(cols, rows);
  });
  // 终端关闭
  ipcMain.on(channels[3], (event) => {
    term.kill();
    ipcMain.removeAllListeners([channels[1], channels[2], channels[3]]);
  });
  return pid;
});

// 供子进程查询app path
ipcMain.on('get-app-path', function (event) {
  return event.returnValue = app.getAppPath()
})

// 供子进程查询app version
ipcMain.on('get-app-version', function (event) {
  return event.returnValue = app.getVersion()
})