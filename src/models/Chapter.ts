import Page from "./Page";

const db = require('better-sqlite3')('database.db');

class Chapter {
    public id: number = 0
    public title: string = ''

    public constructor(id: number, title: string) {
        this.id = id
        this.title = title
    }

    public firstPage(): Page {
        return Page.firstPageOfChapter(this.id)
    }

    static create(title: string, bookId: number) {
        console.log('创建章节', title)
        db.prepare('insert into chapters (title,book_id) values (?,?)').run(title, bookId)
    }

    static findByTitle(title: string) {
        return db.prepare('select * from chapters where title=?').get(title)
    }

    static firstChapterOfBook(bookId: number): Chapter {
        let chapter = db.prepare('select * from chapters where book_id=?').get(bookId)

        console.log(chapter)
        return new Chapter(chapter.id, chapter.title)
    }

    static chaptersOfBook(bookId: number): Chapter[] {
        let chapters = db.prepare('select * from chapters where book_id=?').all(bookId)

        return chapters.map((chapter: object) => {
            return new Chapter(chapter.id, chapter.title)
        })
    }
}

export default Chapter;