import { BrowserWindow, MenuItem, app } from "electron"
import path from "path"

export const ROOT_PATH = {
    dist: path.join(__dirname, '../..'),
    public: path.join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

const url = process.env.VITE_DEV_SERVER_URL as string
const indexHtml = path.join(ROOT_PATH.dist, 'index.html')

export default new MenuItem({
    label: '快易知',
    submenu: [
        {
            label: '关于',
            role:'about',
            // click:()=> {
            //     const win = new BrowserWindow({
            //         width: 400, height: 300, webPreferences: {
            //             nodeIntegration: true,
            //             contextIsolation: false,
            //             spellcheck: false,
            //         },
            //     })
            //     if (app.isPackaged) {
            //         win.loadFile(indexHtml, { hash: '/about' })
            //     } else {
            //         win.loadURL(url + '#about')
            //     }
            // }
        },
        { type: 'separator' }, 
        {
            role: 'services',
            label:'服务',
            submenu: [],
        },
        { type: 'separator' }, 
        {
            role: 'hide',
            label: '隐藏'
        },
        {
            role: 'hideOthers',
            label:"隐藏其他程序"
        },
        { role: 'unhide' },
        { type: 'separator' },
        {
            role: 'quit',
            label: "退出"
        }
    ]
})