import path from "path"
import electron from 'electron'
import BookNode from "./BookNode"

const emptyBookNode = new BookNode
const orderFileName = 'sort.json'
const markdownRootPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'markdown')

export default {
    orderFileName,
    emptyBookNode,
    markdownRootPath,
}