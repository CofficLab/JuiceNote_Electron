import fs from "fs"
import path from "path"
import hljs from 'highlight.js'

const md = require('markdown-it')({
    html: true,
    highlight: function (str: any, lang: any) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
        }

        return ''; // 使用额外的默认转义
    }
});

md.use(require("markdown-it-anchor").default)
md.use(require("markdown-it-table-of-contents"), {
    'includeLevel': [1, 2, 3, 4]
})

/**
 * 项目的定义
 */
class project {
    public static excepts = ['.DS_store']
    public file: string = ''
    public id: string = ''
    public title: string = ''
    public children: project[] = []
    public isFolder: boolean = false

    public constructor(file?: string) {
        if (file && path.basename(file) != '.DS_Store') {
            this.file = file
            this.id = file
            this.title = path.basename(this.file)
            this.isFolder = fs.statSync(file).isDirectory()
            if (fs.statSync(file).isDirectory()) {
                this.children = this.getChildren()
            }
        }
    }

    /**
     * 判断是否是空项目
     * 
     * @returns boolean
     */
    public isEmpty(): boolean {
        return this.file == '' || this.file == undefined
    }

    public notEmpty(): boolean {
        console.log(this.file)
        return !this.isEmpty()
    }

    private getChildren(): project[] {
        let projectPath = this.file
        let files: project[] = []
        let folders: project[] = []

        fs.readdirSync(this.file).forEach(function (child) {
            let childPath = path.join(projectPath, child)
            if (fs.statSync(childPath).isDirectory()) {
                folders.push(new project(childPath))
            } else {
                files.push(new project(childPath))
            }
        })

        return folders.concat(files)
    }

    public getContent(): string {
        let wrap = "```python\r\nxxx ```"
        return md.render(wrap.replace('xxx', fs.readFileSync(this.file, 'utf-8')))
    }
}

export default project