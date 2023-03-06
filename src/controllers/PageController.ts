import { reactive } from 'vue'
import Page from '../models/Page'
import Book from '../models/Book'

const PageController = reactive({
    getCurrentPage(): Page {
        console.log('get current page')
        console.log('refresh current page')
        let book = Book.first()
        console.log('当前图书是', book)

        return book.firstPage()
    },
})

export default PageController