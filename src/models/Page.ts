import Book from "./Book";

const db = require('better-sqlite3')('database.db');

class Page {
    public id: number = 0
    public title: string = ''
    public content: string = ''
    public bookId: number = 0

    public constructor(id: number, title: string, content: string, bookId: number) {
        this.id = id
        this.title = title
        this.content = content
        this.bookId = bookId
    }

    public isEmpty(): boolean {
        return this.title == ''
    }

    public getBook(): Book {
        return Book.find(this.bookId)
    }

    static create(title: string, content: string, bookId: number): Page {
        console.log('创建页面', title)
        let result = db.prepare('insert into pages (title,content,book_id) values (?,?,?)').run(
            title, content, bookId
        )

        return new Page(result.id, result.title, result.content, result.bookId)
    }

    static firstPageOfChapter(chapterId: number): Page {
        let page = db.prepare('select * from pages where chapter_id=? order by priority asc').get(chapterId)

        return new Page(page.id, page.title, page.content, page.bookId)
    }
}

export default Page;