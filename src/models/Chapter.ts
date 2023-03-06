const db = require('better-sqlite3')('database.db');

class Chapter {
    public id: number = 0
    public title: string = ''

    static create(title: string) {
        console.log('创建章节', title)
        db.prepare('insert into chapters (title) values (?)').run(title)
    }

    static createIfNotExists(title: string) {
        let chapter = Chapter.findByTitle(title)
        if (!chapter) {
            Chapter.create(title)
        }
    }

    static findByTitle(title: string) {
        return db.prepare('select * from chapters where title=?').get(title)
    }

    static sync(title: string) {
        console.log('同步章节', title)
        let nodeInDb = Chapter.findByTitle(title)
        if (nodeInDb == null || nodeInDb == undefined) {
            Chapter.create(title)
        }
    }
}

export default Chapter;