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
        updateCurrent(node: Node) {
            storeLogger.info('更新当前节点为', node.title)
            this.current = node
            this.activeNodes = [RootNode,node]
            
            node.getParents()
                .then(parents => {
                    this.activeNodes = parents.concat(node).concat(RootNode)
                    storeLogger.info('当前激活的节点为', this.activeNodes.map(n => n.title))
                })
        },
        refreshCurrent() {
            this.current.updatedAt = (new Date()).toISOString()
        },
        refreshRoot() {
            this.root.updatedAt = (new Date()).toISOString()
        }
    },
})