import { Node } from "../entities/Node";
import Preload from "./Preload"

const Ipc = Preload.ipc

const NodeApi =  {
    async getRoot(): Promise<Node> {
        return Ipc.invoke('getRoot').then((node) => {
            return new Node(node)
        })
    },

    async find(id:number): Promise<Node> {
        return Ipc.invoke('find', id).then((node) => {
            return new Node(node)
        })
    },

    async getFirstPage(id:number): Promise<Node> {
        return Ipc.invoke('getFirstPage', id).then((node) => {
            return new Node(node)
        })
    },

    async getChildren(id:number): Promise<Node[]> {
        return Ipc.invoke('getChildren', id).then((nodes) => {
            return nodes.map((node:any) => {
                return new Node(node)
            })
        })
    }
}

export default NodeApi