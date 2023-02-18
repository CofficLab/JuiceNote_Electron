import { reactive } from 'vue'
import fs from 'fs'
import FileTree from '../tools/FileTree'
import Id from '../models/Id'
import Page from '../models/Page'

const RouteController = reactive({
    // root: new node,
    href: location.href,
    search: decodeURI(location.search),
    pathname: location.pathname,
    isProd: location.protocol === 'file:',
    currentPage: null,

    goto(id: string) {
        if (id === '/') id = this.root.firstLeaf().id
        history.pushState([], "", location.pathname + "?id=" + id);
        this.href = window.location.href
        this.search = decodeURI(location.search)
        this.pathname = window.location.pathname
        this.refreshCurrentPage()
    },
    getCurrentPage() {
        if (this.currentPage == null) {
            this.refreshCurrentPage()
        }

        return this.currentPage
    },
    refreshCurrentPage() {
        let id = (new URL(location.href)).searchParams.get('id')
        let path = Id.idToPath(id ? id : '/')

        if (fs.statSync(path).isDirectory()) {
            let firstLeaf = (new FileTree(path)).firstLeaf()?.path

            if (firstLeaf == null) {
                throw '文件夹下没有可展示的页面：' + path
            }

            path = firstLeaf
        }

        console.log(path)
        this.currentPage = new Page(path)
    },
    isHomePage() {
        return location.pathname == ''
    },
    // getRoot() {
    //     if (this.root.notEmpty()) {
    //         return this.root
    //     }

    //     return node.getRoot()
    // },
})

export default RouteController