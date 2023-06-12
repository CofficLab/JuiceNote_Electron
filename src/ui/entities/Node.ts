import NodeApi from "../api/NodeApi"
import mapKeys from "lodash/mapKeys"
import camelCase from "lodash/camelCase"
import componentLogger from "../log/componentLogger"
import { promises } from "dns"

class Node {
    public id: number = 0
    public title: string = ''
    public priority: number = 0
    public parentId: number = 0
    public level: number = 0
    public cover: string = ''
    public content: string = ''
    public slug: string = ''
    public updatedAt:string = (new Date()).toISOString()

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
    }

    getBook(): Node {
        if (this.isEmpty) return this
        if (this.isBook) return this

        return this.getParent().getBook()
    }

    async getFirstChild(): Promise<Node> {
        let children = await NodeApi.getChildren(this.id)
        let firstChild = children[0]

        return firstChild || EmptyNode
    }

    getLastChild(): Node {
        let children = NodeApi.getChildren(this.id).reverse()
        let lastChild = children[0]

        return lastChild || EmptyNode
    }

    async getFirstPage(): Promise<Node> {
        if (this.isPage || this.isEmpty) return this

        return  (await this.getFirstChild()).getFirstPage()
    }

    async getParent(): Promise<Node> {
        if (this.parentId == 0 || this.isEmpty || !this.parentId || this.isRoot) {
            return EmptyNode
        }

        componentLogger.info('get parent,id is', this.id, 'parent id is', this.parentId)
        let parent = await NodeApi.find(this.parentId)

        return parent
    }

    async delete() {
        return NodeApi.delete(this.id)
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

    async getSiblings(): Promise<Node[]> {
        if (this.isRoot) return [EmptyNode]

        let parent = await this.getParent()
        let children = await parent.getChildren()

        return children.filter(child => child.id != this.id)
    }

    async getPrev(): Promise<Node> {
        let parent = await this.getParent()
        let children = await parent.getChildren()
        let index = children.findIndex(child => child.id == this.id)
        let result = children[index - 1] ?? parent

        componentLogger.info(`获取「${this.title}」的上一个节点:「${result.title}」`)
        return result
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

    async update() {
        return NodeApi.save(this)
    }

    async createChild(node: Node) {
        return NodeApi.create(node)
    }

    async export() {
        return NodeApi.export(this.id)
    }

    async import() {
        return NodeApi.import(this.id)
    }

    async sync() {
        return NodeApi.sync(this)
    }
}

const EmptyNode = new Node({ title: '空节点', isEmpty: true, content: '空节点', id: 0 })
const RootNode = new Node({ title: '根节点', isRoot: true, content: '根节点', id: 0 })

export {
    Node,
    EmptyNode,
    RootNode
};