import Preload from "./Preload"

const Ipc = Preload.ipc

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

    constructor(public options: NodeOptions) {
        Object.assign(this, options)
    }

    // 创建子页面，返回新创建的ID
    createChildPage(title: string, content: string): Number {
        return Ipc.sendSync('createChildPage', this.id, title, content)
    }

    // 创建兄弟章节，返回新创建的ID
    createChildChapter(title: string): Number {
        return Ipc.sendSync('createChildChapter', this.id, title)
    }

    getBook(): Node {
        if (this.isBook) return this

        return this.getParent()!.getBook()
    }

    getFirstTabInParents(): Node | undefined {
        return this.getParents().find((parent) => parent.getParent()?.isBook)
    }

    getTabs(): Node[] {
        let tabs = Ipc.sendSync('getTabs', this.id)
        return tabs.map((tab: NodeOptions) => {
            return new Node(tab)
        })
    }

    getParent(): Node | null {
        if (this.parentId == 0) {
            return null
        }

        // console.log('get parent from db,id is', this.id, 'parent id is',this.parentId)
        let result = Node.find(this.parentId)

        return new Node(result ?? {})
    }

    getParents(): Node[] {
        let parents: Node[] = []
        let parent = this.getParent()

        while (parent) {
            parents.push(parent)
            parent = parent.getParent()
        }

        return parents.reverse()
    }

    getChildren(): Node[] {
        let children = Ipc.sendSync('getChildren', this.id)

        return children.map((child: NodeOptions) => {
            return new Node(child)
        });
    }

    getVisibleChildren(): Node[] {
        let children = Ipc.sendSync('getVisibleChildren', this.id)

        return children.map((child: NodeOptions) => {
            return new Node(child)
        });
    }

    getSiblings(): Node[] {
        return Ipc.sendSync('getSiblings', this.id).map((sibling: NodeOptions) => {
            return new Node(sibling)
        })
    }

    getFirstChild(): Node {
        let result = Ipc.sendSync('getFirstChild', this.id)

        return new Node(result ?? {})
    }

    getFirstPage(): Node {
        if (this.isPage) return this

        return this.getFirstChild().getFirstPage()
    }

    setChildrenPriority(children: Node[]) {
        // console.log('设置子元素的排序', children)
        children.forEach((child, index) => {
            child.updatePriority(index)
        })
    }

    refresh(): Node {
        return Node.find(this.id)
    }

    static updateChildrenPriority(children: Node[]) {
        let parent = children.at(0)?.getParent()
        if (parent == undefined) {
            throw '更新children发生错误，找不到parent'
        }

        parent.setChildrenPriority(children)
        dispatchEvent(new Event('nodeUpdated'))
    }

    updatePriority(priority: number) {
        // console.log(this.title, '更新priority为', priority)
        Ipc.sendSync('updatePriority', this.id, priority)
    }

    updateContent(content: string) {
        dispatchEvent(new Event('nodeUpdated'))
        Ipc.send('updateContent', this.id, content)
    }

    updateCover(base64Code: string): string {
        return Ipc.sendSync('updateCover', this.id, base64Code)
    }

    updateTitle(title: string): string {
        return Ipc.sendSync('updateTitle', title, this.id)
    }

    updateVisible(): string {
        let result = Ipc.sendSync('updateVisible', this.id)

        let updated = this.refresh()
        if (result != null) {
            return '「' + updated.title + '」已' + (updated.isVisible ? '展示' : '隐藏')
        } else {
            return '「' + updated.title + '」的可见性更新失败'
        }
    }

    delete(): string {
        return Ipc.sendSync('delete', this.id)
    }

    static find(id: number | String): Node {
        return new Node(Ipc.sendSync('find', id))
    }

    static getBooks(): Node[] {
        let items = Ipc.sendSync('getBooks')

        return items.map((item: NodeOptions) => {
            return new Node(item)
        });
    }

    static getVisibleBooks(): Node[] {
        return Node.getBooks().map((item: NodeOptions) => {
            return new Node(item)
        }).filter(node => node.isVisible);
    }

    static search(keyword: string): Node[] {
        return Ipc.sendSync('search', keyword).map((node: NodeOptions) => {
            return new Node(node)
        })
    }
}

const ShopNode = new Node({ title: '商店', isShop: true })
const HomeNode = new Node({ title: '首页', isHome: true })
const DatabaseNode = new Node({ title: '知识库', isDatabase: true })

export {
    Node,
    ShopNode,
    HomeNode,
    DatabaseNode
};