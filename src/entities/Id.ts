import fs from "fs"
import path from "path"
import variables from "./Variables";

class Id {
    // 将文件路径转换成节点ID
    public static pathToId(path: string) {
        let id = path.replace(variables.markdownRootPath, '').replace('.md', '').replace('/', '').replaceAll('/', '@')

        return id === '' ? '/' : id
    }

    // 将节点ID转换成文件路径
    public static idToPath(id: string | null) {
        if (id == null || id == '') {
            return variables.markdownRootPath
        }

        let folderPath = path.join(variables.markdownRootPath, id.replaceAll('@', '/'))
        let markdownFilePath = folderPath + '.md'

        if (fs.existsSync(markdownFilePath)) {
            return markdownFilePath
        }

        return folderPath
    }
}

export default Id