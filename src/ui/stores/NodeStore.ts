import { defineStore } from 'pinia'
import {Node, RootNode } from '../entities/Node'
import storeLogger from '../log/storeLogger'

export const useCurrentNodeStore = defineStore('current', {
    state: () => {
        return {
            current: RootNode,
            root:RootNode,
        }
    },

    actions: {
        update(node: Node) {
            storeLogger.info('更新当前节点为', node.title)
            this.current = node
        },
        updateCurrent() {
            this.current.updatedAt = (new Date()).toISOString()
        },
        updateRoot() {
            this.root.updatedAt = (new Date()).toISOString()
        }
    },
})