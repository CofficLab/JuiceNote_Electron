import Preload from "./Preload"

const Ipc = Preload.ipc

const NodeApi = {
    getChildren(id: number): Node[] {
        let children = Ipc.sendSync('getChildren', id)

        return children.map((child: NodeOptions) => {
            return new Node(child)
        });
    },
    search(keyword: string): Node[] {
        return Ipc.sendSync('search', keyword).map((node: NodeOptions) => {
            return new Node(node)
        })
    },
    updatePriority(id: number, priority: number) {
        // console.log(this.title, '更新priority为', priority)
        Ipc.sendSync('updatePriority', id, priority)
    },
    updateContent(id: number, content: string) {
        dispatchEvent(new Event('nodeUpdated'))
        Ipc.send('updateContent', id, content)
    },
    updateCover(id: number, base64Code: string): string {
        return Ipc.sendSync('updateCover', id, base64Code)
    },
    updateTitle(id: number, title: string): string {
        return Ipc.sendSync('updateTitle', title, id)
    },
    updateVisible(id: number, visible: boolean) {
        Ipc.sendSync('updateVisible', id)
    },
    delete(id: number): string {
        return Ipc.sendSync('delete', id)
    },
    find(id: number | String): Node {
        return new Node(Ipc.sendSync('find', id))
    },
    getBooks(): Node[] {
        let items = Ipc.sendSync('getBooks')

        return items.map((item: NodeOptions) => {
            return new Node(item)
        });
    },
    getFirstBook(): Node {
        return this.getBooks()[0]
    },
    getVisibleBooks(): Node[] {
        return this.getBooks().map((item: NodeOptions) => {
            return new Node(item)
        }).filter(node => node.isVisible);
    }
}

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
        if (this.parentId == 0) {
            return EmptyNode
        }

        // console.log('get parent from db,id is', this.id, 'parent id is',this.parentId)
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

const EmptyNode = new Node({ title: '', isEmpty: true })
const ShopNode = new Node({ title: '商店', isShop: true, isLesson: false })
const HomeNode = new Node({ title: '首页', isHome: true, isLesson: false })
const DatabaseNode = new Node({ title: '知识库', isDatabase: true, isLesson: false })

export {
    Node,
    EmptyNode,
    NodeApi,
    ShopNode,
    HomeNode,
    DatabaseNode
};