import { ipcMain } from "electron"
import NodeModel from "../models/NodeModel"

export default function setNodeController() {
    ipcMain.handle('getRoot', (event) => {
        return NodeModel.getRoot()
    })

    ipcMain.handle('getChildren', (event, id) => {
        return NodeModel.getChildren(id)
    })
}