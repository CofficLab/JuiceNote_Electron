import { BrowserWindow, Menu } from 'electron'
import view from './view'
import help from './help'
import main from './main'
import getMainMenu from './main'

function setMenus(win: BrowserWindow) {
    // 配置菜单
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        getMainMenu(win),
        { role: 'editMenu', label: "编辑" },
        view(win),
        { role: 'windowMenu', label: "窗口" },
        help
    ]))
}

// 菜单栏
export default setMenus