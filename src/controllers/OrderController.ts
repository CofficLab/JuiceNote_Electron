import Chapter from '../entities/Chapter'
import { reactive } from 'vue'
import Log from '../tools/Log'
import Page from 'src/entities/Page'

const OrderController = reactive({
    codeId: '',
    code: '',

    createChild(parent: Chapter, name: string): Page {
        let created = parent.create(name)
        this.refresh()

        return created
    },
    createFolderChild(parent: Chapter, name: string): Chapter {
        let created = parent.createFolder(name)
        this.refresh()

        return created
    },
    updateOrder(navigator: node, order: number) {
        Log.info('store.updateOrder', navigator.id + '移动到' + order)
        navigator.setOrder(order)
        this.refresh()
    },
    refresh() {
        Log.info('store.refresh', 'refresh in store')
        this.root = node.refreshedRoot()
        this.project = this.root.current().isLeaf() ? this.root.current().parent().project : this.root.current().firstLeaf().parent().project
    },
    delete(node: node) {
        this.goto(node.prevLeaf().id);
        node.delete()
        this.refresh()
    },
})

export default OrderController