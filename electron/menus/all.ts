import { Menu } from 'electron'
import view from './view'
import help from './help'
import main from './main'

// 菜单栏
export default Menu.buildFromTemplate([
    main,
    { role: 'editMenu',label:"编辑" },
    view,
    {role:'windowMenu',label:"窗口"},
    help
])