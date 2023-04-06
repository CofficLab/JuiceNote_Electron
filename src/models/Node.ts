import { execSync } from "child_process";
import { existsSync, readFileSync, writeFile } from "fs";
import { join } from "path";
import Config from "../entities/Config";

const db = require('better-sqlite3')(join(Config.databasePath, 'database.db'));

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
    private content: string = ''

    public constructor(dbResult: object | null) {
        if (dbResult == null) {
            this.isEmpty = true
        } else {
            let id = Object.getOwnPropertyDescriptor(dbResult, 'id')?.value
            let title = Object.getOwnPropertyDescriptor(dbResult, 'title')?.value
            let content = Object.getOwnPropertyDescriptor(dbResult, 'content')?.value
            let isBook = Object.getOwnPropertyDescriptor(dbResult, 'is_book')?.value
            let isChapter = Object.getOwnPropertyDescriptor(dbResult, 'is_chapter')?.value
            let isTab = Object.getOwnPropertyDescriptor(dbResult, 'is_tab')?.value
            let isPage = Object.getOwnPropertyDescriptor(dbResult, 'is_page')?.value
            let isVisible = Object.getOwnPropertyDescriptor(dbResult, 'is_visible')?.value
            let priority = Object.getOwnPropertyDescriptor(dbResult, 'priority')?.value
            let level = Object.getOwnPropertyDescriptor(dbResult, 'level')?.value
            let cover = Object.getOwnPropertyDescriptor(dbResult, 'cover')?.value

            this.id = id ?? 0
            this.title = title ?? '无效节点'
            this.content = content ?? '[空]'
            this.isBook = isBook
            this.isChapter = isChapter
            this.isTab = isTab
            this.isPage = isPage
            this.isVisible = isVisible == 1
            this.priority = priority
            this.level = level
            this.cover = cover
            this.parentId = Object.getOwnPropertyDescriptor(dbResult, 'parent_id')?.value

            if (this.id == 0) this.isEmpty = true
        }
    }

    checkIsHomePage(): boolean {
        return this.id == Node.getFirstBook().getFirstPage().id
    }

    createChildPage(title: string, content: string): Number {
        let result = db.prepare('insert into nodes (parent_id,title,content,is_page) values (?,?,?,1)').run(this.id, title, content)

        return result.lastInsertRowid
    }

    createChildChapter(title: string): Number {
        let result = db.prepare('insert into nodes (parent_id,title,is_page,is_chapter) values (?,?,0,1)').run(this.id, title)
        return result.lastInsertRowid
    }

    getBook(): Node {
        // console.log('get book,current is', this)
        if (this.isBook || this.isEmpty) return this

        return this.getParent().getBook()
    }

    getContent(): string {
        let file = join(Config.databasePath, this.id + '.html')
        let content = ''
        if (existsSync(file)) {
            content = readFileSync(file).toString()
        } else {
            content = this.content
        }

        return content == '' ? '{空}' : content
    }

    getTabs(): Node[] {
        let tabs = db.prepare('select * from nodes where parent_id=? and is_tab=1').all(this.id)
        return tabs.map((tab: object) => {
            return new Node(tab)
        })
    }

    getParent(): Node {
        if (this.parentId == 0) {
            return new Node({})
        }

        // console.log('get parent from db,id is', this.id)
        let result = db.prepare('select * from nodes where id=? limit 1').get(this.parentId)

        return new Node(result ?? {})
    }

    getParents(): Node[] {
        if (this.isEmpty) return []

        let parents: Node[] = []
        let parent = this.getParent()

        while (!parent.isEmpty) {
            parents.push(parent)
            parent = parent.getParent()
        }

        return parents.reverse()
    }

    getChildren(): Node[] {
        let children = db.prepare('select * from nodes where parent_id=? order by priority asc').all(this.id)

        return children.map((child: object) => {
            return new Node(child)
        });
    }

    getVisibleChildren(): Node[] {
        let children = db.prepare('select * from nodes where parent_id=? and is_visible=1 order by priority asc').all(this.id)

        return children.map((child: object) => {
            return new Node(child)
        });
    }

    getSiblings(): Node[] {
        let siblings = db.prepare('select * from nodes where parent_id=? order by priority asc').all(this.parentId)
        return siblings.map((sibling: object) => {
            return new Node(sibling)
        })
    }

    getFirstChild(): Node {
        let result = db.prepare('select * from nodes where parent_id=? order by priority asc').get(this.id)

        // console.log('get first child', result)
        return new Node(result ?? {})
    }

    getLastChild(): Node {
        let result = db.prepare('select * from nodes where parent_id=? order by priority desc').get(this.id)

        // console.log('get last child', result)
        return result ? new Node(result) : emptyNode
    }

    getFirstPage(): Node {
        // console.log('get first page,current is', this)
        if (this.isPage || this.isEmpty) return this

        return this.getFirstChild().getFirstPage()
    }

    getLastPage(): Node {
        // console.log('get last page,current is', this)
        if (this.isPage || this.isEmpty) return this

        return this.getLastChild().getLastPage()
    }

    getPrevious(): Node {
        // 如果当前节点是父节点的第一个节点，返回父节点的上一个节点
        if (this.id == this.getParent().getFirstChild().id) {
            return this.getParent().getPrevious()
        }

        let next = db.prepare(`
            select * from nodes 
            where parent_id=? and id!=? and priority<=?
            order by priority desc limit 1
        `).get(this.parentId, this.id, this.priority)

        return new Node(next)
    }

    getPreviousPage(): Node {
        return this.getPrevious().getLastPage()
    }

    getNext(): Node {
        // 如果当前节点是父节点的最后一个节点，返回父节点的下一个节点
        if (this.id == this.getParent().getLastChild().id) {
            return this.getParent().getNext()
        }

        let next = db.prepare(`
            select * from nodes 
            where parent_id=? and id!=? and priority>=?
            order by priority asc limit 1
        `).get(this.parentId, this.id, this.priority)

        return new Node(next)
    }

    getNextPage(): Node {
        return this.getNext().getFirstPage()
    }

    getLogoUrl(): string {
        let relativePath = 'images/logo-' + this.title + '.png'
        let absolutePath = join(Config.publicPath, relativePath)
        return existsSync(absolutePath) ? relativePath : ''
    }

    setChildrenPriority(children: Node[]) {
        // console.log('设置子元素的排序', children)
        children.forEach((child, index) => {
            child.updatePriority(index)
        })
    }

    refresh(): Node {
        return Node.find(this.id)
    }

    updatePriority(priority: number) {
        // console.log(this.title, '更新priority为', priority)
        db.prepare('update nodes set priority=? where id=?').run(priority, this.id)
    }

    updateContent(content: string): string {
        // if (content == this.content) return '「' + this.title + '」的内容没有发生改变'

        let result = db.prepare('update nodes set content=? where id=?').run(content, this.id)
        writeFile(join(Config.databasePath, 'html', this.id + '.html'), content, (err) => {
            // console.log('已同步到磁盘', err)
        })

        if (result != null) {
            return '「' + this.title + '」的内容更新成功'
        } else {
            return '「' + this.title + '」的内容更新失败'
        }
    }

    updateCover(base64Code: string): string {
        let result = db.prepare('update nodes set cover=? where id=?').run(base64Code, this.id)
        if (result != null) {
            return this.id + '「' + this.title + '」的封面更新成功'
        } else {
            return this.id + '「' + this.title + '」的封面更新失败'
        }
    }

    updateTitle(title: string): string {
        let result = db.prepare('update nodes set title=? where id=?').run(title, this.id)
        if (result != null) {
            return '「' + this.title + '」的标题更新成功'
        } else {
            return '「' + this.title + '」的标题更新失败'
        }
    }

    updateVisible(): string {
        let result = db.prepare('update nodes set is_visible=abs(is_visible-1) where id=?').run(this.id)
        if (result != null) {
            return '「' + this.title + '」已' + (this.isVisible ? '隐藏' : '展示')
        } else {
            return '「' + this.title + '」的可见性更新失败'
        }
    }

    delete(): string {
        let result = db.prepare('delete from nodes where id=?').run(this.id)
        return "已删除「" + this.title + "」"
    }

    transformToTab(): string {
        this.createChildPage(this.title + '子标签', this.content)
        db.prepare('update nodes set is_chapter=1,is_tab=1,is_page=0 where id=?').run(this.id)
        return '已转换成标签'
    }

    static find(id: number): Node {
        if (id == 0) return Node.getFirstBook()
        let result = db.prepare('select * from nodes where id=?').get(id)

        // console.log('查找节点', id, '结果', result)
        return new Node(result)
    }

    static getFirstBook(): Node {
        let result = db.prepare('select * from nodes where is_book=1 order by priority asc limit 1').get()

        // console.log('get first book', result)
        return new Node(result)
    }

    static getBooks(): Node {
        let items = db.prepare('select * from nodes where is_book=1 order by priority asc').all()

        return items.map((item: object) => {
            return new Node(item)
        });
    }
}

const emptyNode = new Node({})

export {
    Node,
    emptyNode
};