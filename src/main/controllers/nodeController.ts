import { ipcMain } from "electron"
import { Node } from "../models/node"

export default function setNodeController() {
    ipcMain.on('getBooks', (event) => {
        return event.returnValue = Node.getBooks()
    })

    ipcMain.on('getBook', (event, id) => {
        return event.returnValue = Node.find(id).getBook()
    })

    ipcMain.on('getContent', (event, id) => {
        return event.returnValue = Node.find(id).getContent()
    })

    ipcMain.on('getChildren', (event, id) => {
        return event.returnValue = Node.find(id).getChildren()
    })

    ipcMain.on('search', (event, keyword) => {
        return event.returnValue = Node.search(keyword)
    })

    ipcMain.on('getTabs', (event, id) => {
        return event.returnValue = Node.find(id).getTabs()
    })

    ipcMain.on('getVisibleChildren', (event, id) => {
        return event.returnValue = Node.find(id).getVisibleChildren()
    })

    ipcMain.on('find', (event, id) => {
        return event.returnValue = Node.find(id)
    })

    ipcMain.on('getFirstPage', (event, id) => {
        return event.returnValue = Node.find(id).getFirstPage()
    })

    ipcMain.on('getFirstChild', (event, id) => {
        return event.returnValue = Node.find(id).getFirstChild()
    })

    ipcMain.on('updateTitle', (event, title, id) => {
        return event.returnValue = Node.find(id).updateTitle(title)
    })

    ipcMain.on('updateVisible', (event, id) => {
        return event.returnValue = Node.find(id).updateVisible()
    })

    ipcMain.on('updateContent', (event, id, content) => {
        // console.log('update content', id, content)
        return event.returnValue = Node.find(id).updateContent(content)
    })

    ipcMain.on('updatePriority', (event, id, priority) => {
        console.log('update priority', id, priority)
        return event.returnValue = Node.find(id).updatePriority(priority)
    })

    ipcMain.on('createChildPage', (event, id, title, content) => {
        return event.returnValue = Node.find(id).createChildPage(title, content)
    })

    ipcMain.on('createChildChapter', (event, id, title, content) => {
        return event.returnValue = Node.find(id).createChildChapter(title)
    })

    ipcMain.on('delete', (e, id) => {
        return e.returnValue = Node.find(id).delete()
    })
}