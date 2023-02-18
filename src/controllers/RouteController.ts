import { reactive } from 'vue'
import Id from '../entities/Id'
import BookNode from '../entities/BookNode'

const RouteController = reactive({
    search: decodeURI(location.search),
    currentPage: undefined,
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',

    goto(id: string) {
        history.pushState([], "", location.pathname + "?id=" + id);
        this.search = decodeURI(location.search)
        this.refreshCurrentPage()
        this.checkHomePage()
    },
    getCurrentPage(): BookNode {
        // console.log('get current page')
        if (this.currentPage == undefined) this.refreshCurrentPage()

        return this.currentPage
    },
    refreshCurrentPage() {
        console.log('refresh current page')
        let id = (new URL(location.href)).searchParams.get('id') || ''
        let path = Id.idToPath(id ? id : '/')
        this.currentPage = (new BookNode(path)).firstPage()
    },
    getBreadcrumbs(): BookNode[] {
        return this.getCurrentPage().getParents()
    },
    checkHomePage() {
        this.isHomePage = (new URL(location.href)).searchParams.get('id') == '/'
    }
})

export default RouteController