import fs from "fs"
import path from "path"
import Id from "./Id";
import Variables from "./Variables";
import RouteController from "../controllers/RouteController";
import Markdown from "./Markdown";
import FileTree from "../tools/FileTree";

class BookNode {
    public path: string = ''
    public name: string = ''
    public id: string = ''
    public errorTitle: string = ''
    public errorLines: string[] = []

    public constructor(absolutePath?: string) {
        if (absolutePath != undefined) {
            // console.log('初始化图书节点', absolutePath)

            if (!fs.existsSync(absolutePath)) {
                this.errorTitle = '文件或目录不存在'
                this.errorLines.push(absolutePath)
            }

            if (BookNode.shouldIgnore(absolutePath)) {
                this.errorTitle = '该节点应该被忽略'
                this.errorLines.push(absolutePath)
            }

            this.path = absolutePath
            this.name = path.basename(this.path)
            this.id = Id.pathToId(this.path)
        } else {
            this.errorTitle = '当前节点为空节点'
        }
    }

    public isEmpty(): boolean {
        return this.hasError()
    }

    public isPage(): boolean {
        return this.isEmpty() || fs.statSync(this.path).isFile()
    }

    public isChapter(): boolean {
        return !this.isPage() && !this.isBook()
    }

    public getChildren(): BookNode[] {
        if (this.isPage()) {
            console.warn('不能获取子节点，因为当前是一个页面', this.path)
            return []
        }

        return fs.readdirSync(this.path).filter(element => {
            return !BookNode.shouldIgnore(element)
        }).map(child => {
            return new BookNode(path.join(this.path, child))
        })
    }

    public isBook(): boolean {
        return path.dirname(this.path) == Variables.markdownRootPath
    }

    public siblings(): BookNode[] {
        // console.log('get siblings', this.id)
        let parentDir = path.dirname(this.path)
        let siblings: BookNode[] = []

        fs.readdirSync(parentDir).forEach(element => {
            let dir = path.join(parentDir, element)
            if (dir != this.path) {
                siblings.push(new BookNode(dir))
            }
        })

        return siblings
    }

    public getParent(): BookNode {
        if (this.isEmpty()) return Variables.emptyBookNode

        let dir = path.dirname(this.path)

        return new BookNode(dir)
    }

    public getParents(): BookNode[] {
        if (this.isEmpty()) return []

        let parents = (new FileTree(this.path)).getParentsPaths(Variables.markdownRootPath)

        return parents.map(parent => {
            return new BookNode(parent)
        }).reverse()
    }

    public getFirstChild(): BookNode {
        let children = this.getChildren()
        let first = children.at(0)

        return first == undefined ? new BookNode : first
    }

    public getBook(): BookNode {
        if (this.isEmpty()) return Variables.emptyBookNode

        let parent = this.getParent()

        if (parent.isBook()) return parent

        return parent.getBook()
    }

    public hasError(): boolean {
        return this.errorTitle.length > 0
    }

    public isActivated() {
        let currentPage = RouteController.getCurrentPage()
        let activatedBookNodes = currentPage.getParents()

        return activatedBookNodes.includes(this)
    }

    static shouldIgnore(absolutePath: string) {
        return Variables.nodeExcepts.includes(path.basename(absolutePath))
    }

    public content(): string {
        return this.hasError() ? Markdown.renderErrorPage(this.errorTitle, this.errorLines) : (new Markdown(this.path)).content()
    }

    // 获取markdown渲染后的HTML
    public html() {
        return this.hasError() ? Markdown.renderErrorPage(this.errorTitle, this.errorLines) : (new Markdown(this.path)).html()
    }

    // 获取markdown渲染后的HTML，带TOC
    public htmlWithToc() {
        return this.hasError() ? Markdown.renderErrorPage(this.errorTitle, this.errorLines) : (new Markdown(this.path)).htmlWithToc()
    }

    public toc(): string {
        return this.hasError() ? Markdown.renderErrorPage(this.errorTitle, this.errorLines) : (new Markdown(this.path)).toc()
    }

    public prev(): BookNode | null {
        if (this.isEmpty()) return Variables.emptyBookNode

        let prevNode = (new FileTree(this.path)).prev()
        if (prevNode == null) {
            return null
        }

        return new BookNode(prevNode.path)
    }

    public firstPage(): BookNode {
        if (this.isPage()) return this

        return this.getFirstChild().firstPage()
    }

    public next(): BookNode {
        if (this.isEmpty()) return Variables.emptyBookNode

        let nextNode = (new FileTree(this.path)).next()
        if (nextNode == null) {
            return Variables.emptyBookNode
        }

        return new BookNode(nextNode.path)
    }
}

export default BookNode