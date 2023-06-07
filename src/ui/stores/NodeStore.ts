import { defineStore } from 'pinia'
import { Node, RootNode } from '../entities/Node'
import storeLogger from '../log/storeLogger'

export const useNodeStore = defineStore('node-store', {
    state: () => {
        return {
            current: RootNode,
            root: RootNode,
            activeNodes: [RootNode],
        }
    },

    actions: {
        updateRoot(node: Node) {
            storeLogger.info('更新根节点为',node.title)
            this.root = node
        },
        updateCurrent(node: Node) {
            // 更新当前节点的同时，更新激活的节点
            node.getParents().then(parents => {
                storeLogger.info('更新当前节点为', node.title)
                this.current = node

                this.activeNodes = [RootNode,...parents,node]
                storeLogger.info('更新当前激活的节点为', this.activeNodes.map(n => n.title))
            })
        },
        refreshCurrent() {
            this.current.updatedAt = (new Date()).toISOString()
        },
        refreshRoot() {
            let newRoot = this.root
            newRoot.updatedAt = (new Date()).toISOString()

            this.root = newRoot
            storeLogger.info('刷新根节点', this.root.updatedAt)
        }
    },
})