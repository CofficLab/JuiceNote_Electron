import fs from "fs"
import path from "path"
import Log from "../tools/Log"
import Variables from "./Variables"

class Order {
    static orderFileName = Variables.orderFileName

    static getSortJsonFilePath(dir: string) {
        return path.join(dir, this.orderFileName)
    }

    static getSort(dir: string): string[] {
        if (!fs.existsSync(Order.getSortJsonFilePath(dir))) {
            return []
        }

        let json = fs.readFileSync(Order.getSortJsonFilePath(dir)).toString()
        if (json == "") {
            return []
        }

        return JSON.parse(json)
    }

    static initSortFile(file: string) {
        if (!fs.statSync(file).isDirectory()) {
            return
        }

        if (!Order.isSortJsonFileValid(file)) {
            this.createSortFile(file)
            return
        }
    }

    static writeSortJson(file: string, sort: string[]) {
        fs.writeFileSync(this.getSortJsonFilePath(file), JSON.stringify(sort, null, 2))
    }

    static createSortFile(file: string) {
        let sort: string[] = []
        fs.readdirSync(file).forEach(child => {
            if (!Variables.nodeExcepts.includes(child)) {
                sort.push(child)
            }
        })

        this.writeSortJson(file, sort)
    }

    static isSortJsonFileValid(file: string): boolean {
        if (!fs.existsSync(this.getSortJsonFilePath(file))) {
            Log.info('sort.initSortFile', file + ' 下无sort.json，创建')

            return false
        }

        let subFilesCount = 0
        fs.readdirSync(file).forEach(child => {
            if (!Variables.nodeExcepts.includes(child)) {
                subFilesCount++
            }
        })

        if (this.getSort(file).length != subFilesCount) {
            return false
        }

        let result = true
        Order.getSort(file).forEach(element => {
            if (!fs.existsSync(path.join(file, element))) {
                result = false
            }
        })

        return result
    }

    // 设置新的排序值
    static setOrder(file: string, order: number, newOrder: number) {
        Log.info('sort.setOrder', file + ' index of ' + order + ' to ' + newOrder)
        let children = Order.getSort(file)
        let target = children[order]

        children.splice(order, 1)
        children.splice(newOrder, 0, target)
        console.log(children)
        Log.info('sort.setOrder', 'new sort.json is ' + children)

        Order.writeSortJson(file, children)
    }
}

export default Order