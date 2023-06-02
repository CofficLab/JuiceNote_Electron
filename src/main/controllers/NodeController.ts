import { dialog, ipcMain } from "electron"
import makeNodeModel from "../models/NodeModel"
import controllerLogger from "../log/controllerLogger"
import indexLogger from "../log/indexLogger"
import { copyFile, writeFile, writeFileSync } from "fs"
import Config from "../models/Config"
import { join } from "path"

export default function setNodeController() {
    let nodeModel = makeNodeModel()

    ipcMain.handle('delete', (event, id) => {
        controllerLogger.info('向数据库发起请求：delete ' + id)
        return nodeModel.delete(id)
    })

    ipcMain.handle('getRoot', (event) => {
        return nodeModel.getRoot()
    })

    ipcMain.handle('getChildren', (event, id) => {
        controllerLogger.info('向数据库发起请求：getChildren ' + id)
        return nodeModel.getChildren(id)
    })

    ipcMain.handle('find', (event, id) => {
        controllerLogger.info('向数据库发起请求：find ' + id)
        return nodeModel.find(id)
    })

    ipcMain.handle('updateContent', (event, id, content) => {
        return nodeModel.updateContent(id, content)
    })

    ipcMain.handle('updateTitle', (event, id, title) => {
        return nodeModel.updateTitle(id, title)
    })

    ipcMain.handle('updateVisible', (event, id, visible) => {
        return nodeModel.updateVisible(id, visible)
    })

    ipcMain.handle('search', (event, keyword) => {
        return nodeModel.search(keyword)
    })

    ipcMain.handle('create', (event, node) => {
        return nodeModel.create(node)
    })

    ipcMain.handle('save', (event, node) => {
        return nodeModel.save(JSON.parse(node))
    })

    ipcMain.handle('export', (event, id) => {
        controllerLogger.info('导出节点', id)

        let filePath = join(Config.TempPath, id + '.json')
        let node = nodeModel.find(id)
        node.children = nodeModel.getDescendants(id)

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

        let node = nodeModel.find(id)
        node.children = nodeModel.getDescendants(id)

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