import fs from "fs"
import path from "path"

const ignore = [
    'code',
    'sort.json',
    'footer.md',
    'README.md',
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
            this.createSortFile(file)
            return
        }
    }

    static writeSortJson(file: string, sort: string[]) {
        fs.writeFile(path.join(file, 'sort.json'), JSON.stringify(sort, null, 2), (err) => {
            if (err) throw err
            console.log('排序文件已写入')
        })
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
}

export default sort