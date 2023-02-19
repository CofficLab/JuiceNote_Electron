import { reactive } from 'vue'
import BookNode from '../entities/BookNode'
import Variables from '../entities/Variables'

const BookController = reactive({
    getRoot(): BookNode {
        return new BookNode(Variables.markdownRootPath)
    },
    search(name: string): BookNode[] {
        return this.getRoot().search(name)
    }
})

export default BookController