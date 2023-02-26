import { reactive } from 'vue'
import Id from '../entities/Id'
import BookNode from '../entities/BookNode'

const RouteController = reactive({
    search: decodeURI(location.search),
    currentPage: new BookNode,
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',
    editMode: (new URL(location.href)).searchParams.get('edit_mode') != undefined,
    renderedHtml: '',

    isEditMode() {
        return this.editMode
    },

    toggleEditMode(): void {
        if (this.isEditMode()) {
            history.pushState([], "", location.pathname + "?id=" + this.getCurrentPage().id);
        } else {
            history.pushState([], "", location.pathname + "?id=" + this.getCurrentPage().id + '&edit_mode=1');
        }

        this.editMode = !this.editMode
        this.refresh()
        this.checkHomePage()
    },

    goto(id: string) {
        if (this.isEditMode()) {
            history.pushState([], "", location.pathname + "?id=" + id + '&edit_mode=1');
        } else {
            history.pushState([], "", location.pathname + "?id=" + id);
        }

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
        this.editMode = (new URL(location.href)).searchParams.get('edit_mode') != undefined
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
    },

    delete(): string {
        let message = this.currentPage.delete()
        this.goto(this.currentPage.getParent().id)

        return message
    }
})

export default RouteController