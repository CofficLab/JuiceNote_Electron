import path from "path"
import electron from 'electron'

const rootPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'markdown')
const nodeExcepts = [
    'README.md', 'footer.md', 'projects', 'code', '.DS_Store',
    'node_modules', 'images', 'playground.go', 'sort.json'
]

export default {
    nodeExcepts,
    rootPath
}