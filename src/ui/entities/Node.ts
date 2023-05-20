import NodeApi from "../api/NodeApi"
import mapKeys from "lodash/mapKeys"
import camelCase from "lodash/camelCase"
import componentLogger from "../log/componentLogger"

class Node {
    public id: number = 0
    public title: string = ''
    public priority: number = 0
    public parentId: number = 0
    public level: number = 0
    public cover: string = ''
    public content: string = ''
    public slug:string=''

    public isBook: boolean = false
    public isChapter: boolean = false
    public isEmpty: boolean = false
    public isHome: boolean = false
    public isLesson: boolean = true
    public isPage: boolean = false
    public isRoot: boolean = false
    public isTab: boolean = false
    public isVisible: boolean = true

    constructor(options: object) {
        if (!options) return EmptyNode

        // 将从数据库取出的数据转换成驼峰命名，并转换成 Node
        options = mapKeys(options, (value: any, key: any) => {
            return camelCase(key)
        })
        Object.assign(this, options)

        this.isRoot = this.parentId == 0
        this.isEmpty = this.id == 0
    }

    getBook(): Node {
        if (this.isEmpty) return this
        if (this.isBook) return this

        return this.getParent().getBook()
    }

    getFirstChild(): Node {
        let children = NodeApi.getChildren(this.id)
        let firstChild = children[0]

        return firstChild || EmptyNode
    }

    getLastChild(): Node {
        let children = NodeApi.getChildren(this.id).reverse()
        let lastChild = children[0]

        return lastChild || EmptyNode
    }

    getFirstPage(): Node {
        if (this.isPage || this.isEmpty) return this

        return this.getFirstChild().getFirstPage()
    }

    async getParent(): Promise<Node> {
        if (this.parentId == 0 || this.isEmpty || !this.parentId || this.isRoot) {
            return EmptyNode
        }

        componentLogger.info('get parent,id is', this.id, 'parent id is', this.parentId)
        let parent = await NodeApi.find(this.parentId)

        return parent
    }

    async getParents(): Promise<Node[]> {
        let parents: Node[] = []
        let parent = await this.getParent()

        while (parent != EmptyNode) {
            parents.push(parent)
            parent = await parent.getParent()
        }

        return parents.reverse()
    }

    async getChildren(): Promise<Node[]> {
        const children = await NodeApi.getChildren(this.id)
        return children
    }

    getVisibleChildren(): Node[] {
        return this.getChildren().filter(child => child.isVisible)
    }

    async getSiblings(): Promise<Node[]> {
        if (this.isRoot) return [EmptyNode]

        let parent = await this.getParent()
        let children = await parent.getChildren()

        return children.filter(child => child.id != this.id)
    }

    async getTabs(): Promise<Node[]> {
        let children = await this.getChildren()

        return children.filter(child => child.isTab)
    }

    async updateContent(content: string) {
        return NodeApi.updateContent(this.id, content)
    }

    async updateTitle(title: string) {
        return NodeApi.updateTitle(this.id, title)
    }

    async updateVisible(visible: boolean) {
        return NodeApi.updateVisible(this.id, visible)
    }

    async createChild(node: Node) {
        return NodeApi.create(node)
    }

    static updateChildrenPriority(children: Node[]) {
        children.forEach((child, index) => {
            NodeApi.updatePriority(child.id, index)
        })
    }
}

const EmptyNode = new Node({ title: '空节点', isEmpty: true, content: '空节点', id: 0 })
const RootNode = new Node({ title: '根节点', isRoot: true, content: '根节点', id: 0 })

export {
    Node,
    EmptyNode,
    RootNode
};