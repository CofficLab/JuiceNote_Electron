import { BrowserWindow, MenuItem, app, shell } from "electron"
import { createWindow } from "../bootstrap/window"
import Config from "../models/Config"

const __DARWIN__ = process.platform === 'darwin'

function getViewMenu(win: BrowserWindow) {
    return new MenuItem({
        label: __DARWIN__ ? '视图' : '&View',
        submenu: [
            {
                label: '切换全屏',
                role: 'togglefullscreen',
            },
            {
                label: "最小化",
                role: 'minimize',
            },
            {
                label: "关闭",
                role: 'close',
            },
            {
                label: "重新加载",
                role: 'reload',
            },

            { type: 'separator' },
            { label: "放大", role: "zoomIn" },
            { label: "缩小", role: "zoomOut" },
            { label: "重置", role: "resetZoom" },

            { type: 'separator' },
            {
                label: '搜索',
                accelerator: 'CommandOrControl+K',
                click: () => {
                    win.webContents.send('toggle-search')
                }
            },
            {
                label: '配置主题',
                accelerator: 'CommandOrControl+T',
                click: () => {
                    win.webContents.send('toggle-theme-setting')
                }
            },
            {
                label: '切换开发者视图',
                role: "toggleDevTools",
            },

            { type: 'separator' },
            {
                label: '新页面',
                accelerator: 'CommandOrControl+N',
                click: () => createWindow({ x: 10, y: 10 })
            },
            { type: 'separator' },
            {
                label: '打开存储文件夹',
                click: () => shell.openPath(Config.User_Data_Path)
            },
            {
                label: '打开程序文件夹',
                click: () => shell.openPath(Config.ROOT_PATH)
            },
            // {
            //     label: '打开更新缓存文件夹',
            //     click: () => shell.openPath(Config.Updates_Path)
            // },
        ],
    })
}

export default getViewMenu