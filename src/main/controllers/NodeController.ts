import { ipcMain } from "electron"
import NodeModel from "../models/NodeModel"

export default function setNodeController() {
    ipcMain.handle('getRoot', (event) => {
        return NodeModel.getRoot()
    })

    ipcMain.handle('getChildren', (event, id) => {
        return NodeModel.getChildren(id)
    })

    ipcMain.handle('find', (event, id) => {
        return NodeModel.find(id)
    })

    ipcMain.handle('updateContent', (event, id, content) => {
        return NodeModel.updateContent(id, content)
    })

    ipcMain.handle('updateTitle', (event, id, title) => {
        return NodeModel.updateTitle(id, title)
    })

    ipcMain.handle('search', (event, keyword) => {
        return NodeModel.search(keyword)
    })
}