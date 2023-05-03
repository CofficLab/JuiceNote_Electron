import { existsSync, readFileSync, writeFile } from "fs";
import { join } from "path";
import Config from "../config";
import log from 'electron-log'

class NodeDB {
    private db: any

    constructor(db: any) {
        this.db = db
    }

    find(id: number): Node {
        if (id <= 0) return EmptyNode

        let result = this.db.prepare('select * from nodes where id=?').get(id)

        log.debug('查找节点', id)
        return new Node(result)
    }

    getFirstBook(): Node {
        let result = this.db.prepare('select * from nodes where is_book=1 order by priority asc limit 1').get()

        log.info('get first book', result)
        return new Node(result)
    }

    getBooks(): Node[] {
        let items = this.db.prepare('select * from nodes where is_book=1 order by priority asc').all()

        return items.map((item: object) => {
            return new Node(item)
        });
    }

    getVisibleBooks(): Node[] {
        let items = this.db.prepare('select * from nodes where is_book=1 and is_visible=1 order by priority asc').all()

        return items.map((item: object) => {
            return new Node(item)
        });
    }

    getChildren(id: number): Node[] {
        let children = this.db.prepare('select * from nodes where parent_id=? order by priority asc').all(id)

        return children.map((child: object) => {
            return new Node(child)
        });
    }

    search(keyword: string): Node[] {
        console.log('搜索', keyword)
        let nodes = this.db.prepare("select * from nodes where title like ? limit 5").all(`%${keyword}%`)
        return nodes.map((node: object) => {
            return new Node(node)
        })
    }

    delete(id: number): string {
        let result = this.db.prepare('delete from nodes where id=?').run(id)
        return "已删除「" + id + "」"
    }

    updatePriority(id: number, priority: number) {
        log.info(id, '更新priority为', priority)
        this.db.prepare('update nodes set priority=? where id=?').run(priority, id)
    }

    updateContent(id: number, content: string): string {
        let result = this.db.prepare('update nodes set content=? where id=?').run(content, id)
        writeFile(join(Config.DATABASE_PATH, 'html', id + '.html'), content, (err) => {
            log.info('已同步到磁盘', err)
        })

        if (result != null) {
            return '「' + id + '」的内容更新成功'
        } else {
            return '「' + id + '」的内容更新失败'
        }
    }

    updateCover(id: number, base64Code: string): string {
        let result = this.db.prepare('update nodes set cover=? where id=?').run(base64Code, id)
        if (result != null) {
            return id + '的封面更新成功'
        } else {
            return id + '的封面更新失败'
        }
    }

    updateTitle(id: number, title: string): string {
        let result = this.db.prepare('update nodes set title=? where id=?').run(title, id)
        if (result != null) {
            return '「' + id + '」的标题更新成功'
        } else {
            return '「' + id + '」的标题更新失败'
        }
    }

    updateVisible(id: number, visible: boolean): string {
        let result = this.db.prepare('update nodes set is_visible=? where id=?').run(visible, id)
        if (result != null) {
            return '「' + id + '」已更新可见性'
        } else {
            return '「' + id + '」的可见性更新失败'
        }
    }

    // transformToTab(): string {
    //     this.createChildPage(this.title + '子标签', this.content)
    //     db.prepare('update nodes set is_chapter=1,is_tab=1,is_page=0 where id=?').run(this.id)
    //     return '已转换成标签'
    // }
}

class Node {
    public id: number = 0
    public title: string = ''
    public isBook: boolean = false
    public isChapter: boolean = false
    public isTab: boolean = false
    public isPage: boolean = false
    public isLesson: boolean = true
    public isManual: boolean = false
    public isVisible: boolean = false
    public priority: number = 0
    public parentId: number = 0
    public level: number = 0
    public isEmpty: boolean = false
    public cover: string = ''
    public content: string = ''

    public constructor(dbResult: object) {
        this.id = Object.getOwnPropertyDescriptor(dbResult, 'id')?.value
        this.title = Object.getOwnPropertyDescriptor(dbResult, 'title')?.value
        this.content = Object.getOwnPropertyDescriptor(dbResult, 'content')?.value
        this.isBook = Object.getOwnPropertyDescriptor(dbResult, 'is_book')?.value
        this.isChapter = Object.getOwnPropertyDescriptor(dbResult, 'is_chapter')?.value
        this.isTab = Object.getOwnPropertyDescriptor(dbResult, 'is_tab')?.value
        this.isPage = Object.getOwnPropertyDescriptor(dbResult, 'is_page')?.value
        this.isVisible = Object.getOwnPropertyDescriptor(dbResult, 'is_visible')?.value
        this.priority = Object.getOwnPropertyDescriptor(dbResult, 'priority')?.value
        this.level = Object.getOwnPropertyDescriptor(dbResult, 'level')?.value
        this.cover = Object.getOwnPropertyDescriptor(dbResult, 'cover')?.value
        this.parentId = Object.getOwnPropertyDescriptor(dbResult, 'parent_id')?.value
    }

    getContent(): string {
        let file = join(Config.DATABASE_PATH, this.id + '.html')
        let content = ''
        if (existsSync(file)) {
            content = readFileSync(file).toString()
        } else {
            content = this.content
        }

        return content == '' ? '{空}' : content
    }

}

const EmptyNode = new Node({})

export {
    Node,
    EmptyNode,
    NodeDB
};