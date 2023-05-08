import { Node, NodeOptions } from "../entities/Node";
import Preload from "./Preload"

const Ipc = Preload.ipc

const ShopApi = {
    getRoot(): Node {
        return new Node(Ipc.sendSync('getRoot'))
    },
    getChildren(id: number): Node[] {
        let children = Ipc.sendSync('getChildren', id)

        return children.map((child: NodeOptions) => {
            return new Node(child)
        });
    },
    search(keyword: string): Node[] {
        return Ipc.sendSync('search', keyword).map((node: NodeOptions) => {
            return new Node(node)
        })
    },
    find(id: number | String): Node {
        return new Node(Ipc.sendSync('find', id))
    },
    getBooks(): Node[] {
        let items = Ipc.sendSync('getBooks')

        return items.map((item: NodeOptions) => {
            return new Node(item)
        });
    },
    getFirstBook(): Node {
        return this.getBooks()[0]
    },
    getVisibleBooks(): Node[] {
        return this.getBooks().map((item: NodeOptions) => {
            return new Node(item)
        }).filter(node => node.isVisible);
    }
}

export { ShopApi }