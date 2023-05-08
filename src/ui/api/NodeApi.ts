import { Node, NodeOptions } from "../entities/Node";
import Preload from "./Preload"

const Ipc = Preload.ipc

const NodeApi = {
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
    updatePriority(id: number, priority: number) {
        console.log(`节点ID「${id}」更新priority为${priority}`)
        Ipc.sendSync('updatePriority', id, priority)
    },
    updateContent(id: number, content: string) {
        dispatchEvent(new Event('nodeUpdated'))
        Ipc.send('updateContent', id, content)
    },
    updateCover(id: number, base64Code: string): string {
        return Ipc.sendSync('updateCover', id, base64Code)
    },
    updateTitle(id: number, title: string): string {
        return Ipc.sendSync('updateTitle', title, id)
    },
    updateVisible(id: number, visible: boolean) {
        Ipc.sendSync('updateVisible', id)
    },
    delete(id: number): string {
        return Ipc.sendSync('delete', id)
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

export { NodeApi }