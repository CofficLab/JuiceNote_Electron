import { join } from "path";
import Config from "../config";
import log from "../logger";
import { EmptyNode, TreeNode } from "./TreeNode";
import { writeFile } from "fs";

class DatabaseApi {
    protected dbFilePath: string | undefined = join(Config.DATABASE_PATH, 'xxxx.db')
    protected connection!: any;

    constructor(dbFilePath?: string) {
        this.dbFilePath = dbFilePath
        this.connection = require('better-sqlite3')(dbFilePath)
    }

    delete(id: number): string {
        let node = this.find(id)
        let result = this.connection.prepare('delete from nodes where id=?').run(id)
        return "已删除「" + node.title + "」"
    }

    find(id: number): TreeNode {
        log.debug(`在 ${this.dbFilePath} 中查找节点 id=${id}`)

        if (id == undefined) {
            log.error('被查找的节点不能为undefined')
            return EmptyNode
        }

        if (id <= 0) return EmptyNode

        let result = this.connection.prepare('select * from nodes where id=?').get(id)

        return new TreeNode(result)
    }

    getRoot(): TreeNode {
        log.debug('get root,connection is', this.connection)

        let result = this.connection.prepare('select * from nodes where parent_id=0 order by priority asc limit 1').get()

        log.debug('root', result.title)
        return new TreeNode(result)
    }

    getChildren(id: number): TreeNode[] {
        let children = this.connection.prepare('select * from nodes where parent_id=? order by priority asc').all(id)

        log.info(`get children of ${id},count=${children.length}`)

        return children.map((child: object) => {
            return new TreeNode(child)
        });
    }

    getBooks(): TreeNode[] {
        let items = this.connection.prepare('select * from nodes where is_book=1 order by priority asc').all()

        return items.map((item: object) => {
            return new TreeNode(item)
        });
    }

    getFirstBook(): TreeNode {
        let result = this.connection.prepare('select * from nodes where is_book=1 order by priority asc limit 1').get()

        log.debug('get first book', result)
        return new TreeNode(result)
    }

    getFirstPage(id: number): TreeNode {
        let current = this.find(id)
        if (current.isPage || current.isEmpty) return current

        return this.getFirstPage(this.getFirstChild(id).id)
    }

    getFirstChild(id: number): TreeNode {
        let child = this.connection.prepare('select * from nodes where parent_id=? order by priority asc limit 1').get(id)

        log.info(`get first child of ${id}`)

        return new TreeNode(child)
    }

    getVisibleBooks(): TreeNode[] {
        let items = this.connection.prepare('select * from nodes where is_book=1 and is_visible=1 order by priority asc').all()

        return items.map((item: object) => {
            return new TreeNode(item)
        });
    }

    search(keyword: string): TreeNode[] {
        log.info('搜索', keyword)
        let nodes = this.connection.prepare("select * from nodes where title like ? limit 5").all(`%${keyword}%`)
        return nodes.map((node: object) => {
            return new TreeNode(node)
        })
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
        let result = this.connection.prepare('update nodes set cover=? where id=?').run(base64Code, id)
        if (result != null) {
            return id + '的封面更新成功'
        } else {
            return id + '的封面更新失败'
        }
    }

    updateVisible(id: number, visible: boolean): string {
        let result = this.connection.prepare('update nodes set is_visible=? where id=?').run(visible, id)
        if (result != null) {
            return '「' + id + '」已更新可见性'
        } else {
            return '「' + id + '」的可见性更新失败'
        }
    }
}

export default DatabaseApi