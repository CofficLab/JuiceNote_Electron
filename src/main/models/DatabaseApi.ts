import { join } from "path";
import log from "../log/logger";
import Logger from "electron-log";
import databaseLogger from "../log/databaseLogger";
import Config from "./Config";
import { existsSync } from "fs";

interface NodeObject {
    id: number,
    title: string,
    parentId: number,
    priority: number,
    slug?: string,
    children?: NodeObject[],
    content?:string,
    isPage: boolean,
    isChapter: boolean,
    isVisible: boolean,
    isEmpty?: boolean,
    isRoot?: boolean
}

const EmptyNode: NodeObject = {
    id: 0,
    title: '空节点',
    parentId: 0,
    priority: 0,
    isPage: false,
    isChapter: false,
    isVisible: true,
    isEmpty: true
}

class DatabaseApi {
    protected dbFilePath: string | undefined = join(Config.DATABASE_PATH, 'xxxx.db')
    protected connection!: any;

    constructor(dbFilePath?: string) {
        databaseLogger.info('数据库 API 初始化', dbFilePath)
        if (dbFilePath && !existsSync(dbFilePath)) {
            throw new Error('数据库文件不存在：'+ dbFilePath)
        }

        this.dbFilePath = dbFilePath
        this.connection = require('better-sqlite3')(dbFilePath)
    }

    create(node: NodeObject): number {
        databaseLogger.info('创建节点', node)
        if (node.parentId == null) node.parentId = 0
        let result = this.connection.prepare('insert into nodes (title, parent_id, priority, is_page) values (?, ?, ?, ?)').run(
            node.title,
            node.parentId,
            node.priority,
            node.isPage ? 1 : 0)

        return result.lastInsertRowid
    }

    delete(id: number): string {
        this.connection.prepare('delete from nodes where id=?').run(id)

        let children = this.getChildren(id)
        for (let child of children) {
            this.delete(child.id)
        }
        
        return "已删除「" + id + "」"
    }

    find(id: number): NodeObject {
        databaseLogger.info(`查找节点 id=${id}`)

        if (id == undefined) {
            log.error('被查找的节点不能为undefined')
            return EmptyNode
        }

        if (id <= 0) return EmptyNode

        let result = this.connection.prepare('select * from nodes where id=?').get(id)

        return result
    }

    getRoot(recursive = false): Object {
        databaseLogger.info(`查找根节点`)

        let result = this.connection.prepare('select * from nodes where parent_id=0 order by priority asc limit 1').get()

        if (recursive) result.children = this.getChildren(result.id)

        return result
    }

    getChildren(id: number): NodeObject[] {
        let children = this.connection.prepare('select * from nodes where parent_id=? order by priority asc').all(id)

        databaseLogger.info(`get children of ${id},count=${children.length}`)

        return children
    }

    getDescendants(id: number): NodeObject[] {
        return this.getChildren(id).map(item => {
            item.children = this.getDescendants(item.id)
            return item
        })
    }

    getBooks(): Object[] {
        let items = this.connection.prepare('select * from nodes where is_book=1 order by priority asc').all()

        return items
    }

    getFirstBook(): Object {
        let result = this.connection.prepare('select * from nodes where is_book=1 order by priority asc limit 1').get()

        log.debug('get first book', result)
        return result
    }

    getFirstPage(id: number): NodeObject {
        databaseLogger.info(`查询 ${id} 的第一个子节点`)
        let current = this.find(id)
        if (current!.isPage || current!.isEmpty) return current!

        let firstChild = this.getFirstChild(id)

        Logger.info(`${current!.title} 第一个子节点是 [${firstChild!.id}]${firstChild!.title}`)

        if (firstChild) {
            return this.getFirstPage(firstChild.id)
        }

        return EmptyNode
    }

    getFirstChild(id: number): NodeObject {
        let child = this.connection.prepare('select * from nodes where parent_id=? order by priority asc limit 1').get(id)

        log.info(`get first child of ${id},result is`, child)

        return child
    }

    getVisibleBooks(): Object[] {
        let items = this.connection.prepare('select * from nodes where is_book=1 and is_visible=1 order by priority asc').all()

        return items
    }

    search(keyword: string): Object[] {
        log.info('搜索', keyword)
        let nodes = this.connection.prepare("select * from nodes where title like ? limit 5").all(`%${keyword}%`)
        return nodes
    }

    save(node: NodeObject): string {
        databaseLogger.info('保存节点', node)

        let result = this.connection.prepare(`update nodes set 
        title=?,
        parent_id=?,
        priority=?,
        is_page=?,
        is_chapter=?,
        is_visible=?
        where id=?`).run(
            node.title,
            node.parentId,
            node.priority,
            node.isPage ? 1 : 0,
            node.isChapter ? 1 : 0,
            node.isVisible ? 1 : 0,
            node.id)

        databaseLogger.info('保存节点的结果', result)

        return result.changes
    }

    updateTitle(id: number, title: string): string {
        let result = this.connection.prepare('update nodes set title=? where id=?').run(title, id)
        if (result != null) {
            return '「' + id + '」的标题更新成功'
        } else {
            return '「' + id + '」的标题更新失败'
        }
    }

    updatePriority(id: number, priority: number) {
        log.info(id, '更新priority为', priority)
        this.connection.prepare('update nodes set priority=? where id=?').run(priority, id)
    }

    updateContent(id: number, content: string): string {
        let result = this.connection.prepare('update nodes set content=? where id=?').run(content, id)

        if (result != null) {
            return '「' + id + '」的内容更新成功'
        } else {
            return '「' + id + '」的内容更新失败'
        }
    }

    updateCover(id: number, base64Code: string): string {
        let result = this.connection.prepare('update nodes set cover=? where id=?').run(base64Code, id)
        if (result != null) {
            return id + '的封面更新成功'
        } else {
            return id + '的封面更新失败'
        }
    }

    updateVisible(id: number, visible: boolean): string {
        let value = visible == true ? 1 : 0

        Logger.info(`更新「${id}」的可见性为 ${visible} ${value}`)
        let result = this.connection.prepare('update nodes set is_visible=? where id=?').run(value, id)
        if (result != null) {
            return '「' + id + '」已更新可见性'
        } else {
            return '「' + id + '」的可见性更新失败'
        }
    }
}

export {
    DatabaseApi,
    NodeObject
}