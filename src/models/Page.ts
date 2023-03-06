import BookNode from "../entities/BookNode";
import Id from "../entities/Id";

const db = require('better-sqlite3')('database.db');

class Page {
    public path: string = ''
    public name: string = ''
    public id: string = ''
    public content: string = ''
    public level: number = 0
    public errorTitle: string = ''
    public errorLines: string[] = []

    public constructor(absolutePath?: string) {
        if (absolutePath != undefined) {
            console.log('初始化图书节点', absolutePath)

            this.id = Id.pathToId(this.path)
            let node = Page.findByNodeId(this.id)

            if (!node) {
                this.errorTitle = '文件或目录不存在'
                this.errorLines.push(absolutePath)
            }

            this.path = absolutePath
            this.name = node.title
            this.level = node.level
            this.content = node.content
        } else {
            this.errorTitle = '当前节点为空节点'
        }
    }

    static create(id: string, name: string, content: string) {
        console.log('创建图书', id)
        let result = db.prepare('insert into nodes (node_id,title,content) values (?,?,?)').run(
            id, name, content
        )

        console.log(result)
    }

    static createIfNotExists(id: string, title: string, content: string) {
        let bookNode = Page.findByNodeId(id)
        if (!bookNode) {
            Page.create(id, title, content)
        }
    }

    static findByNodeId(nodeId: string) {
        let bookNode = db.prepare('select * from nodes where node_id=?').get(nodeId)

        return bookNode
    }

    static sync(bookNode: BookNode) {
        console.log('同步节点', bookNode.id)
        let nodeInDb = Page.findByNodeId(bookNode.id)
        if (nodeInDb == null || nodeInDb == undefined) {
            Page.create(bookNode.id, bookNode.name, bookNode.isPage() ? bookNode.getSourceCode() : '')
        }

        nodeInDb = Page.findByNodeId(bookNode.id)
        db.prepare(`update nodes set 
            content=?,
            is_page=?,
            is_tab=?,
            title=?,
            level=?
            where node_id=?
        `).run(
            bookNode.isPage() ? bookNode.getSourceCode() : '',
            bookNode.isPage() ? 1 : 0,
            bookNode.isTab() ? 1 : 0,
            bookNode.name,
            bookNode.level,
            bookNode.id)
    }

    static updateContent(id: string, content: string) {
        let result = db.prepare(`update nodes set 
            content=?
            where node_id=?
        `).run(content, id)

        console.log('保存的结果', result)
    }

    static updateTitle(id: string, title: string) {
        let result = db.prepare(`update nodes set title=? where node_id=?`).run(title, id)

        console.log('保存的结果', result)
    }

    isEmpty() {
        return false
    }

    getSourceCode() {
        return this.content
    }
}

export default Page;