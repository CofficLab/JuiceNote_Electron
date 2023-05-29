import { BrowserView, BrowserWindow, MenuItem } from "electron"
import { createAboutWindow, createSettingWindow } from "../bootstrap/window"

function getMainMenu(win: BrowserWindow) {
    return new MenuItem({
        label: '快易知',
        submenu: [
            {
                label: '关于',
                role: 'about',
            },
            // {
            //     label: '版本详情',
            //     click: () => createAboutWindow()
            // },
            {
                label: '偏好设置',
                click: () => {
                    win.webContents.send('toggle-setting')
                }
            },
            { type: 'separator' },
            {
                role: 'services',
                label: '服务',
                submenu: [],
            },
            { type: 'separator' },
            {
                role: 'hide',
                label: '隐藏'
            },
            {
                role: 'hideOthers',
                label: "隐藏其他程序"
            },
            { role: 'unhide' },
            { type: 'separator' },
            {
                role: 'quit',
                label: "退出"
            }
        ]
    })
 }

export default getMainMenu