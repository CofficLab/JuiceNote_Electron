import BookNode from "src/entities/BookNode";

const db = require('better-sqlite3')('database.db');

class BookNodeModel {
    static create(name: string, content: string) {
        console.log('创建图书', name)
        let result = db.prepare('insert into nodes (title,content) values (?,?)').run(name, content)

        console.log(result)
    }

    static createIfNotExists(title: string, content: string) {
        let bookNode = BookNodeModel.findByTitle(title)
        if (!bookNode) {
            BookNodeModel.create(title, content)
        }
    }

    static findByTitle(title: string) {
        let bookNode = db.prepare('select * from nodes where title=?').get(title)

        return bookNode
    }

    static sync(bookNode: BookNode) {
        let nodeInDb = BookNodeModel.findByTitle(bookNode.name)
        if (nodeInDb == null || nodeInDb == undefined) {
            BookNodeModel.create(bookNode.name, bookNode.getSourceCode())
        }

        nodeInDb = BookNodeModel.findByTitle(bookNode.name)
        db.prepare(`update nodes set 
            content=?,
            is_page=?,
            is_tab=?,
            level=?
            where title=?
        `).run(
            bookNode.isPage() ? bookNode.getSourceCode() : '',
            bookNode.isPage() ? 1 : 0,
            bookNode.isTab() ? 1 : 0,
            bookNode.level,
            bookNode.name)
    }
}

export default BookNodeModel;