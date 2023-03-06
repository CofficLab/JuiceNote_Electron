const db = require('better-sqlite3')('database.db');

class Book {
    public id: number = 0
    public title: string = ''

    static create(title: string) {
        console.log('创建图书', title)
        db.prepare('insert into books (title) values (?)').run(title)
    }

    static createIfNotExists(title: string) {
        let book = Book.findByTitle(title)
        if (!book) {
            Book.create(title)
        }
    }

    static findByTitle(title: string) {
        return db.prepare('select * from books where title=?').get(title)
    }

    static sync(title: string) {
        console.log('同步图书', title)
        let nodeInDb = Book.findByTitle(title)
        if (nodeInDb == null || nodeInDb == undefined) {
            Book.create(title)
        }
    }
}

export default Book;