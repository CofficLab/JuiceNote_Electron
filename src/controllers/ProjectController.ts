import { reactive } from 'vue'
import node from '../models/TreeNode'

const ProjectController = reactive({
    project: (new node).project,

    getProject() {
        console.log('store.getProject', 'get current node')
        let current = this.getCurrentNode()
        current.isLeaf() ? current.parent().project : current.firstLeaf().parent().project
    },
})

export default ProjectController