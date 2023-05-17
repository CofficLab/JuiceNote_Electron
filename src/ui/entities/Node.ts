import NodeApi from "../api/NodeApi"
import mapKeys from "lodash/mapKeys" 
import camelCase  from "lodash/camelCase"

// interface NodeOptions {
//     id?: number
//     title: string
//     priority?: number
//     parent_id?: number
//     level?: number
//     cover?: string
//     content?: string
//     is_root?: boolean
//     is_database?: boolean
//     is_shop?: boolean
//     is_home?: boolean
//     is_book?: boolean
//     is_chapter?: boolean
//     is_tab?: boolean
//     is_page?: boolean
//     is_lesson?: boolean
//     is_manual?: boolean
//     is_visible?: boolean
//     is_empty?: boolean
// }

class Node {
    public id: number = 0
    public title: string = ''
    public isDatabase: boolean = false
    public isShop: boolean = false
    public isHome: boolean = false
    public isBook: boolean = false
    public isChapter: boolean = false
    public isTab: boolean = false
    public isPage: boolean = false
    public isLesson: boolean = true
    public isManual: boolean = false
    public isVisible: boolean = true
    public isRoot:boolean =false
    public priority: number = 0
    public parentId: number = 0
    public level: number = 0
    public isEmpty: boolean = false
    public cover: string = ''
    public content: string = ''

    constructor(options: object) {
        // 将从数据库取出的数据转换成驼峰命名
        options = mapKeys(options, (value, key) => {
            return camelCase(key)
        })

        Object.assign(this, options)

        if (this.parentId == 0) this.isRoot = true
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
        if (this.isPage ||this.isEmpty) return this

        return this.getFirstChild().getFirstPage()
    }

    async getParent(): Promise<Node> {
        // console.log('get parent,id is', this.id, 'parent id is', this.parentId)
        
        if (this.parentId == 0 || this.isEmpty || !this.parentId) {
            return EmptyNode
        }

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

    static updateChildrenPriority(children: Node[]) {
        children.forEach((child,index) => {
            NodeApi.updatePriority(child.id, index)
        })
    }
}

const EmptyNode = new Node({ title: '空节点', isEmpty: true,content: '空节点',id:0 })

export {
    Node,
    EmptyNode,
};