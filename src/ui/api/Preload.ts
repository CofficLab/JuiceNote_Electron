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

    onToggleSearch(callback: Function) {
        Preload.listen("toggle-search", callback);
    },

    openFolderDialog: async function () {
        return Preload.ipc.invoke("open-folder-dialog");
    },

    getConfig: async function () {
        return Preload.ipc.invoke("get-config");
    },

    setConfig: async function (config: string) {
        return Preload.ipc.invoke("set-config", config);
    }
}

export default Preload