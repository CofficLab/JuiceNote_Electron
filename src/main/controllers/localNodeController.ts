import { ipcMain } from "electron"
import { LocalNodeDB } from "../models/LocalNode"

export default function setNodeController() {
    ipcMain.on('getBooks', (event) => {
        return event.returnValue = LocalNodeDB.getBooks()
    })

    ipcMain.on('find', (event, id) => {
        return event.returnValue = LocalNodeDB.find(id)
    })

    ipcMain.on('getChildren', (event, id) => {
        return event.returnValue = LocalNodeDB.getChildren(id)
    })

    ipcMain.on('search', (event, keyword) => {
        return event.returnValue = LocalNodeDB.search(keyword)
    })

    ipcMain.on('updateTitle', (event, title, id) => {
        return event.returnValue = LocalNodeDB.updateTitle(id, title)
    })

    ipcMain.on('updateVisible', (event, id, visible) => {
        return event.returnValue = LocalNodeDB.updateVisible(id, visible)
    })

    ipcMain.on('updateContent', (event, id, content) => {
        return event.returnValue = LocalNodeDB.updateContent(id, content)
    })

    ipcMain.on('updatePriority', (event, id, priority) => {
        return event.returnValue = LocalNodeDB.updatePriority(id, priority)
    })

    ipcMain.on('delete', (e, id) => {
        return e.returnValue = LocalNodeDB.delete(id)
    })
}