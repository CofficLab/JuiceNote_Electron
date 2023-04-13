import { MenuItem } from "electron"

const __DARWIN__ = process.platform === 'darwin'

export default new MenuItem({
    label: __DARWIN__ ? '视图' : '&View',
    submenu: [
        {
            label: '切换全屏',
            role: 'togglefullscreen',
        },
        {
            label: "最小化",
            role:'minimize',
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
            label: '切换开发者视图',
            role:"toggleDevTools",
        },
    ],
})