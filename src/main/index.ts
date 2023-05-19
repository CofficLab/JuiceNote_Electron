import { createWindow } from "./bootstrap/window";
import { BrowserWindow, app } from "electron";
import setRunController from "./controllers/RunnerController";
import { release } from "os";
import createUpdater from "./bootstrap/updater";
import setWildController from "./controllers/Wild";
import setTerminalController from "./controllers/Terminal";
import logger from "./log/logger";
import setNodeController from "./controllers/NodeController";
import indexLogger from "./log/indexLogger";
import setExceptionHandler from "./bootstrap/exception";
import prepareDatabase from "./bootstrap/database";
import eventLogger from "./log/eventLogger";

indexLogger.log("主进程启动");

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let win: BrowserWindow | undefined | null = null;

// 准备数据库
prepareDatabase();

// 注册控制器，用于和渲染进程通信
setWildController(app);
setTerminalController(win!);
setRunController();
setNodeController();

// 错误处理
setExceptionHandler(win);

app.on("ready", () => {
    eventLogger.warn("app ready");
    indexLogger.info("创建窗口");
    win = createWindow();

    win.webContents.on("did-start-loading", () => {
        indexLogger.info("webContents:did-start-loading");
    });

    win.webContents.on("dom-ready", () => {
        indexLogger.info("webContents:dom-ready");
    });

    win.webContents.on("did-finish-load", () => {
        indexLogger.info("webContents:did-finish-load");

        setTimeout(() => {
            createUpdater(app, win!);
        }, 50000);
    });

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
});

app.on("window-all-closed", () => {
    win = null;
    app.quit();
});

app.on("second-instance", () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

app.on("activate", () => {
    logger.info("主进程检测到事件: activate");
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});
