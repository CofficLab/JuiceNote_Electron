import { ipcMain } from "electron"
import  LocalNode from "../models/LocalNode"
import log from "../logger"
import { NodeDB } from "../models/BaseNode"

export default function setNodeController() {
    ipcMain.on('getRoot', (event, id) => {
        return event.returnValue = LocalNode.getRoot()
    })

    ipcMain.on('getBooks', (event) => {
        return event.returnValue = LocalNode.getBooks()
    })

    ipcMain.on('find', (event, id) => {
        return event.returnValue = LocalNode.find(id)
    })

    ipcMain.on('getChildren', (event, id) => {
        return event.returnValue = LocalNode.getChildren(id)
    })

    ipcMain.on('search', (event, keyword) => {
        return event.returnValue = LocalNode.search(keyword)
    })

    ipcMain.on('updateTitle', (event, title, id) => {
        return event.returnValue = LocalNode.updateTitle(id, title)
    })

    ipcMain.on('updateVisible', (event, id, visible) => {
        return event.returnValue = LocalNode.updateVisible(id, visible)
    })

    ipcMain.on('updateContent', (event, id, content) => {
        return event.returnValue = LocalNode.updateContent(id, content)
    })

    ipcMain.on('updatePriority', (event, id, priority) => {
        return event.returnValue = LocalNode.updatePriority(id, priority)
    })

    ipcMain.on('delete', (e, id) => {
        return e.returnValue = LocalNode.delete(id)
    })
}