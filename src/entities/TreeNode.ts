import fs from "fs"
import path from "path"
import Project from "./Project";
import Log from "../tools/Log";
import Order from "./Order";
import Markdown from "./Markdown";
import variables from "./Variables";
import Id from "./Id";
import FileTree from "../tools/FileTree";

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
class TreeNode {
    public static rootNode: TreeNode
    public static rootPath = variables.markdownRootPath
    public static excepts = variables.nodeExcepts

    public project: Project = new Project
    public id: string = ''
    public title: string = ''
    public level: number = 0
    public absolutePath: string = ''
    public children: TreeNode[] = []
    // public fileTree: FileTree = new FileTree('/')

    public constructor(file?: string) {
        if (file) {
            this.absolutePath = file
            this.id = Id.pathToId(file)
            this.title = this.getTitle()
            this.level = file.split('/').length - TreeNode.rootPath.split('/').length
            Order.initSortFile(this.absolutePath)
            this.setChildren()
            // this.fileTree = new FileTree(file)
        }
    }

    public setChildren() {
        let items = Order.getSort(this.absolutePath)

        items.forEach((child) => {
            if (child == 'code' || child == 'project') {
                // 子节点是一个项目
                this.project = new Project(path.join(this.absolutePath, child))
            } else if (!TreeNode.excepts.includes(child)) {
                let fullPath = path.join(this.absolutePath, child)
                this.children.push((new TreeNode(fullPath)))
            }
        })
    }

    // 判断是否是root节点
    public isRoot(): boolean {
        return this.id === '/'
    }

    // 判断是否是空节点
    public isEmpty(): boolean {
        return this.id === ''
    }

    // 判断是否是叶子节点
    public isLeaf(): boolean {
        return this.notEmpty() && fs.statSync(this.absolutePath).isFile()
    }

    // 判断是否是叶子节点
    public notLeaf(): boolean {
        return !this.isLeaf()
    }

    // 判断是否是空节点
    public notEmpty(): boolean {
        return !this.isEmpty()
    }

    // 判断是否是图书根节点
    public isBook(): boolean {
        return this.parent().isRoot()
    }

    // 当前节点的子节点中是否含有某个节点
    public has(target: TreeNode): boolean {
        return this.children.some(child => {
            return child.id === target.id
        })
    }

    // 在当前节点+子孙节点中查找
    public find(id: string): TreeNode {
        // console.log('try to find', id, 'in all sub nodes,now node is', this.id)
        if (this.id === id) {
            return this
        }

        let result = this.children.find(function (child) {
            return child.find(id);
        })

        return result === undefined ? new TreeNode : result
    }

    // 在子节点中寻找，返回找到的子节点的key
    public findKey(id: string): number {
        for (const key in this.children) {
            if (this.children[key].id == id) {
                return parseInt(key);
            }
        }

        return -1
    }

    public brothers(): TreeNode[] {
        return this.parent().children;
    }

    // 获取第一个子节点
    public first(): TreeNode {
        let first = this.children[0]

        return first === undefined ? new TreeNode : first
    }

    // 第一个叶子节点
    public firstLeaf(): TreeNode {
        return (this.isLeaf() || this.isEmpty()) ? this : this.first().firstLeaf();
    }

    // 最后一个叶子节点
    public lastLeaf(): TreeNode {
        return (this.isLeaf() || this.isEmpty()) ? this : this.last().lastLeaf();
    }

    // 下一个叶子节点
    public nextLeaf(): TreeNode {
        let next = this.next()

        return (next.isLeaf()) ? next : this.parent().next().firstLeaf();
    }

    public prevLeaf(): TreeNode {
        let prev = this.prev()

        return (prev.isLeaf()) ? prev : this.parent().prev().lastLeaf()
    }

    public itemsToFirstLeaf(): TreeNode[] {
        let collection: TreeNode[] = []

        if (this.isLeaf()) return collection

        let firstChild = this.first()

        return collection.concat([firstChild]).concat(firstChild.itemsToFirstLeaf())
    }

    public content(): string {
        return (new Markdown(this.firstLeaf().absolutePath)).content()
    }

    // 获取markdown渲染后的HTML
    public html() {
        return (new Markdown(this.firstLeaf().absolutePath)).html()
    }

    // 获取markdown渲染后的HTML，带TOC
    public htmlWithToc() {
        return (new Markdown(this.firstLeaf().absolutePath)).htmlWithToc()
    }

    public toc(): string {
        return (new Markdown(this.firstLeaf().absolutePath)).toc()
    }

    public save(content: string) {
        if (!fs.existsSync(path.dirname(this.absolutePath))) {
            fs.mkdirSync(path.dirname(this.absolutePath))
        }

        return fs.writeFileSync(this.absolutePath, content)
    }

    // 获取最后一个子节点
    public last(): TreeNode {
        return this.children[this.children.length - 1]
    }

