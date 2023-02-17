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
    static getSort(file: string): string[] {
        if (!fs.existsSync(path.join(file, 'sort.json'))) {
            return []
        }

        let json = fs.readFileSync(path.join(file, 'sort.json')).toString()
        if (json == "") {
            return []
        }

        return JSON.parse(json)
    }

    static initSortFile(file: string) {
        if (!fs.statSync(file).isDirectory()) {
            return
        }

        if (!fs.existsSync(path.join(file, 'sort.json'))) {
            log.info('sort.initSortFile', file + ' 下无sort.json，创建')
            this.createSortFile(file)
            return
        }

        let subFilesCount = 0
        fs.readdirSync(file).forEach(child => {
            if (!ignore.includes(child)) {
                subFilesCount++
            }
        })

        if (this.getSort(file).length != subFilesCount) {
            log.info('sort.initSortFile', file + ' 下共 ' + subFilesCount + ' 个有效节点')
            log.info('sort.initSortFile', file + ' 下sort.json记录了 ' + this.getSort(file).length + ' 个有效节点')
            this.createSortFile(file)
            return
        }
    }

    static writeSortJson(file: string, sort: string[]) {
        log.info('sort.writeSortJson', 'file=' + file)
        log.info('sort.writeSortJson', 'sort=' + sort)
        log.info('sort.writeSortJson', '写入=' + JSON.stringify(sort, null, 2))
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
        let target = children[order - 1]

        children.splice(order - 1, 1)
        children.splice(newOrder - 1, 0, target)
        console.log(children)
        log.info('sort.setOrder', 'new sort.json is ' + children)

        sort.writeSortJson(file, children)
    }
}

export default sort