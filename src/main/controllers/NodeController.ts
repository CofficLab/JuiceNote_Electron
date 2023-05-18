import { ipcMain } from "electron"
import NodeModel from "../models/NodeModel"
import controllerLogger from "../log/controllerLogger"

export default function setNodeController() {
    ipcMain.handle('getRoot', (event) => {
        return NodeModel.getRoot()
    })

    ipcMain.handle('getChildren', (event, id) => {
        return NodeModel.getChildren(id)
    })

    ipcMain.handle('find', (event, id) => {
        controllerLogger.info('向数据库发起请求：find ' + id)
        return NodeModel.find(id)
    })

    ipcMain.handle('updateContent', (event, id, content) => {
        return NodeModel.updateContent(id, content)
    })

    ipcMain.handle('updateTitle', (event, id, title) => {
        return NodeModel.updateTitle(id, title)
    })

    ipcMain.handle('updateVisible', (event, id, visible) => {
        return NodeModel.updateVisible(id, visible)
    })

    ipcMain.handle('search', (event, keyword) => {
        return NodeModel.search(keyword)
    })
}