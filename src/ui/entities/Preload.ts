// 接收 preload 注入的全局变量

const Preload = {
    ipc: window.ipcRender,
    listen: window.listen,

    isWindows: () => Preload.ipc.sendSync("get-platform") == "win32",

    isPackaged: () => Preload.ipc.sendSync('is-packaged'),

    isDev: () => !Preload.isPackaged(),

    getAppVersion: function () {
        return Preload.ipc.sendSync("get-app-version");
    },

    getThemes: () => Preload.ipc.sendSync("get-themes"),

    onToggleSearch(callback: Function) {
        Preload.listen("toggle-search", callback);
    }
}

export default Preload