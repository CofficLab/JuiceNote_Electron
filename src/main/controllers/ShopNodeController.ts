import { ipcMain } from "electron"
import ShopNode  from "../models/ShopNode"
import log from "electron-log"

export default function setShopNodeController() {
    ipcMain.on('getShopRoot', (event, id) => {
        log.info('get shop root')
        return event.returnValue = ShopNode.getRoot()
    })

    ipcMain.on('getShopBooks', (event, id) => {
        return event.returnValue = ShopNode.getBooks()
    })

    ipcMain.handle('findShopNode', (event, id) => {
        log.debug('handle findShopNode', id)
        return event.returnValue = ShopNode.find(id)
    })

    ipcMain.handle('findShopNodeFirstPage', (event, id) => {
        log.debug('handle findShopNodeFirstPage', id)
        return event.returnValue = ShopNode.find(id).getFirstPage()
    })

    ipcMain.on('getChildrenOfShopNode', (event, id) => {
        return event.returnValue = ShopNode.getChildren(id)
    })

    ipcMain.on('searchShopNode', (event, keyword) => {
        return event.returnValue = ShopNode.search(keyword)
    })
}