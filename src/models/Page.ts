import fs from "fs"
import path from "path"
import Markdown from "./Markdown";
import Id from "./Id";
import FileTree from "../tools/FileTree";
import Chapter from "./Chapter";
import Book from "./Book";

class Page {
    public name: string
    public file: string
    public id: string

    public constructor(file: string) {
        console.log('初始化为页面', file)
        if (!fs.existsSync(file)) {
            throw '文件不存在' + file
        }

        if (fs.statSync(file).isDirectory()) {
            throw '不能将目录初始化为页面' + file
        }

        this.file = file
        this.name = path.basename(file)
        this.id = Id.pathToId(this.file)
    }

    public prev(): Page | null {
        console.log('获取上一个页面')

        let prevNode = (new FileTree(this.file)).prev()
        if (prevNode == null) {
            return null
        }

        return new Page(prevNode.path)
    }

    public next(): Page | null {
        console.log('获取下一个页面')

        let nextNode = (new FileTree(this.file)).next()
        if (nextNode == null) {
            return null
        }

        return new Page(nextNode.path)
    }

    public isChapter(): boolean {
        return false
    }

    public isPage(): boolean {
        return true
    }

    public getContent(): string {
        return (new Markdown(this.file)).content()
    }

    public getChapter(): Chapter {
        let dir = path.dirname(this.file)

        return new Chapter(dir)
    }

    public getChapters(): Chapter[] {
        return []
    }

    public getBook(): Book {
        console.log('get book of', this.file)
        return this.getChapter().getBook();
    }

    public content(): string {
        return (new Markdown(this.file)).content()
    }

    // 获取markdown渲染后的HTML
    public html() {
        return (new Markdown(this.file)).html()
    }

    // 获取markdown渲染后的HTML，带TOC
    public htmlWithToc() {
        return (new Markdown(this.file)).htmlWithToc()
    }

    public toc(): string {
        return (new Markdown(this.file)).toc()
    }
}

export default Page