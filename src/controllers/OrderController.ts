
import { reactive } from 'vue'

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
        console.log('store.updateOrder', navigator.id + '移动到' + order)
        navigator.setOrder(order)
        this.refresh()
    },
    refresh() {
        console.log('store.refresh', 'refresh in store')
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