import { contextBridge, ipcRenderer } from 'electron'

// 通过 ipcRender 调用主进程的 API
contextBridge.exposeInMainWorld('ipcRender', ipcRenderer)

contextBridge.exposeInMainWorld('preloadApi', {
  terminal: {
    incomingData: (pid: number, callback: (arg0: Electron.IpcRendererEvent, arg1: any) => void) => {
      ipcRenderer.on('terminal-incomingData-' + pid, (event, data) => callback(event, data))
    },
  }
})

// 对主进程的消息作出响应
contextBridge.exposeInMainWorld('listen', (name: string, callback: (e: any,args: any) => void) => {
  // console.log("preload 配置回调 ",name)
  ipcRenderer.on(name, (e,...args) => callback(e,args))
})


