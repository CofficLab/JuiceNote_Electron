import path from "path"
import electron from 'electron'
import BookNode from "./BookNode"

const emptyBookNode = new BookNode
const orderFileName = 'sort.json'
const markdownRootPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'markdown')
const nodeExcepts = [
    'README.md', 'footer.md', 'projects', 'code', '.DS_Store',
    'node_modules', 'images', 'playground.go', 'sort.json'
]

export default {
    nodeExcepts,
    orderFileName,
    emptyBookNode,
    markdownRootPath,
}