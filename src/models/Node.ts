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
}

export default Node;