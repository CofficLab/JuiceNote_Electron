import Chapter from "./Chapter";
import Page from "./Page";

const db = require('better-sqlite3')('database.db');

class Book {
    public id: number = 0
    public title: string = ''

    public constructor(id: number, title: string) {
        this.id = id
        this.title = title
    }

    public firstChapter(): Chapter {
        return Chapter.firstChapterOfBook(this.id)
    }

    public firstPage(): Page {
        return this.firstChapter().firstPage()
    }

    public getChapters(): Chapter[] {
        return Chapter.chaptersOfBook(this.id)
    }

    static find(id: number): Book {
        let book = db.prepare('select * from books where id=?').run(id)

        return new Book(book.id, book.title)
    }

    static create(title: string) {
        console.log('创建图书', title)
        db.prepare('insert into books (title) values (?)').run(title)
    }

    static first(): Book {
        let result = db.prepare('select * from books order by priority asc limit 1').get()

        console.log(result)
        return new Book(result.id, result.title)
    }
}

export default Book;