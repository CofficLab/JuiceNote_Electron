import Logger from "electron-log";
import { Node } from "../entities/Node";
import Preload from "./Preload"
import apiLogger from "../log/apiLogger";

const Ipc = Preload.ipc

const NodeApi = {
    async create(node:Node) {
        apiLogger.info('发起 API 请求：create')
        return Ipc.invoke('create', node)
    },

    async delete(id: number) {
        apiLogger.info('发起 API 请求：delete')
        return Ipc.invoke('delete', id)
    },

    async getTree(): Promise<Node> {
        apiLogger.info('发起 API 请求：getTree')
        return Ipc.invoke('getTree').then((node) => {
            return new Node(node)
        })
    },

    async find(id: number): Promise<Node> {
        apiLogger.info('发起 API 请求：find')
        return Ipc.invoke('find', id).then((node) => {
            return new Node(node)
        })
    },

    async getFirstPage(id:number): Promise<Node> {
        const node = await Ipc.invoke('getFirstPage', id);
        return new Node(node);
    },

    async getChildren(id: number): Promise<Node[]> {
        apiLogger.info('发起 API 请求：getChildren')
        return Ipc.invoke('getChildren', id).then((nodes) => {
            return nodes.map((node:any) => {
                return new Node(node)
            })
        })
    },

    async search(keyword: string):Promise<Node[]> {
        return Ipc.invoke('search',keyword).then((nodes) => {
            return nodes.map((node: any) => {
                return new Node(node)
            })
        })
    },

    async updateContent(id: number, content: string) {
        return Ipc.invoke('updateContent', id, content)
    },

    async updateTitle(id: number, content: string) {
        return Ipc.invoke('updateTitle', id, content)
    },

    async updateVisible(id: number, visible: boolean) {
        return Ipc.invoke('updateVisible', id, visible)
    },

    async save(node:Node) {
        return Ipc.invoke('save', JSON.stringify(node))
    },

    async sync(node: Node) {
        return Ipc.invoke('sync', JSON.stringify(node))  
    },

    async export(id:number) {
        return Ipc.invoke('export', id)
    },

    async import(id: number) {
        return Ipc.invoke('import', id)
    }
}

export default NodeApi