import { BrowserWindow, ipcMain } from "electron";

import pty from "node-pty";
import os from "os";

const shellType = os.platform() === "win32" ? "powershell.exe" : "zsh";

export default function setTerminalController(win: BrowserWindow) {
    // 实时的终端
    ipcMain.handle("terminal-create", () => {
        let term = pty.spawn(shellType, [], {
            name: "xterm-color",
            cwd: process.env.PWD,
            env: process.env
        });
        const pid = term.pid;
        const channels = [
            "terminal-incomingData-" + pid,
            "terminal-keystroke-" + pid,
            "terminal-resize-" + pid,
            "terminal-close-" + pid
        ];
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
            ipcMain.removeAllListeners([channels[1], channels[2], channels[3]].toString());
        });

        return pid;
    });
}