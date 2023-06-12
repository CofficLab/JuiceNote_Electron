import { dialog, ipcMain } from "electron"
import controllerLogger from "../log/controllerLogger"
import indexLogger from "../log/indexLogger"
import { copyFile, writeFile } from "fs"
import Config from "../models/Config"
import { join } from "path"
import { DatabaseApi, NodeObject } from "../models/DatabaseApi"
import { ShopTree, makeShopModel } from "../models/ShopModel"
import { LocalTree, makeNodeModel } from "../models/NodeModel"
import * as http from 'http'

function getModel(event: Electron.IpcMainInvokeEvent):DatabaseApi {
    let url = event.sender.getURL()
    controllerLogger.info('根据URL确定当前的Model', url)
    
    if (url.includes('#/shop/')) {
        return makeShopModel()
    }

    return makeNodeModel()
}

function getTree(event: Electron.IpcMainInvokeEvent): NodeObject {
    let url = event.sender.getURL()
    controllerLogger.info('根据URL确定当前的树', url)
    
    if (url.includes('#/shop/')) {
        return ShopTree
    }

    return LocalTree
}

export default function setNodeController() {
    ipcMain.handle('getTree', (event) => {
        return getTree(event)
    })

    ipcMain.handle('delete', (event, id) => {
        controllerLogger.info('向数据库发起请求：delete ' + id)
        return (getModel(event)).delete(id)
    })

    ipcMain.handle('getRoot', (event) => {
        return (getModel(event)).getRoot()
    })

    ipcMain.handle('getChildren', (event, id) => {
        getModel(event)
        controllerLogger.info('向数据库发起请求：getChildren ' + id)
        return (getModel(event)).getChildren(id)
    })

    ipcMain.handle('find', (event, id) => {
        controllerLogger.info('向数据库发起请求：find ' + id)
        return (getModel(event)).find(id)
    })

    ipcMain.handle('updateContent', (event, id, content) => {
        return (getModel(event)).updateContent(id, content)
    })

    ipcMain.handle('updateTitle', (event, id, title) => {
        return (getModel(event)).updateTitle(id, title)
    })

    ipcMain.handle('updateVisible', (event, id, visible) => {
        return (getModel(event)).updateVisible(id, visible)
    })

    ipcMain.handle('search', (event, keyword) => {
        return (getModel(event)).search(keyword)
    })

    ipcMain.handle('create', (event, node) => {
        return (getModel(event)).create(node)
    })

    ipcMain.handle('save', (event, node) => {
        return (getModel(event)).save(JSON.parse(node))
    })

    ipcMain.handle('sync', (event, node) => {
        node = JSON.parse(node)
        controllerLogger.log('向服务器同步节点',node.title)
        const req = http.get({
            method: 'PUT',
            host: '127.0.0.1',
            port: 8000,
            path: '/api/lessons/' + node.id,
            headers: {
                'Content-Type': 'application/json'
            }
        }, res => {
            controllerLogger.info('返回的HTTP状态码',res.statusCode)
            res.setEncoding('utf8')
            // res.on('data', chunk => {
            //     console.log(`BODY: ${chunk}`)
            // })
            res.on('end', () => {
                console.log('No more data in response.')
            })
        })

        req.on('error', error => {
            console.error(error)
        })
    })

    ipcMain.handle('export', (event, id) => {
        controllerLogger.info('导出节点', id)

        let tree = getModel(event)
        let filePath = join(Config.TempPath, id + '.json')
        let node = tree.find(id)
        node.children = tree.getDescendants(id)

        writeFile(filePath, JSON.stringify(node, null, 2), (err) => {
            if (err) {
                controllerLogger.error('导出节点失败', err)
            } else {
                indexLogger.info('导出节点到临时目录', filePath)

                dialog.showSaveDialog({
                    title: `导出「${node.title}」`,
                    defaultPath: join(Config.Downloads_Path, node.title + '.json'),
                }).then(result => {
                    controllerLogger.info('选择保存位置的结果', result)

                    if (result.canceled) {
                        controllerLogger.info('取消保存')
                        return
                    }

                    const savePath = result.filePath
                    controllerLogger.info('文件保存到', savePath)

                    copyFile(filePath, savePath!, (err) => {
                        if (err) {
                            controllerLogger.error('复制文件失败', err)
                        }
                        indexLogger.info('复制文件成功', savePath)
                    })
                })
            }
        })
    })

    ipcMain.handle('import', (event, id) => {
        controllerLogger.info('导入节点', id)

        let tree = getModel(event)
        let node = tree.find(id)
        node.children = tree.getDescendants(id)

        dialog.showOpenDialog({
            title: `导入文件`,
            defaultPath: Config.Downloads_Path,
        }).then(result => {
            controllerLogger.info('选择要导入的文件', result)

            if (result.canceled) {
                controllerLogger.info('取消导入')
                return
            }

            let filePaths = result.filePaths
            let target = filePaths[0]

            controllerLogger.log(target)
        })
    })
}