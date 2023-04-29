import { IpcRenderer } from "electron";

export declare global {
    interface Window {
        // 在preload中定义的用于和主进程通信的方法
        ipcRender: IpcRenderer,
        listen,
        api: {
            versions,
        };
    }
}