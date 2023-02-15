import fs from "fs"
import path from "path"
import electron from 'electron'
import hljs from 'highlight.js'
import project from "./project";
import log from "./log";

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
 * 导航节点的定义，基于“树”数据结构
 * 
 * 空节点->根节点->图书1->章节1
 *                   -> 章节2 
 *                   -> 章节n
 *            ->图书2->章节1
 *                   -> 章节2 
 *                   -> 章节n
 *            ->图书3->章节1
 *                   -> 章节2 
 *                   -> 章节n
 *            ->图书n->章节1
 *                   -> 章节2 
 *                   -> 章节n
 */
class node {
    public static rootPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'markdown')
    public static rootNode: node
    public static excepts = ['README.md', 'footer.md', 'projects', 'code', '.DS_Store', 'node_modules']
    public isFolder = false
    public project: project = new project
    public file: string = ''
    public id: string = ''
    public title: string = ''
    public children: node[] = []
    public order: number = 0
    public level: number = 0

    public constructor(file?: string) {
        // console.log('初始化节点', file)
        if (file) {
            this.file = file
            this.order = this.getOrder()
            this.id = node.pathToId(file)
            this.title = this.getTitle()
            this.isFolder = fs.statSync(this.file).isDirectory()
            this.level = file.split('/').length - node.rootPath.split('/').length

            if (fs.statSync(file).isDirectory()) {
                var order = 0;
                fs.readdirSync(file).forEach((child) => {
                    if (child == 'code' || child == 'project') {
                        // 子节点是一个项目
                        this.project = new project(path.join(this.file, child))
                    } else if (!node.excepts.includes(child)) {
                        let fullPath = path.join(file, child)
                        this.children.push((new node(fullPath)).renameWithOrder(++order))
                    }
                })
            }
        }
    }

    /**
     * 判断是否是root节点
     * 
     * @returns boolean
     */
    public isRoot(): boolean {
        return this.id === '/'
    }

    /**
     * 判断是否是空节点
     * 
     * @returns boolean
     */
    public isEmpty(): boolean {
        return this.id === ''
    }

    /**
     * 判断是否是叶子节点
     * 
     * @returns boolean
     */
    public isLeaf(): boolean {
        return this.notEmpty() && !fs.statSync(this.file).isDirectory()
    }

    /**
     * 判断是否是叶子节点
     * 
     * @returns boolean
     */
    public notLeaf(): boolean {
        return !this.isLeaf()
    }

    /**
     * 判断是否是空节点
     * 
     * @returns boolean
     */
    public notEmpty(): boolean {
        return this.id !== ''
    }

    public isBook(): boolean {
        return this.parent() === node.rootNode
    }

    public linkId(): string {
        if (this.isRoot()) return ''

        if (this.parent().isRoot()) return this.order.toString()

        return this.parent().linkId() + '@' + this.order
    }

    /**
     * 当前节点的子节点中是否含有某个节点
     * 
     * @param node 
     * @returns 
     */
    public has(target: node): boolean {
        return this.children.some(function (child) {
            return child.id === target.id
        })
    }

    /**
     * 在当前节点+子孙节点中查找
     * 
     * @param id 要查找的节点的ID
     * @returns node
     */
    public find(id: string): node {
        // console.log('try to find', id, 'in all sub nodes,now node is', this.id)
        if (this.id === id) {
            return this
        }

        let result = this.children.find(function (child) {
            return child.find(id);
        })

        return result === undefined ? new node : result
    }

    /**
     * 在子节点中寻找，返回找到的子节点的key
     * 
     * @param id 
     * @returns 
     */
    public findKey(id: string): number {
        for (const key in this.children) {
            if (this.children[key].id == id) {
                return parseInt(key);
            }
        }

        return -1
    }

    public brothers(): node[] {
        let parent = this.parent();

        return parent.children;
    }

    /**
     * 获取第一个子节点
     * 
     * @returns 
     */
    public first(): node {
        let first = this.children[0]

        return first === undefined ? new node : first
    }

    /**
     * 第一个叶子节点
     * 
     * @returns node
     */
    public firstLeaf(): node {
        if (this.isLeaf() || this.isEmpty()) {
            return this
        }

        return this.first().firstLeaf();
    }

    /**
     * 最后一个叶子节点
     * 
     * @returns node
     */
    public lastLeaf(): node {
        if (this.isLeaf() || this.isEmpty()) {
            return this
        }

        return this.last().lastLeaf();
    }

    /**
     * 下一个叶子节点
     * 
     */
    public nextLeaf(): node {
        let next = this.next()

        if (next.isLeaf()) return next

        return this.parent().next().firstLeaf();
    }

    public prevLeaf(): node {
        let prev = this.prev()

        if (prev.isLeaf()) return prev

        return this.parent().prev().lastLeaf()
    }

    public itemsToFirstLeaf(): node[] {
        let collection: node[] = []

        if (this.isLeaf()) return collection

        let firstChild = this.first()

        return collection.concat([firstChild]).concat(firstChild.itemsToFirstLeaf())
    }

    public content(): string {
        if (this.isLeaf()) {
            // 需要补上markdown文件共同的footer
            return fs.readFileSync(this.file, 'utf-8') + fs.readFileSync(path.join(node.rootPath, 'footer.md'), 'utf-8')
        }

        if (this.firstLeaf().notEmpty()) return this.firstLeaf().content()

        return md.render("## 当前节点没有页面，请新建\r\n" + this.id)
    }

    /**
     * 获取markdown渲染后的HTML
     * 
     * @returns 
     */
    public html() {
        if (this.isEmpty()) {
            return md.render("## 当前页面是空节点 \r\n ## 返回 <a href=\"/\">首页</a>")
        }

        if (!fs.existsSync(this.file)) {
            return md.render("## 文件「" + this.file + "」不存在")
        }

        if (path.extname(this.file) === '.py') {
            return md.render("# " + this.title + "\r\n```python\r\n" + this.content() + "\r\n```")
        }

        return md.render(this.content())
    }

    /**
     * 获取markdown渲染后的HTML，带TOC
     * 
     * @returns 
     */
    public htmlWithToc() {
        if (!fs.existsSync(this.file)) {
            return md.render("## 文件「" + this.id + "」不存在")
        }

        return md.render("[[toc]] \r\n" + this.content())
    }

    public toc(): string {
        let htmlWithToc = this.htmlWithToc()
        let dom = node.makeDom(htmlWithToc)
        let toc = dom.getElementsByClassName('table-of-contents')[0]

        if (toc == undefined) return ''

        let tocWithoutTitle = toc.getElementsByTagName('ul')[0].getElementsByTagName('ul')[0]

        return tocWithoutTitle ? tocWithoutTitle.outerHTML : ''
    }

    public save(content: string) {
        if (!fs.existsSync(path.dirname(this.file))) {
            fs.mkdirSync(path.dirname(this.file))
        }

        return fs.writeFileSync(this.file, content)
    }

    /**
     * 获取最后一个子节点
     * 
     * @returns 
     */
    public last(): node {
        return this.children[this.children.length - 1]
    }

    /**
     * 判断当前节点是否应该激活
     * 
     * @param id 节点ID 
     * @returns 
     */
    public isActivated(id?: string): boolean {
        if (id === undefined) {
            let queryId = (new URL(location.href)).searchParams.get('id')
            if (queryId !== null) id = queryId
        }

        // 如果是根节点
        if (this.isRoot()) return true;

        if (this.id === id) return true;

        // 如果当前节点是叶子节点
        if (this.isLeaf()) return this.id == id

        // 如果子节点active，当前节点就active
        for (const key in this.children) {
            let child = this.children[key]

            if (child.isActivated(id)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 获取激活的子节点
     * 
     * @param activePath 
     * @returns 
     */
    public activatedChild(activePath: string): node {
        // console.log('get activated child of', this.id, 'while active path is', activePath)
        for (const key in this.children) {
            let child = this.children[key]

            if (child.isActivated(activePath)) return child;
        }

        return new node;
    }

    /**
     * 获取本节点+激活的所有子孙节点
     * 
     * @param activePath 
     * @returns 
     */
    public activated(activePath: string): node[] {
        let collection = this.getActivatedChildren(activePath)
        collection.unshift(this)

        // console.log('active path is ', activePath, 'activated are', collection)

        return collection
    }

    /**
     * 获取激活的所有子孙节点
     * 
     * @param activePath 
     * @returns 
     */
    public getActivatedChildren(activePath: string): node[] {
        // console.log('get activated children of', this.id)
        let parent: node | null = this
        let collection: node[] = []

        while (parent !== null) {
            let activatedChild: node = parent.activatedChild(activePath)
            if (activatedChild.id) {
                collection.push(activatedChild)
                parent = activatedChild
            } else {
                parent = null
            }
        }

        // console.log('node is', this.id, 'active path is', activePath, 'activated children', collection)

        return collection
    }

    public current(): node {
        log.info('node.current', 'find current node by id')
        let url = new URL(location.href)
        let id = url.searchParams.get('id')
        let filePath = node.idToPath(id)

        return new node(filePath)
    }

    /**
     * 删除本节点
     */
    public delete() {
        if (this.isLeaf()) fs.unlinkSync(this.file)

        fs.rmdirSync(this.file)
    }

    public parent() {
        // 空节点或根节点的父节点是空节点
        if (this.isEmpty() || this.isRoot()) return new node

        let parent = node.getRoot().findParent(this)

        // console.log('parent of ', this.id, 'is', parent.id)

        return parent;
    }

    public book(): node {
        if (this.isRoot() || this.parent().isRoot() || this.isEmpty()) return this;

        return this.parent().book();
    }

    /**
     * 获取父节点
     * 
     * @returns node
     */
    private findParent(target: node): node {
        if (this.has(target)) {
            return this
        }

        for (const key in this.children) {
            let result = this.children[key].findParent(target)
            if (!result.isEmpty()) {
                return result
            }
        }

        return new node
    }

    /**
     * 设置新的排序值
     * 
     * 例如：将第5个移动到第2个
     *  将第2个重命名为3
     *  将第3个重命名为4
     *  ......
     *  将第5个重命名为2
     * @param order 
     * @returns 
     */
    public setOrder(order: number): node {
        let parent = this.parent()

        let newNode = this.renameWithOrder(order);

        for (let index = parent.children.length - 1; index + 1 >= order; index--) {
            let child = parent.children[index]
            if (child.id !== this.id && index + 1 >= order) {
                child.renameWithOrder(index + 2)
            }
        }

        // node.refreshedRoot()

        return newNode
    }

    /**
     * 新建一个子节点
     * 
     * @param title 
     * @returns 
     */
    public create(title: string): node {
        let extname = path.extname(title)
        let fileName = title.replace(extname, '')
        let file = path.join(this.file, fileName + (extname ? extname : '.md'))

        fs.writeFileSync(file, "# " + fileName)

        return (new node(file)).renameWithOrder(this.children.length + 1)
    }

    /**
     * 新建一个目录子节点
     * 
     * @param title 
     * @returns 
     */
    public createFolder(title: string): node {
        let file = path.join(this.file, title)

        fs.mkdirSync(file)

        return (new node(file)).renameWithOrder(this.children.length + 1)
    }

    /**
     * 按照标题查找节点
     * 
     * @param title 标题
     * @returns node[]
     */
    public search(title: string): node[] {
        if (this.isEmpty() || this.isLeaf()) return []

        let result: node[] = []
        let children = this.children

        children.forEach(function (child) {
            // console.log('search for title', title, 'current is', child.title)
            if (child.title == title) result.push(child)

            result = result.concat(child.search(title))
        })

        return result
    }

    /**
     * 完整的标题
     * 
     * @returns string
     */
    public fullTitle(): string {
        if (this.isRoot()) return ''

        if (this.parent().isRoot()) {
            return this.title
        }

        return this.parent().fullTitle() + '-' + this.title
    }

    /**
     * 获取根导航节点
     * 
     * @returns node
     */
    public static getRoot(): node {
        if (this.rootNode) return this.rootNode

        this.rootNode = node.generateRoot()

        return this.rootNode
    }

    /**
     * 获取刷新后的根节点
     * 
     * @returns 
     */
    public static refreshedRoot(): node {
        this.rootNode = node.generateRoot()

        return this.rootNode
    }

    /**
     * 读取文件，生成根节点
     * 
     * @returns 
     */
    public static generateRoot(): node {
        let rootNode = new node(node.rootPath)

        // console.log('root node generated', rootNode)
        return rootNode
    }

    /**
     * 下一个节点
     * 
     * @returns node
     */
    private next(): node {
        let parent = this.parent()
        let currentOrder = parent.findKey(this.id)
        let next = parent.children[currentOrder + 1]
        let result = next === undefined ? new node : next

        return result
    }

    /**
     * 计算出上一个节点
     * 
     * @returns node
     */
    private prev(): node {
        let parent = this.parent()
        let currentOrder = parent.findKey(this.id)
        let prev = parent.children[currentOrder - 1]

        return prev === undefined ? new node : prev
    }

    /**
     * 将文件路径转换成节点ID
     * 
     * @param path 
     * @returns 
     */
    private static pathToId(path: string) {
        let id = path.replace(this.rootPath, '').replace('.md', '').replace('/', '').replaceAll('/', '@')

        return id === '' ? '/' : id
    }

    /**
     * 将节点ID转换成文件路径
     */
    private static idToPath(id: string | null) {
        if (id == null || id == '') {
            return node.rootPath
        }

        let folderPath = path.join(node.rootPath, id.replaceAll('@', '/'))
        let markdownFilePath = folderPath + '.md'

        if (fs.existsSync(markdownFilePath)) {
            return markdownFilePath
        }

        return folderPath
    }

    /**
     * 获取标题
     * 
     * @returns 
     */
    private getTitle(): string {
        if (this.file === node.rootPath) return '教程'

        let basename = path.basename(this.file)
        let extname = path.extname(this.file)
        let lastElement = basename.replace(extname, '').split('-').pop() ?? basename

        // 如果不是markdown文件，标题 = 分割后的最后一个元素
        if (extname !== '.md') {
            return lastElement
        }

        // 如果是markdown文件，获取markdown渲染后的HTML的标题
        let html = this.htmlWithToc()
        let dom = node.makeDom(html)
        let titleDom = dom.getElementsByTagName('h1')[0]

        return titleDom ? titleDom.innerText : lastElement
    }

    /**
     * 获取顺序
     * 
     * @returns 
     */
    private getOrder(): number {
        if (this.file === node.rootPath) return 0

        let basename = path.basename(this.file)
        let order = basename.split('-')[0]

        return parseInt(order)
    }

    /**
     * 
     * 创建DOM元素
     * 
     * @param html HTML代码
     * @returns 
     */
    private static makeDom(html: string) {
        let dom = document.createElement('div')
        dom.innerHTML = html

        return dom
    }

    /**
     * 
     * 激活的子孙节点中的终端节点
     * 
     * @param activePath 
     * @returns 
     */
    private getLastActivated(activePath: string): node {
        // console.log('get last activated child of', this, 'while path is ', activePath)
        if (activePath === '/') return node.getRoot()

        // console.log('activated children are', this.getActivatedChildren(activePath))
        let last = this.getActivatedChildren(activePath).pop()

        // console.log('last activated child is', last)
        return last === undefined ? new node : last;
    }

    private padding(num: number): string {
        if (num < 10) return '0' + num.toString()

        return num.toString()
    }

    private renameWithOrder(order: number): node {
        let extname = path.extname(this.file)
        let name = this.padding(order) + '-' + this.title.replaceAll("/", ".").replaceAll("%", "percent")
        let fileNewPath = path.join(path.dirname(this.file), name + extname)

        if (this.file != fileNewPath) {
            console.log('rename', this.file, 'to', fileNewPath)
            fs.renameSync(this.file, fileNewPath)
        }

        return new node(fileNewPath)
    }
}

export default node