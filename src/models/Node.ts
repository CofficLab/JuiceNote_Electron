const db = require('better-sqlite3')('database.db');

class Node {
    public id: number = 0
    public title: string = ''
    public content: string = ''
    public isBook: boolean = false
    public isChapter: boolean = false
    public isPage: boolean = false
    public priority: number = 0

    public constructor(id: number, title: string, content, isBook, isChapter, isPage, priority) {
        this.id = id
        this.title = title
        this.content = content
        this.isBook = isBook
        this.isChapter = isChapter
        this.isPage = isPage
        this.priority = priority
    }
}

export default Node;