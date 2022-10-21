import fs from 'fs'
import path from 'path'
import electron from 'electron'

const root = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'markdown')
const md = require('markdown-it')({
    html: true
});

md.use(require("markdown-it-anchor").default)
md.use(require("markdown-it-table-of-contents"))

class markdown {
    public constructor(id?: string) {
        if (id) this.id = id
    }

    public id: string = ''

    public static root(): string {
        return root
    }

    /**
     * 返回对应的目录或文件的绝对路径
     * 
     * @returns string
     */
    public absolutePath(): string {
        let asFolder = markdown.idToPath(this.id, true)
        let asFile = markdown.idToPath(this.id)

        if (fs.existsSync(asFolder)) {
            return asFolder;
        }

        return asFile;
    }

    public isFolder(): boolean {
        return fs.statSync(this.absolutePath()).isDirectory()
    }

    /**
     * 获取文件的原始内容
     * 
     * @returns 
     */
    public content() {
        var absolutePath = this.absolutePath()

        if (!fs.existsSync(absolutePath)) {
            console.error(absolutePath + 'not exists')
            return absolutePath + 'not exists'
        }

        return fs.readFileSync(absolutePath, 'utf-8')
    }

    /**
     * 获取markdown渲染后的HTML，带TOC
     * 
     * @returns 
     */
    public htmlWithToc() {
        if (!fs.existsSync(this.absolutePath())) {
            return md.render("## 文件「" + this.id + "」不存在")
        }

        return md.render("[[toc]] \r\n" + this.content())
    }

    /**
     * 获取markdown渲染后的HTML的标题
     * 
     * @returns 
     */
    public getTitle(): string {
        let html = this.htmlWithToc()
        let dom = this.makeDom(html)
        let title = dom.getElementsByTagName('h1')[0]

        return title ? title.innerText : ''
    }

    /**
     * 获取markdown的table of contents
     * 
     * @returns 
     */
    public getToc(): string {
        let htmlWithToc = this.htmlWithToc()
        let dom = this.makeDom(htmlWithToc)
        let toc = dom.getElementsByClassName('table-of-contents')[0]

        return toc ? toc.outerHTML : ''
    }

    /**
     * 获取markdown渲染后的HTML
     * 
     * @returns 
     */
    public html(): string {
        if (!fs.existsSync(this.absolutePath())) {
            return md.render("## 文件「" + this.id + "」不存在")
        }

        return md.render(this.content())
    }

    /**
     * 获取markdown渲染后的不带标题的HTML
     * 
     * @returns 
     */
    public htmlWithoutTitle(): string {
        return this.removeTitle()
    }

    /**
     * 往markdown文件里写内容
     * 
     * @param content 要写入的内容
     * @returns 
     */
    public save(content: string): void {
        if (!fs.existsSync(path.dirname(this.absolutePath()))) {
            fs.mkdirSync(path.dirname(this.absolutePath()))
        }

        return fs.writeFileSync(this.absolutePath(), content)
    }

    /**
     * 重命名文件
     * 
     * @param newId 新名字 
     */
    public rename(newId: string) {
        if (this.id !== newId) {
            console.log('markdown:rename', this.id, 'to', newId)
            console.log('markdown:rename', this.absolutePath(), 'to', markdown.idToPath(newId))
            fs.renameSync(this.absolutePath(), markdown.idToPath(newId));
        }
    }

    /**
     * 删除Markdown文件
     * 
     * @returns 
     */
    public deleteFile(): void {
        fs.unlinkSync(this.absolutePath())
    }

    /**
     * 移除标题部分
     * 
     * @returns 
     */
    public removeTitle() {
        let dom = this.makeDom(this.html())
        let toc = dom.getElementsByTagName('h1')[0]

        if (toc) dom.removeChild(toc)

        return dom.innerHTML
    }

    /**
     * 
     * 创建DOM元素
     * 
     * @param html HTML代码
     * @returns 
     */
    public makeDom(html: string) {
        let dom = document.createElement('div')
        dom.innerHTML = html

        return dom
    }

    /**
     * 移动文件
     * 
     * @param destination 
     */
    public moveTo(destination: string) {
        fs.renameSync(this.absolutePath(), (new markdown(destination)).absolutePath())
    }

    /**
     * 获取文件名前的数字
     * 
     * @returns 
     */
    public order() {
        return this.id.split('_')[0]
    }

    /**
     * 根据文件的ID判断文件是否存在
     * 
     * @returns 
     */
    public isExists() {
        return fs.existsSync(this.absolutePath())
    }

    /**
     * 获取文件的ID，从path推导出来
     * 
     * @param path 
     * @returns 
     */
    public static getId(path: string) {
        console.log('id for', path, 'is', path.replace(root, '').replace('.md', '').replace('/', '').replaceAll('/', '@'))
        return path.replace(root, '').replace('.md', '').replace('/', '').replaceAll('/', '@')
    }

    public static idToPath(id: string, isFolder: boolean = false) {
        if (isFolder) return path.join(root, id.replace('@', '/'))

        return path.join(root, id.replace('@', '/') + '.md')
    }
}

export default markdown