    // 判断当前节点是否应该激活
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

    // 获取激活的子节点
    public activatedChild(activePath: string): TreeNode {
        // console.log('get activated child of', this.id, 'while active path is', activePath)
        for (const key in this.children) {
            let child = this.children[key]

            if (child.isActivated(activePath)) return child;
        }

        return new TreeNode;
    }

    // 获取本节点+激活的所有子孙节点
    public activated(activePath: string): TreeNode[] {
        let collection = this.getActivatedChildren(activePath)
        collection.unshift(this)

        // console.log('active path is ', activePath, 'activated are', collection)

        return collection
    }

    // 获取激活的所有子孙节点
    public getActivatedChildren(activePath: string): TreeNode[] {
        // console.log('get activated children of', this.id)
        let parent: TreeNode | null = this
        let collection: TreeNode[] = []

        while (parent !== null) {
            let activatedChild: TreeNode = parent.activatedChild(activePath)
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

    public current(): TreeNode {
        let id = (new URL(location.href)).searchParams.get('id')
        let filePath = Id.idToPath(id)

        Log.info('node.current', 'find current node by id:' + id)

        return new TreeNode(filePath)
    }

    // 删除本节点
    public delete() {
        if (this.isLeaf()) fs.unlinkSync(this.absolutePath)

        fs.rmdirSync(this.absolutePath)
    }

    public parent() {
        // 空节点或根节点的父节点是空节点
        if (this.isEmpty() || this.isRoot()) return new TreeNode

        let parent = TreeNode.getRoot().findParent(this)

        return parent;
    }

    public book(): TreeNode {
        if (this.isRoot() || this.parent().isRoot() || this.isEmpty()) return this;

        return this.parent().book();
    }

    // 获取父节点
    private findParent(target: TreeNode): TreeNode {
        if (this.has(target)) {
            return this
        }

        for (const key in this.children) {
            let result = this.children[key].findParent(target)
            if (!result.isEmpty()) {
                return result
            }
        }

        return new TreeNode
    }

    // 设置新的排序值
    public setOrder(order: number) {
        Order.setOrder(this.parent().absolutePath, this.getOrder(), order)
    }

    public getOrder(): number {
        let order = 0
        this.parent().children.forEach((child: TreeNode, index: number) => {
            if (child.id == this.id) {
                order = index
            }
        })

        console.log('order of ', this.id, 'is ', order)
        return order
    }

    // 新建一个子节点
    public create(title: string): TreeNode {
        let extname = path.extname(title)
        let fileName = title.replace(extname, '')
        let file = path.join(this.absolutePath, fileName + (extname ? extname : '.md'))

        fs.writeFileSync(file, "# " + fileName)

        return (new TreeNode(file))
    }

    // 新建一个目录子节点
    public createFolder(title: string): TreeNode {
        let file = path.join(this.absolutePath, title)

        fs.mkdirSync(file)

        return (new TreeNode(file))
    }

    // 按照标题查找节点
    public search(title: string): TreeNode[] {
        if (this.isEmpty() || this.isLeaf()) return []

        let result: TreeNode[] = []
        let children = this.children

        children.forEach(function (child) {
            // console.log('search for title', title, 'current is', child.title)
            if (child.title == title) result.push(child)

            result = result.concat(child.search(title))
        })

        return result
    }

    // 获取根导航节点
    public static getRoot(): TreeNode {
        if (this.rootNode) return this.rootNode

        this.rootNode = TreeNode.refreshedRoot()

        return this.rootNode
    }

    // 获取刷新后的根节点
    public static refreshedRoot(): TreeNode {
        return new TreeNode(TreeNode.rootPath)
    }

    // 下一个节点
    private next(): TreeNode {
        let parent = this.parent()
        let currentOrder = parent.findKey(this.id)
        let next = parent.children[currentOrder + 1]
        let result = next === undefined ? new TreeNode : next

        return result
    }

    // 计算出上一个节点
    private prev(): TreeNode {
        let parent = this.parent()
        let currentOrder = parent.findKey(this.id)
        let prev = parent.children[currentOrder - 1]

        return prev === undefined ? new TreeNode : prev
    }

    // 获取标题
    private getTitle(): string {
        if (this.absolutePath === TreeNode.rootPath) return '教程'

        let basename = path.basename(this.absolutePath)
        let extname = path.extname(this.absolutePath)
        let lastElement = basename.replace(extname, '').split('-').pop() ?? basename

        // 如果不是markdown文件，标题 = 分割后的最后一个元素
        if (extname !== '.md') {
            return lastElement
        }

        // 如果是markdown文件，获取markdown渲染后的HTML的标题
        let markdownTitle = (new Markdown(this.absolutePath)).getTitle()

        return markdownTitle ? markdownTitle : lastElement
    }
}

export default TreeNode