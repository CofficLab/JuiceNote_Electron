import fs from "fs"
import path from "path"
import log from "./log"

const ignore = [
    'code',
    'sort.json',
    'footer.md',
    'README.md',
    'playground.go'
]

class sort {
    static getSortJsonFilePath(dir: string) {
        return path.join(dir, 'sort.json')
    }

    static getSort(dir: string): string[] {
        if (!fs.existsSync(sort.getSortJsonFilePath(dir))) {
            return []
        }

        let json = fs.readFileSync(sort.getSortJsonFilePath(dir)).toString()
        if (json == "") {
            return []
        }

        return JSON.parse(json)
    }

    static initSortFile(file: string) {
        if (!fs.statSync(file).isDirectory()) {
            return
        }

        if (!sort.isSortJsonFileValid(file)) {
            this.createSortFile(file)
            return
        }
    }

    static writeSortJson(file: string, sort: string[]) {
        fs.writeFileSync(path.join(file, 'sort.json'), JSON.stringify(sort, null, 2))
    }

    static createSortFile(file: string) {
        let sort: string[] = []
        fs.readdirSync(file).forEach(child => {
            if (!ignore.includes(child)) {
                sort.push(child)
            }
        })

        this.writeSortJson(file, sort)
    }

    static isSortJsonFileValid(file: string): boolean {
        if (!fs.existsSync(path.join(file, 'sort.json'))) {
            log.info('sort.initSortFile', file + ' 下无sort.json，创建')

            return false
        }

        let subFilesCount = 0
        fs.readdirSync(file).forEach(child => {
            if (!ignore.includes(child)) {
                subFilesCount++
            }
        })

        if (this.getSort(file).length != subFilesCount) {
            return false
        }

        let result = true
        sort.getSort(file).forEach(element => {
            if (!fs.existsSync(path.join(file, element))) {
                result = false
            }
        })

        return result
    }

    /**
    * 设置新的排序值
    * 
    * 例如：将第5个移动到第2个
    *  将第2个重命名为3
    *  将第3个重命名为4
    *  ......
    *  将第5个重命名为2
    */
    static setOrder(file: string, order: number, newOrder: number) {
        log.info('sort.setOrder', file + ' index of ' + order + ' to ' + newOrder)
        let children = sort.getSort(file)
        let target = children[order]

        children.splice(order, 1)
        children.splice(newOrder, 0, target)
        console.log(children)
        log.info('sort.setOrder', 'new sort.json is ' + children)

        sort.writeSortJson(file, children)
    }
}

export default sort