import { reactive } from 'vue'
import Id from '../entities/Id'
import BookNode from '../entities/BookNode'

const RouteController = reactive({
    search: decodeURI(location.search),
    currentPage: new BookNode,
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',

    goto(id: string) {
        history.pushState([], "", location.pathname + "?id=" + id);
        this.refresh()
        this.checkHomePage()
    },
    getCurrentPage(): BookNode {
        // console.log('get current page')
        if (this.currentPage.isEmpty()) this.refresh()

        return this.currentPage
    },
    refresh() {
        console.log('refresh current page')
        let id = (new URL(location.href)).searchParams.get('id') || ''
        let path = Id.idToPath(id ? id : '/')
        this.search = decodeURI(location.search)
        this.currentPage = (new BookNode(path)).firstPage()
    },
    getBreadcrumbs(): BookNode[] {
        return this.getCurrentPage().getParents().concat([this.getCurrentPage()])
    },
    checkHomePage() {
        this.isHomePage = (new URL(location.href)).searchParams.get('id') == '/'
    },
    setChildrenIds(children: BookNode[]) {
        let parent = children.at(0)?.getParent()
        if (parent == undefined) {
            throw '更新children发生错误，找不到parent'
        }

        parent.setChildrenConfig(children.map(child => {
            return child.id
        }))

        this.goto(this.currentPage.id)
    }
})

export default RouteController