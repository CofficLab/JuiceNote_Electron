const db = require('better-sqlite3')('database.db');

class Node {
    public id: number = 0
    public title: string = ''
    public content: string = ''
    public isBook: boolean = false
    public isChapter: boolean = false
    public isPage: boolean = false
    public priority: number = 0

    public constructor(dbResult: object) {
        this.id = Object.getOwnPropertyDescriptor(dbResult, 'id')?.value
        this.title = Object.getOwnPropertyDescriptor(dbResult, 'title')?.value
        this.content = Object.getOwnPropertyDescriptor(dbResult, 'content')?.value
        this.isBook = Object.getOwnPropertyDescriptor(dbResult, 'idBook')?.value
        this.isChapter = Object.getOwnPropertyDescriptor(dbResult, 'isChapter')?.value
        this.isPage = Object.getOwnPropertyDescriptor(dbResult, 'isPage')?.value
        this.priority = Object.getOwnPropertyDescriptor(dbResult, 'priority')?.value
    }

    getFirstChild(): Node {
        let result = db.prepare('select * from nodes where parent_id=? order by priority asc').get(this.id)

        return new Node(result)
    }

    getFirstPage(): Node {
        if (this.isPage) return this

        return this.getFirstChild().getFirstPage()
    }

    static find(id: number): Node {
        let result = db.prepare('select * from nodes where id=?').get(id)

        return new Node(result)
    }

    static getFirstBook(): Node {
        let result = db.prepare('select * from nodes where is_book=1 order by priority asc limit 1').get()

        return new Node(result)
    }
}

export default Node;