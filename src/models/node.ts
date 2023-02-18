import fs from "fs"
import path from "path"
import project from "./project";
import log from "./log";
import sort from "./sort";
import markdown from "./markdown";
import variables from "./variables";

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
    public static rootNode: node
    public static rootPath = variables.rootPath
    public static excepts = variables.nodeExcepts

    public isFolder: boolean = false
    public project: project = new project
    public file: string = ''
    public id: string = ''
    public title: string = ''
    public children: node[] = []
    public level: number = 0
    public markdown: markdown = new markdown

    public constructor(file?: string) {
        if (file) {
            // console.log('初始化节点', file)
            this.file = file
            this.id = node.pathToId(file)
            this.title = this.getTitle()
            this.isFolder = fs.statSync(this.file).isDirectory()
            this.level = file.split('/').length - node.rootPath.split('/').length
            sort.initSortFile(this.file)
            this.setChildren()
        }
    }

    public setChildren() {
        let items = sort.getSort(this.file)

        items.forEach((child) => {
            if (child == 'code' || child == 'project') {
                // 子节点是一个项目
                this.project = new project(path.join(this.file, child))
            } else if (!node.excepts.includes(child)) {
                let fullPath = path.join(this.file, child)
                this.children.push((new node(fullPath)))
            }
        })
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
        return this.notEmpty() && fs.statSync(this.file).isFile()
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
        return !this.isEmpty()
    }

    /**
     * 判断是否是图书根节点
     * 
     * @returns boolean
     */
    public isBook(): boolean {
        return this.parent().isRoot()
    }

    /**
     * 当前节点的子节点中是否含有某个节点
     * 
     * @param node 
     * @returns 
     */
    public has(target: node): boolean {
        return this.children.some(child => {
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
        return this.parent().children;
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
        return (this.isLeaf() || this.isEmpty()) ? this : this.first().firstLeaf();
    }

    /**
     * 最后一个叶子节点
     * 
     * @returns node
     */
    public lastLeaf(): node {
        return (this.isLeaf() || this.isEmpty()) ? this : this.last().lastLeaf();
    }

    /**
     * 下一个叶子节点
     * 
     */
    public nextLeaf(): node {
        let next = this.next()

        return (next.isLeaf()) ? next : this.parent().next().firstLeaf();
    }

    public prevLeaf(): node {
        let prev = this.prev()

        return (prev.isLeaf()) ? prev : this.parent().prev().lastLeaf()
    }

    public itemsToFirstLeaf(): node[] {
        let collection: node[] = []

        if (this.isLeaf()) return collection

        let firstChild = this.first()

        return collection.concat([firstChild]).concat(firstChild.itemsToFirstLeaf())
    }

    public content(): string {
        return (new markdown(this.firstLeaf().file)).content()
    }

    /**
     * 获取markdown渲染后的HTML
     * 
     * @returns 
     */
    public html() {
        return (new markdown(this.firstLeaf().file)).html()
    }

    /**
     * 获取markdown渲染后的HTML，带TOC
     * 
     * @returns 
     */
    public htmlWithToc() {
        return (new markdown(this.firstLeaf().file)).htmlWithToc()
    }

    public toc(): string {
        return (new markdown(this.firstLeaf().file)).toc()
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
        let url = new URL(location.href)
        let id = url.searchParams.get('id')
        let filePath = node.idToPath(id)

        log.info('node.current', 'find current node by id:' + id)

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
     * @param order 
     * @returns 
     */
    public setOrder(order: number) {
        sort.setOrder(this.parent().file, this.getOrder(), order)
    }

    public getOrder(): number {
        let order = 0
        this.parent().children.forEach((child, index) => {
            if (child.id == this.id) {
                order = index
            }
        })

        console.log('order of ', this.id, 'is ', order)
        return order
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

        return (new node(file))
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

        return (new node(file))
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
     * 获取根导航节点
     * 
     * @returns node
     */
    public static getRoot(): node {
        if (this.rootNode) return this.rootNode

        this.rootNode = node.refreshedRoot()

        return this.rootNode
    }

    /**
     * 获取刷新后的根节点
     * 
     * @returns 
     */
    public static refreshedRoot(): node {
        return new node(node.rootPath)
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
        let markdownTitle = (new markdown(this.file)).getTitle()

        return markdownTitle ? markdownTitle : lastElement
    }
}

export default node