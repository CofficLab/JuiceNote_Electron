import fs from "fs"
import path from "path"
import Id from "./Id";
import Chapter from "./Chapter";
import Variables from "./Variables";

class Book {
    public name: string
    public dir: string
    public id: string

    public constructor(dir: string) {
        this.name = path.basename(dir)
        this.dir = dir
        this.id = Id.pathToId(this.dir)
    }

    public getChapters(): Chapter[] {
        return fs.readdirSync(this.dir).filter(element => {
            return !Variables.nodeExcepts.includes(element)
        }).map(child => {
            return new Chapter(path.join(this.dir, child))
        })
    }

    public siblings() {
        let parentDir = path.dirname(this.dir)
        let siblings: Book[] = []

        fs.readdirSync(parentDir).filter(element => {
            let dir = path.join(parentDir, element)
            if (dir != this.dir) {
                siblings.push(new Book(dir))
            }
        })

        return siblings
    }
}

export default Book