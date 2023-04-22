import { MenuItem, shell } from "electron"

export default new MenuItem({
    label: '&帮助',
    submenu: [
        {
            label: '报告问题…',
            click: () => shell.openExternal('https://www.kuaiyizhi.cn')
        },
    ],
})