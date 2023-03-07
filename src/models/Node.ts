const db = require('better-sqlite3')('database.db');

class Node {
    public id: number = 0
    public title: string = ''
    public content: string = ''
    public isBook: boolean = false
    public isChapter: boolean = false
    public isTab: boolean = false
    public isPage: boolean = false
    public isLesson: boolean = true
    public isManual: boolean = false
    public priority: number = 0
    public parentId: number = 0
    public level: number = 0
    public isEmpty: boolean = false

    public constructor(dbResult: object) {
        let id = Object.getOwnPropertyDescriptor(dbResult, 'id')?.value
        let title = Object.getOwnPropertyDescriptor(dbResult, 'title')?.value
        let content = Object.getOwnPropertyDescriptor(dbResult, 'content')?.value
        let isBook = Object.getOwnPropertyDescriptor(dbResult, 'is_book')?.value
        let isChapter = Object.getOwnPropertyDescriptor(dbResult, 'is_chapter')?.value
        let isTab = Object.getOwnPropertyDescriptor(dbResult, 'is_tab')?.value
        let isPage = Object.getOwnPropertyDescriptor(dbResult, 'is_page')?.value
        let priority = Object.getOwnPropertyDescriptor(dbResult, 'priority')?.value
        let level = Object.getOwnPropertyDescriptor(dbResult, 'level')?.value

        this.id = id ?? 0
        this.title = title ?? '无效节点'
        this.content = content ?? '无效节点'
        this.isBook = isBook
        this.isChapter = isChapter
        this.isTab = isTab
        this.isPage = isPage
        this.priority = priority
        this.level = level
        this.parentId = Object.getOwnPropertyDescriptor(dbResult, 'parent_id')?.value

        if (this.id == 0) this.isEmpty = true
    }

    getBook(): Node {
        console.log('get book,current is', this)
        if (this.isBook || this.isEmpty) return this

        return this.getParent().getBook()
    }

    getParent(): Node {
        console.log('get parent,parent id is', this.parentId)
        let result = db.prepare('select * from nodes where id=? limit 1').get(this.parentId)

        return new Node(result ?? {})
    }

    getChildren(): Node[] {
        let children = db.prepare('select * from nodes where parent_id=?').all(this.id)

        return children.map((child: object) => {
            return new Node(child)
        });
    }

    getFirstChild(): Node {
        let result = db.prepare('select * from nodes where parent_id=? order by priority asc').get(this.id)

        console.log('get first child', result)
        return new Node(result ?? {})
    }

    getFirstPage(): Node {
        console.log('get first page,current is', this)
        if (this.isPage || this.isEmpty) return this

        return this.getFirstChild().getFirstPage()
    }

    static find(id: number): Node {
        let result = db.prepare('select * from nodes where id=?').get(id)

        return new Node(result)
    }

    static getFirstBook(): Node {
        let result = db.prepare('select * from nodes where is_book=1 order by priority asc limit 1').get()

        console.log('get first book', result)
        return new Node(result)
    }
}

export default Node;