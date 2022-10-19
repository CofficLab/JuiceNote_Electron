import fs from "fs"
import path from "path"
import markdown from "./markdown"

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
    public constructor(id?: string) {
        if (id) this.id = id
    }
    public static root: node
    public id: string = ''
    public title: string = ''
    public link: string = ''
    public children: node[] = []
    /**
     * 在子孙节点中查找
     * 
     * @param id 要查找的节点的ID
     * @returns 
     */
    public find(id: string): node | null {
        // console.log('try to find', id, 'now node is', this.id)
        if (this.id === id) {
            return this
        }

        for (const key in this.children) {
            let node = this.children[key].find(id)
            if (node) return node
        }

        this.children.forEach(function (child) {
            let node = child.find(id)
            if (node) return node
        })

        return null
    }
    public isRoot() {
        return this.id === '/'
    }
    public isEmpty() {
        return this.id === ''
    }
    public findKey(id: string): number {
        for (const key in this.children) {
            if (this.children[key].id == id) {
                return parseInt(key);
            }
        }

        return -1
    }
    public getFirstChild(): node {
        let first = this.children[0];

        return first
    }
    public getLastChild(): node {
        let len = this.children.length

        return this.children[len - 1]
    }
    public isActivated(activePath: string) {
        // console.log('check', this.id, 'active path is ', activePath)
        // 如果是根节点
        if (this.id === '/') {
            return true;
        }

        // 当前节点的链接等于目标链接
        if (this.link === activePath) {
            // console.log('now is', this)
            // console.log(this.id + ' should be active,link is', this.link, 'active path is', activePath)
            return true;
        }

        // 如果当前节点没有子节点
        if (this.children.length === 0) {
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
    public getActivatedChild(activePath: string): node {
        // console.log('get activated child of', this.id, 'while active path is', activePath)
        for (const key in this.children) {
            let child = this.children[key]

            if (child.isActivated(activePath)) return child;
        }

        return new node;
    }
    public getActivated(activePath: string): node[] {
        let collection = this.getActivatedChildren(activePath)
        collection.unshift(this)

        // console.log('active path is ', activePath, 'activated are', collection)

        return collection
    }
    public getActivatedChildren(activePath: string): node[] {
        // console.log('get activated children of', this.id)
        let parent: node | null = this
        let collection: node[] = []

        while (parent !== null) {
            let activatedChild: node = parent.getActivatedChild(activePath)
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
    public getLastActivatedChild(activePath: string): node {
        // console.log('get last activated child of', this, 'while path is ', activePath)
        if (activePath === '/') return node.getRoot().getFirstChild()

        // console.log('activated children are', this.getActivatedChildren(activePath))
        let last = this.getActivatedChildren(activePath).pop()

        // console.log('last activated child is', last)
        return last === undefined ? new node : last;
    }
    public delete() {
        console.log('删除导航', this.id)
        markdown.deleteMarkdownFile(this.id)
        // update()
    }
    public getParent(): node {
        // console.log('get parent of ', this)

        // 空节点或根节点的父节点是null
        if (this.id === '' || this.id === '/') {
            return new node
        }

        let rootNode = node.getRoot()
        let activatedNodes = [rootNode].concat(rootNode.getActivatedChildren(this.link))
        // console.log('activated nodes,when', this.id, activatedNodes)
        for (const key in activatedNodes) {
            if (activatedNodes[key].id === this.id) {
                return activatedNodes[parseInt(key) - 1]
            }
        }

        return new node
    }
    public next(): node {
        let parent = this.getParent()
        console.log('get next of', this.id, ' parent is', parent)

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
        console.log('get prev of ', this.id)

        let parent = this.getParent()

        // 父节点为空，说明是空节点或根节点，上一个节点是空节点
        if (parent.isEmpty()) {
            return new node
        }

        // 父节点不为空，且是父节点的第一个节点，上一个节点=父节点的上一个节点
        if (this.id == parent.getFirstChild().id) {
            return parent.prev()
        }

        // 父节点不为空，不是父节点的第一个节点，上一个节点=上一个兄弟节点
        return parent.children[parent.findKey(this.id) - 1]
    }
    public update(node: node): boolean {
        console.log('update', this.id, 'set children to', node.children)
        // 如果是根节点
        if (this.id === '/') {
            return update(node)
        }

        // 非根节点
        let parent = this.getParent()
        if (!parent) return false

        let key = parent.findKey(this.id)
        parent.children[key] = node

        return parent.update(parent)
    }
    public setOrder(order: number) {
        let parent = this.getParent()
        if (parent === null) return false

        // 从父节点的子节点列表中删除本节点
        parent.children.splice(parent.findKey(this.id), 1);
        // 在指定的位置增加本节点
        parent.children.splice(order, 0, this);

        return parent.update(parent)
    }
    public createChild(title: string): node {
        let id = this.id + '@' + this.children.length
        markdown.writeToMarkdownFile(id, "# " + title + "\r\n## 简介")
        // update()

        let created = node.getRoot().find(id)
        if (!created) {
            console.error('error,can not find ', id)
            return new node
        }

        return created
    }
    /**
     * 生成一个导航节点
     * 
     * @param navigator 
     * @returns 
     */
    public static make(navigator: string): node {
        // console.log('now make navigator node for ' + navigator)

        let created = new node
        created.id = navigator.replace(markdown.markdownRootPath + '/', '').replaceAll('/', '@').replace('.md', '')

        let markdownTitle = markdown.getMarkdownTitle(navigator.replace(markdown.markdownRootPath + '/', '').replace('.md', ''))
        let title = markdownTitle ? markdownTitle : created.id.split('@').pop()
        created.title = title != undefined ? title : ''

        created.link = '/article/' + created.id
        if (!created.link.includes('@')) created.link = created.link + '@0'

        if (!fs.existsSync(navigator)) {
            console.log('无法生成导航，文件不存在', navigator)
            return new node
        }

        let stat = fs.statSync(navigator)

        if (stat.isDirectory()) {
            let children = fs.readdirSync(navigator)
            children.forEach((child) => {
                let childNode = this.make(path.join(navigator, child))
                created.children.push(childNode)
            })
        }

        // console.log('navigator node for ' + navigator, node)

        return created;
    }
    /**
     * 获取根导航节点
     * 
     * @returns node
     */
    public static getRoot(): node {
        if (this.root) return this.root

        console.log('regenerate root node')
        let root = new node('/')
        root.link = '/'
        root.title = '图书'

        fs.readdirSync(markdown.root).forEach((node) => {
            root.children.push(this.make(path.join(markdown.root, node)))
        })

        // console.log('root node', root)
        this.root = root
        return root
    }
}

export default node