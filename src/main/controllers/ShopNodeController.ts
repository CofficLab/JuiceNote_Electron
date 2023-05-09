import { ipcMain } from "electron"
import { ShopNodeDB } from "../models/ShopNode"
import log from "electron-log"

export default function setShopNodeController() {
    ipcMain.on('getShopRoot', (event, id) => {
        log.info('get shop root')
        return event.returnValue = ShopNodeDB.getRoot()
    })

    ipcMain.on('getShopBooks', (event, id) => {
        return event.returnValue = ShopNodeDB.getBooks()
    })

    ipcMain.on('findShopNode', (event, id) => {
        return event.returnValue = ShopNodeDB.find(id)
    })

    ipcMain.on('getChildrenOfShopNode', (event, id) => {
        return event.returnValue = ShopNodeDB.getChildren(id)
    })

    ipcMain.on('searchShopNode', (event, keyword) => {
        return event.returnValue = ShopNodeDB.search(keyword)
    })
}