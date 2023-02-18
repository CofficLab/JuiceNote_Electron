import fs from "fs"
import path from "path"
import Id from "./Id";
import Book from "./Book";
import Variables from "./Variables";
import Page from "./Page";

class Chapter {
    public name: string
    public dir: string
    public id: string

    public constructor(dir: string) {
        this.name = path.basename(dir)
        this.dir = dir
        this.id = Id.pathToId(this.dir)

        if (fs.statSync(dir).isFile()) {
            throw '不能初始化为章节：' + this.dir
        }

        if (this.dir == '/') {
            throw '不能将系统根目录初始化为章节'
        }
    }

    public isChapter(): boolean {
        return true
    }

    public isPage(): boolean {
        return false
    }

    public getParentChapter(): Chapter | null {
        console.log('get parent chapter of ', this.dir)
        let dir = path.dirname(this.dir)

        if (path.dirname(dir) == Variables.markdownRootPath) {
            return null
        }

        return new Chapter(dir)
    }

    public getBook(): Book {
        console.log('get book of', this.dir)
        let dir = path.dirname(this.dir)
        let parentChapter = this.getParentChapter()

        if (parentChapter == null) {
            return new Book(dir)
        }

        return parentChapter.getBook()
    }

    public getChapters(): Chapter[] {
        let chapters: Chapter[] = []
        fs.readdirSync(this.dir).forEach(element => {
            if (fs.statSync(path.join(this.dir, element)).isDirectory()) {
                if (!Variables.nodeExcepts.includes(element)) chapters.push(new Chapter(path.join(this.dir, element)))
            }
        })

        return chapters
    }

    public getPages(): Page[] {
        let pages: Page[] = []
        fs.readdirSync(this.dir).forEach(element => {
            if (fs.statSync(path.join(this.dir, element)).isFile()) {
                if (!Variables.nodeExcepts.includes(element)) pages.push(new Page(path.join(this.dir, element)))
            }
        })

        return pages
    }
}

export default Chapter