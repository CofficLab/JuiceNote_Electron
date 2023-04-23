// 接收 preload 注入的全局变量

const Preload = {
    ipc: window.ipcRender,
    ipcRender: window.ipcRender,
    IpcRender: window.ipcRender,
    listen: window.listen
}
export default Preload