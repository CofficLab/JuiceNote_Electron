import { defineStore } from 'pinia'
import { Node, RootNode } from '../entities/Node'
import storeLogger from '../log/storeLogger'

export const useNodeStore = defineStore('node-store', {
    state: () => {
        return {
            current: RootNode,
            tree: RootNode,
            activeNodes: [RootNode],
        }
    },

    actions: {
        updateCurrent(node: Node) {
            // 更新当前节点的同时，更新激活的节点
            node.getParents().then(parents => {
                storeLogger.info('更新当前节点为', node.title)
                this.current = node

                this.activeNodes = [RootNode,...parents,node]
                storeLogger.info('更新当前激活的节点为', this.activeNodes.map(n => n.title))
            })
        },
        updateTree(tree: Node) {
            storeLogger.info('更新当前树为', tree.title)
            this.tree = tree
        },
        refreshCurrent() {
            this.current.updatedAt = (new Date()).toISOString()
        },
        refreshTree() {
            let newTree = this.tree
            newTree.updatedAt = (new Date()).toISOString()

            this.tree = newTree
            storeLogger.info('刷新树', this.tree.updatedAt)
        }
    },
})