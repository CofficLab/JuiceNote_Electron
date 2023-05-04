import { NodeApi } from "../api/NodeApi"

interface NodeOptions {
    id?: number
    title: string
    isDatabase?: boolean
    isShop?: boolean
    isHome?: boolean
    isBook?: boolean
    isChapter?: boolean
    isTab?: boolean
    isPage?: boolean
    isLesson?: boolean
    isManual?: boolean
    isVisible?: boolean
    priority?: number
    parentId?: number
    level?: number
    isEmpty?: boolean
    cover?: string
    content?: string
}

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
    public priority: number = 0
    public parentId: number = 0
    public level: number = 0
    public isEmpty: boolean = false
    public cover: string = ''
    public content: string = ''

    constructor(options: NodeOptions) {
        Object.assign(this, options)
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

    getFirstPage(): Node {
        if (this.isPage) return this

        return this.getFirstChild().getFirstPage()
    }

    getParent(): Node {
        // console.log('get parent,id is', this.id, 'parent id is', this.parentId)
        
        if (this.parentId == 0 || this.isEmpty) {
            return EmptyNode
        }

        let result = NodeApi.find(this.parentId)

        return new Node(result)
    }

    getParents(): Node[] {
        let parents: Node[] = []
        let parent = this.getParent()

        while (parent != EmptyNode) {
            parents.push(parent)
            parent = parent.getParent()
        }

        return parents.reverse()
    }

    getChildren(): Node[] {
        return NodeApi.getChildren(this.id)
    }

    getVisibleChildren(): Node[] {
        return this.getChildren().filter(child => child.isVisible)
    }

    getSiblings(): Node[] {
        return this.getParent().getChildren().filter(child => child.id != this.id)
    }

    getTabs(): Node[] {
        let children = this.getChildren()

        return children.filter(child => child.isTab)
    }

    getFirstTabInParents(): Node | undefined {
        return this.getParents().find((parent) => parent.getParent()?.isBook)
    }
}

const EmptyNode = new Node({ title: '空节点', isEmpty: true,content: '空节点' })
const ShopNode = new Node({ title: '商店', isShop: true, isLesson: false })
const HomeNode = new Node({ title: '首页', isHome: true, isLesson: false })
const DatabaseNode = new Node({ title: '知识库', isDatabase: true, isLesson: false })
const RootNode = new Node({ title: '根节点', isEmpty: false, content: '根节点',id:0 })

export {
    Node,
    NodeOptions,
    EmptyNode,
    RootNode,
    ShopNode,
    HomeNode,
    DatabaseNode
};