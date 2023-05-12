import { ipcMain } from "electron"
import LocalNodeDatabaseApi from "../models/LocalNode"

export default function setNodeController() {
    ipcMain.on('getRoot', (event, id) => {
        return event.returnValue = LocalNodeDatabaseApi.getRoot()
    })

    ipcMain.on('getBooks', (event) => {
        return event.returnValue = LocalNodeDatabaseApi.getBooks()
    })

    ipcMain.on('find', (event, id) => {
        return event.returnValue = LocalNodeDatabaseApi.find(id)
    })

    ipcMain.on('getChildren', (event, id) => {
        return event.returnValue = LocalNodeDatabaseApi.getChildren(id)
    })

    ipcMain.on('search', (event, keyword) => {
        return event.returnValue = LocalNodeDatabaseApi.search(keyword)
    })

    ipcMain.on('updateTitle', (event, title, id) => {
        return event.returnValue = LocalNodeDatabaseApi.updateTitle(id, title)
    })

    ipcMain.on('updateVisible', (event, id, visible) => {
        return event.returnValue = LocalNodeDatabaseApi.updateVisible(id, visible)
    })

    ipcMain.on('updateContent', (event, id, content) => {
        return event.returnValue = LocalNodeDatabaseApi.updateContent(id, content)
    })

    ipcMain.on('updatePriority', (event, id, priority) => {
        return event.returnValue = LocalNodeDatabaseApi.updatePriority(id, priority)
    })

    ipcMain.on('delete', (e, id) => {
        return e.returnValue = LocalNodeDatabaseApi.delete(id)
    })
}