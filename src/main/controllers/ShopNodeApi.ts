import { ipcMain } from "electron"
import ShopNodeApi  from "../models/ShopNode"
import log from "electron-log"

export default function setShopNodeController() {
    ipcMain.on('getShopRoot', (event, id) => {
        log.info('get shop root')
        return event.returnValue = ShopNodeApi.getRoot()
    })

    ipcMain.on('getShopBooks', (event, id) => {
        return event.returnValue = ShopNodeApi.getBooks()
    })

    ipcMain.handle('findShopNode', (event, id) => {
        log.debug('handle findShopNode', id)
        return event.returnValue = ShopNodeApi.find(id)
    })

    ipcMain.handle('findShopNodeFirstPage', (event, id) => {
        log.debug('handle findShopNodeFirstPage', id)
        return event.returnValue = ShopNodeApi.getFirstPage(id)
    })

    ipcMain.on('getChildrenOfShopNode', (event, id) => {
        return event.returnValue = ShopNodeApi.getChildren(id)
    })

    ipcMain.on('searchShopNode', (event, keyword) => {
        return event.returnValue = ShopNodeApi.search(keyword)
    })
}