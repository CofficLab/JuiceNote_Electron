import Preload from "./Preload"

const Ipc = Preload.ipc

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
    public isVisible: boolean = false
    public priority: number = 0
    public parentId: number = 0
    public level: number = 0
    public isEmpty: boolean = false
    public cover: string = ''
    public content: string = ''

    public constructor(dbResult: object | null) {
        if (dbResult == null) {
            this.isEmpty = true
        } else {
            let id = Object.getOwnPropertyDescriptor(dbResult, 'id')?.value
            let title = Object.getOwnPropertyDescriptor(dbResult, 'title')?.value
            let content = Object.getOwnPropertyDescriptor(dbResult, 'content')?.value
            let isBook = Object.getOwnPropertyDescriptor(dbResult, 'isBook')?.value
            let isChapter = Object.getOwnPropertyDescriptor(dbResult, 'isChapter')?.value
            let isTab = Object.getOwnPropertyDescriptor(dbResult, 'isTab')?.value
            let isPage = Object.getOwnPropertyDescriptor(dbResult, 'isPage')?.value
            let isVisible = Object.getOwnPropertyDescriptor(dbResult, 'isVisible')?.value
            let priority = Object.getOwnPropertyDescriptor(dbResult, 'priority')?.value
            let level = Object.getOwnPropertyDescriptor(dbResult, 'level')?.value
            let cover = Object.getOwnPropertyDescriptor(dbResult, 'cover')?.value

            this.id = id ?? 0
            this.title = title ?? '无效节点'
            this.content = content ?? '[空]'
            this.isDatabase = Object.getOwnPropertyDescriptor(dbResult, 'isDatabase')?.value
            this.isShop = Object.getOwnPropertyDescriptor(dbResult, 'isShop')?.value
            this.isHome = Object.getOwnPropertyDescriptor(dbResult, 'isHome')?.value
            this.isBook = isBook
            this.isChapter = isChapter
            this.isTab = isTab
            this.isPage = isPage
            this.isVisible = isVisible == 1
            this.priority = priority
            this.level = level
            this.cover = cover
            this.parentId = Object.getOwnPropertyDescriptor(dbResult, 'parentId')?.value

            if (this.id == 0) this.isEmpty = true
        }
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
        if (this.isBook || this.isEmpty) return this

        return this.getParent().getBook()
    }

    getFirstTabInParents(): Node | undefined {
        return this.getParents().find((parent) => parent.getParent().isBook)
    }

    getContent(): string {
        let content = Ipc.sendSync('getContent', this.id)

        return content == '' ? '{空}' : content
    }

    getTabs(): Node[] {
        let tabs = Ipc.sendSync('getTabs', this.id)
        return tabs.map((tab: object) => {
            return new Node(tab)
        })
    }

    getParent(): Node {
        if (this.parentId == 0) {
            return new Node({})
        }

        // console.log('get parent from db,id is', this.id, 'parent id is',this.parentId)
        let result = Node.find(this.parentId)

        return new Node(result ?? {})
    }

    getParents(): Node[] {
        if (this.isEmpty) return []

        let parents: Node[] = []
        let parent = this.getParent()

        while (!parent.isEmpty) {
            parents.push(parent)
            parent = parent.getParent()
        }

        return parents.reverse()
    }

    getChildren(): Node[] {
        let children = Ipc.sendSync('getChildren', this.id)

        return children.map((child: object) => {
            return new Node(child)
        });
    }

    getVisibleChildren(): Node[] {
        let children = Ipc.sendSync('getVisibleChildren', this.id)

        return children.map((child: object) => {
            return new Node(child)
        });
    }

    getSiblings(): Node[] {
        return Ipc.sendSync('getSiblings', this.id).map((sibling: object) => {
            return new Node(sibling)
        })
    }

    getFirstChild(): Node {
        let result = Ipc.sendSync('getFirstChild', this.id)

        return new Node(result ?? {})
    }

    getLastChild(): Node {
        let result = Ipc.sendSync('getLastChild', this.id)

        // console.log('get last child', result)
        return result ? new Node(result) : emptyNode
    }

    getFirstPage(): Node {
        // console.log('get first page,current is', this)
        if (this.isPage || this.isEmpty) return this

        return this.getFirstChild().getFirstPage()
    }

    getLastPage(): Node {
        // console.log('get last page,current is', this)
        if (this.isPage || this.isEmpty) return this

        return this.getLastChild().getLastPage()
    }

    getPrevious(): Node {
        // 如果当前节点是父节点的第一个节点，返回父节点的上一个节点
        if (this.id == this.getParent().getFirstChild().id) {
            return this.getParent().getPrevious()
        }

        let next = db.prepare(`
            select * from nodes 
            where parent_id=? and id!=? and priority<=?
            order by priority desc limit 1
        `).get(this.parentId, this.id, this.priority)

        return new Node(next)
    }

    getPreviousPage(): Node {
        return this.getPrevious().getLastPage()
    }

    getNext(): Node {
        // 如果当前节点是父节点的最后一个节点，返回父节点的下一个节点
        if (this.id == this.getParent().getLastChild().id) {
            return this.getParent().getNext()
        }

        let next = db.prepare(`
            select * from nodes 
            where parent_id=? and id!=? and priority>=?
            order by priority asc limit 1
        `).get(this.parentId, this.id, this.priority)

        return new Node(next)
    }

    getNextPage(): Node {
        return this.getNext().getFirstPage()
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

    transformToTab(): string {
        this.createChildPage(this.title + '子标签', this.content)
        db.prepare('update nodes set is_chapter=1,is_tab=1,is_page=0 where id=?').run(this.id)
        return '已转换成标签'
    }

    static find(id: number | String): Node {
        let node = Ipc.sendSync('find', id)

        return new Node(node)
    }

    static getBooks(): Node[] {
        let items = Ipc.sendSync('getBooks')

        return items.map((item: object) => {
            return new Node(item)
        });
    }

    static getVisibleBooks(): Node[] {
        return Node.getBooks().map((item: object) => {
            return new Node(item)
        }).filter(node => node.isVisible);
    }

    static search(keyword: string): Node[] {
        let nodes = Ipc.sendSync('search', keyword)
        return nodes.map((node: object) => {
            return new Node(node)
        })
    }

}

const DatabaseNode = new Node(
    {
        id: 0,
        title: '知识库',
        isBook: false,
        isDatabase: true,
        isChapter: false,
        isTab: false,
        isPage: false,
        isLesson: true,
        isManual: false,
        isVisible: true,
        priority: 0,
        parentId: 0,
        level: 0,
        isEmpty: false,
        cover: '',
        content: '',
    }
)

const ShopNode = new Node(
    {
        id: 0,
        title: '商店',
        isBook: false,
        isDatabase: false,
        isChapter: false,
        isShop: true,
        isTab: false,
        isPage: false,
        isLesson: true,
        isManual: false,
        isVisible: true,
        priority: 0,
        parentId: 0,
        level: 0,
        isEmpty: false,
        cover: '',
        content: '',
    }
)

const HomeNode = new Node(
    {
        id: 0,
        title: '首页',
        isBook: false,
        isDatabase: false,
        isChapter: false,
        isHome: true,
        isTab: false,
        isPage: false,
        isLesson: true,
        isManual: false,
        isVisible: true,
        priority: 0,
        parentId: 0,
        level: 0,
        isEmpty: false,
        cover: '',
        content: '',
    }
)

export {
    Node,
    ShopNode,
    HomeNode,
    DatabaseNode
};