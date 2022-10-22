import fs from "fs"
import path from "path"
import electron from 'electron'

const md = require('markdown-it')({
    html: true
});

md.use(require("markdown-it-anchor").default)
md.use(require("markdown-it-table-of-contents"))

/**
 * 导航节点的定义
 * 
 * null->根节点->图书1->章节1
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
    public constructor(file?: string) {
        if (file) {
            let isDir = fs.statSync(file).isDirectory()
            this.file = file
            this.id = node.pathToId(file)
            this.title = this.getTitle()
            this.link = file === node.rootPath ? '/' : '/article/' + this.id
            this.title = file === node.rootPath ? '图书' : this.title

            // console.log('generate node for', this.id)
            if (isDir) {
                // 生成子节点
                // console.log('generate children for', this.id)
                fs.readdirSync(file).forEach((child, key) => {
                    let childPath = path.join(file, child)
                    let childNewPath = path.join(file, key + '.md')
                    if (!fs.statSync(childPath).isDirectory()) {
                        fs.renameSync(childPath, childNewPath);
                        this.children.push(new node(childNewPath))
                    } else {
                        this.children.push(new node(childPath))
                    }
                })
            }

            // console.log('new node created', this)
        } else {
            // console.log('empty node created')
        }
    }

    public static rootPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'markdown')
    public static rootNode: node
    public file: string = ''
    public id: string = ''
    public title: string = ''
    public link: string = ''
    public children: node[] = []

    /**
     * 获取markdown渲染后的HTML的标题
     * 
     * @returns 
     */
    public getTitle(): string {
        let isDir = fs.statSync(this.file).isDirectory()

        if (isDir) {
            if (!this.id.includes('-')) return this.id
            let fileName = this.file.replace(path.dirname(this.file), '')
            let title = fileName.split('-')[1]

            return title === undefined ? '' : title
        }

        let html = this.htmlWithToc()
        let dom = node.makeDom(html)
        let title = dom.getElementsByTagName('h1')[0]

        return title ? title.innerText : ''
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
        return this.children.length === 0
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

    /**
     * 当前节点的子节点中是否含有某个节点
     * 
     * @param node 
     * @returns 
     */
    public has(target: node): boolean {
        if (this.isLeaf()) return false

        for (const key in this.children) {
            if (this.children[key].id == target.id) {
                return true
            }
        }

        return false
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

        for (const key in this.children) {
            let item = this.children[key].find(id)
            if (item.notEmpty()) return item
        }

        return new node
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

    /**
     * 获取第一个子节点
     * 
     * @returns 
     */
    public first(): node {
        return this.children[0];
    }

    /**
     * 第一个叶子节点
     * 
     * @returns node
     */
    public firstLeaf(): node {
        if (this.isLeaf()) {
            return this
        }

        return this.first().firstLeaf();
    }

    /**
     * 下一个叶子节点
     * 
     */
    public nextLeaf(): node {
        let next = this.next()

        if (next.isLeaf() || next.isEmpty()) return next

        return next.firstLeaf();
    }

    public itemsToFirstLeaf(): node[] {
        let collection: node[] = []

        if (this.isLeaf()) return collection

        let firstChild = this.first()

        return collection.concat([firstChild]).concat(firstChild.itemsToFirstLeaf())
    }

    public content(): string {
        if (this.isLeaf()) {
            return fs.readFileSync(this.file, 'utf-8')
        }

        return this.firstLeaf().content()
    }

    public getOrderFromFileName(): number {
        let name = this.file.replace(path.dirname(this.file), '')

        let order = name.split('-')[0]
        return parseInt(order)
    }

    /**
     * 获取markdown渲染后的HTML
     * 
     * @returns 
     */
    public html() {
        // console.log('content of ', this.id, 'is', this.content())
        if (!fs.existsSync(this.file)) {
            return md.render("## 文件「" + this.id + "」不存在")
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

    /**
     * 
     * 创建DOM元素
     * 
     * @param html HTML代码
     * @returns 
     */
    public static makeDom(html: string) {
        let dom = document.createElement('div')
        dom.innerHTML = html

        return dom
    }

    public toc(): string {
        let htmlWithToc = this.htmlWithToc()
        let dom = node.makeDom(htmlWithToc)
        let toc = dom.getElementsByClassName('table-of-contents')[0]

        return toc ? toc.outerHTML : ''
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
     * @param activePath 
     * @returns 
     */
    public isActivated(activePath: string): boolean {
        // console.log('check', this.id, 'active path is ', activePath)
        // 如果是根节点
        if (this.isRoot()) return true;

        // 当前节点的链接等于目标链接
        if (this.link === activePath || '/editor/' + this.id === activePath) {
            return true;
        }

        // 如果当前节点是叶子节点
        if (this.isLeaf()) {
            return this.link == activePath
        }

        // 如果子节点active，当前节点就active
        for (const key in this.children) {
            let child = this.children[key]

            if (child.isActivated(activePath)) {
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

    /**
     * 
     * 激活的子孙节点中的终端节点
     * 
     * @param activePath 
     * @returns 
     */
    public getLastActivated(activePath: string): node {
        // console.log('get last activated child of', this, 'while path is ', activePath)
        if (activePath === '/') return node.getRoot()

        console.log('activated children are', this.getActivatedChildren(activePath))
        let last = this.getActivatedChildren(activePath).pop()

        // console.log('last activated child is', last)
        return last === undefined ? new node : last;
    }

    public current(activePath: string): node {
        return this.getLastActivated(activePath).firstLeaf()
    }

    /**
     * 删除本节点
     */
    public delete() {
        console.log('删除导航', this.id)
        fs.unlinkSync(this.file)
    }

    public parent() {
        // 空节点或根节点的父节点是空节点
        if (this.isEmpty() || this.isRoot()) return new node

        let parent = node.getRoot().findParent(this)

        // console.log('parent of ', this.id, 'is', parent.id)

        return parent;
    }

    /**
     * 获取父节点
     * 
     * @returns node
     */
    private findParent(target: node): node {
        // console.log('find parent of ', target.id, 'in', this.id)

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
     * 下一个节点
     * 
     * @returns node
     */
    public next(): node {
        let parent = this.parent()
        // console.log('get next of', this.id, ' parent is', parent)

        // 空节点的下一个节点是空节点
        if (this.id === '') {
            return new node;
        }

        // 根节点的下一个节点是空节点
        if (this.id === '/') {
            return new node
        }

        // 如果是父节点的最后一个节点，下一个节点=父节点的下一个节点
        if (this.id === parent.children.at(-1)?.id) {
            return parent.next()
        }

        let key = parent.findKey(this.id)
        let nextKey = key + 1

        return parent.children[nextKey]
    }

    /**
     * 计算出上一个节点
     * 
     * @returns node
     */
    public prev(): node {
        // console.log('get prev of ', this.id)

        let parent = this.parent()

        // 父节点为空，说明是空节点或根节点，上一个节点是空节点
        if (parent.isEmpty()) {
            return new node
        }

        // 父节点不为空，且是父节点的第一个节点，上一个节点=父节点的上一个节点
        if (this.id == parent.first().id) {
            return parent.prev()
        }

        // 父节点不为空，不是父节点的第一个节点，上一个节点=上一个兄弟节点
        return parent.children[parent.findKey(this.id) - 1]
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
        // let debugLog = path.join(process.cwd(), 'yizhi.log')
        let parent = this.parent()

        this.file = this.rename('moving');

        for (let index = parent.children.length - 1; index >= order; index--) {
            let child = parent.children[index]
            if (child.id !== this.id && index >= order) {
                // fs.appendFileSync(debugLog, 'rename ' + child.id + ' to ' + parent.id + '@' + (index + 1).toString() + "\r\n")
                // this.markdown.rename(parent.id + '@' + (index + 1).toString())
                // fs.renameSync(child.file, path.join(path.dirname(this.file), (index + 1).toString() + 'md'));
                child.rename(this.padding(index + 1))
            }
        }

        this.file = this.rename(this.padding(order));

        node.refreshedRoot()

        return new node(this.file)
    }

    public padding(num: number): string {
        if (num < 10) return '0' + num.toString()

        return num.toString()
    }

    public rename(newName: string): string {
        if (this.isLeaf()) {
            newName = path.join(path.dirname(this.file), newName + '.md')
        } else {
            newName = path.join(path.dirname(this.file), newName + '-' + this.title)
        }

        fs.renameSync(this.file, newName);

        return newName
    }

    /**
     * 新建一个子节点
     * 
     * @param title 
     * @returns 
     */
    public create(title: string): node {
        let file = path.join(this.file, this.children.length + '.md')
        fs.writeFileSync(file, "# " + title + "\r\n## 简介")

        return new node(file)
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

        console.log('root node generated', rootNode)
        return rootNode
    }

    /**
     * 将文件路径转换成节点ID
     * 
     * @param path 
     * @returns 
     */
    private static pathToId(path: string) {
        return path.replace(this.rootPath, '').replace('.md', '').replace('/', '').replaceAll('/', '@')
    }
}

export default node