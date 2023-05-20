import { ipcMain } from "electron"
import makeNodeModel from "../models/NodeModel"
import controllerLogger from "../log/controllerLogger"

export default function setNodeController() {
    let nodeModel = makeNodeModel()

    ipcMain.handle('getRoot', (event) => {
        return nodeModel.getRoot()
    })

    ipcMain.handle('getChildren', (event, id) => {
        controllerLogger.info('向数据库发起请求：getChildren ' + id)
        return nodeModel.getChildren(id)
    })

    ipcMain.handle('find', (event, id) => {
        controllerLogger.info('向数据库发起请求：find ' + id)
        return nodeModel.find(id)
    })

    ipcMain.handle('updateContent', (event, id, content) => {
        return nodeModel.updateContent(id, content)
    })

    ipcMain.handle('updateTitle', (event, id, title) => {
        return nodeModel.updateTitle(id, title)
    })

    ipcMain.handle('updateVisible', (event, id, visible) => {
        return nodeModel.updateVisible(id, visible)
    })

    ipcMain.handle('search', (event, keyword) => {
        return nodeModel.search(keyword)
    })

    ipcMain.handle('create', (event, node) => {
        return nodeModel.create(node)
    })
}