import fs from 'fs'
import path from 'path'

// 将一个绝对路径变成一颗“树”
class FileTree {
    public id: string = ''
    public path: string = ''
    public children: FileTree[] = []

    public constructor(absolutePath: string) {
        this.path = absolutePath
        if (fs.statSync(this.path).isDirectory()) {
            this.children = fs.readdirSync(this.path).map((child) => {
                return new FileTree(path.join(this.path, child))
            })
        }
    }

    // 判断是否是空节点
    public isEmpty(): boolean {
        return this.id === ''
    }

    // 判断是否是叶子节点
    public isLeaf(): boolean {
        return fs.statSync(this.path).isFile()
    }

    // 判断是否是叶子节点
    public notLeaf(): boolean {
        return !this.isLeaf()
    }

    // 判断是否是空节点
    public notEmpty(): boolean {
        return !this.isEmpty()
    }

    // 当前节点的子节点中是否含有某个节点
    public has(target: FileTree): boolean {
        return this.children.some(child => {
            return child.id === target.id
        })
    }

    // 兄弟节点
    public siblings(): FileTree[] | null {
        return fs.readdirSync(path.dirname(this.path)).map((file => {
            return new FileTree(path.join(path.dirname(this.path), file))
        }))
    }

    // 获取第一个子节点
    public first(): FileTree | null {
        let first = this.children[0]

        return first ? first : null
    }

    // 第一个叶子节点
    public firstLeaf(): FileTree | null {
        let first = this.first()
        if (this.isLeaf()) return this
        if (first == null) return null

        return first.firstLeaf();
    }

    // 最后一个叶子节点
    public lastLeaf(): FileTree {
        return (this.isLeaf() || this.isEmpty()) ? this : this.last().lastLeaf();
    }

    // 获取最后一个子节点
    public last(): FileTree {
        return this.children[this.children.length - 1]
    }

    // 下一个兄弟节点
    public next(): FileTree | null {
        let siblings = this.siblings()
        if (siblings == null) return null

        for (let i = 0; i < siblings.length; i++) {
            if (i < siblings.length - 1 && siblings[i].path == this.path) {
                return siblings[i + 1]
            }
        }

        return null
    }

    // 计算出上一个兄弟节点
    public prev(): FileTree | null {
        let siblings = this.siblings()
        if (siblings == null) return null

        for (let i = 0; i < siblings.length; i++) {
            if (i >= 1 && siblings[i].path == this.path) {
                return siblings[i - 1]
            }
        }

        return null
    }

    // 当前节点的父节点
    public getParent(): FileTree | null {
        if (path.dirname(this.path) === '/') {
            return null
        }

        return new FileTree(path.dirname(this.path))
    }

    // 当前节点的祖先节点列表，直到until不继续往上找
    private getParents(until: string): FileTree[] {
        let result: FileTree[] = []
        let current = this.getParent()

        while (current != null) {
            if (current.path == until) {
                break;
            }
            result.push(current)
            current = current.getParent()
        }

        return result
    }

    // 当前节点的祖先列表（字符串数组形式），直到until不继续往上找
    public getParentsPaths(until: string): string[] {
        let parents = this.getParents(until)
        let result: string[] = []

        parents.forEach(parent => {
            result.push(parent.path)
        })

        return result
    }
}

export default FileTree