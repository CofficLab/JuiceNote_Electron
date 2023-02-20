import { reactive } from 'vue'

const CodeController = reactive({
    codeId: '',
    code: '',

    createChild(parent: node, name: string): node {
        let created = parent.create(name)
        this.refresh()

        return created
    },
    createFolderChild(parent: node, name: string): node {
        let created = parent.createFolder(name)
        this.refresh()

        return created
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

export default CodeController