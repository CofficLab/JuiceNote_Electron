import { defineStore } from 'pinia'
import { EmptyNode, Node } from '../entities/Node'

export const useCurrentNodeStore = defineStore('current', {
    state: () => {
        return {
            current: EmptyNode,
            root:EmptyNode,
        }
    },

    actions: {
        update(node: Node) {
            console.log('更新store中的当前节点为', node.title)
            this.current = node
        },
        updateRoot(node: Node) {
            console.log('更新store中的根节点为', node.title)
            this.root = node
        }
    },
})