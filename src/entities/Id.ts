import fs from "fs"
import path from "path"
import Config from "./Config"

class Id {
    // 将文件路径转换成节点ID
    public static pathToId(path: string): string {
        let id = path.replace(Config.markdownRootPath, '').replace('.md', '').replace('/', '').replaceAll('/', '@')

        return id === '' ? '/' : id
    }

    // 将节点ID转换成文件路径
    public static idToPath(id: string): string {
        if (id == '') {
            return Config.markdownRootPath
        }

        let folderPath = path.join(Config.markdownRootPath, id.replaceAll('@', '/'))
        let markdownFilePath = folderPath + '.md'

        if (fs.existsSync(markdownFilePath)) {
            return markdownFilePath
        }

        return folderPath
    }
}

export default Id