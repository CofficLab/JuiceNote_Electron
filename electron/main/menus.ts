const { Menu } = require('electron')
import { app, BrowserWindow } from 'electron'
import path from 'path'

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: '关于', click() {
                    const version = app.getVersion()
                    const win = new BrowserWindow({
                        width: 400, height: 300, webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            spellcheck: false,
                        },
                    })
                    win.loadFile(path.join(app.getAppPath(), 'about.html'))
                }
            },
            { label: 'Open', click() { /* Do something */ } },
            { type: 'separator' },
            { role: 'quit' }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
            { role: 'undo' },
            { role: 'redo' }
        ]
    }
]

const menus = Menu.buildFromTemplate(template)

export default menus