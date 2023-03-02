import { reactive } from 'vue'
import Id from '../entities/Id'
import BookNode from '../entities/BookNode'
import { existsSync } from 'fs'
import path from "path"

const RouteController = reactive({
    search: decodeURI(location.search),
    currentPage: new BookNode,
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',
    editable: (new URL(location.href)).searchParams.get('edit_mode') != undefined,
    renderedHtml: '',
    adding: false, // 用于判断是否显示添加的表单

    isEditMode() {
        return this.editable
    },

    toggleEditMode(): void {
        if (this.isEditMode()) {
            history.pushState([], "", location.pathname + "?id=" + this.getCurrentPage().id);
        } else {
            history.pushState([], "", location.pathname + "?id=" + this.getCurrentPage().id + '&edit_mode=1');
        }

        this.editable = !this.editable
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
        this.editable = (new URL(location.href)).searchParams.get('edit_mode') != undefined
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
        let currentPath = this.currentPage.path
        let message = this.currentPage.delete()

        while (!existsSync(currentPath)) {
            currentPath = path.dirname(currentPath)
        }

        this.goto((new BookNode(currentPath)).id)

        return message
    }
})

export default RouteController