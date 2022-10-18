import fs from "fs";
import path from "path";
import markdown from './markdown';

// null->根节点->图书1->章节1
//                   -> 章节2 
//                   -> 章节n
//            ->图书2->章节1
//                   -> 章节2 
//                   -> 章节n
//            ->图书3->章节1
//                   -> 章节2 
//                   -> 章节n
//            ->图书n->章节1
//                   -> 章节2 
//                   -> 章节n

/**
 * 导航节点的定义
 */
class navigatorNode {
    public constructor(id?: string) {
        if (id) this.id = id
    }
    public id: string = ''
    public title: string = ''
    public link: string = ''
    public children: navigatorNode[] = []
    /**
     * 在子孙节点中查找
     * 
     * @param id 要查找的节点的ID
     * @returns 
     */
    public find(id: string): navigatorNode | null {
        // console.log('try to find', id, 'now node is', this.id)
        if (this.id === id) {
            return this
        }

        for (const key in this.children) {
            let node = this.children[key].find(id)
            if (node) return node
        }

        this.children.forEach(function (child) {
            let node = child.find(id)
            if (node) return node
        })

        return null
    }
    public findKey(id: string): number {
        for (const key in this.children) {
            if (this.children[key].id == id) {
                return parseInt(key);
            }
        }

        return -1
    }
    public isActivated(activePath: string) {
        // console.log('check', this.id, 'active path is ', activePath)
        // 如果是根节点
        if (this.id == getRootNavigator().id) {
            return true;
        }

        // 当前节点的链接等于目标链接
        if (this.link === activePath) {
            // console.log('now is', this)
            // console.log(this.id + ' should be active,link is', this.link, 'active path is', activePath)
            return true;
        }

        // 如果当前节点没有子节点
        if (this.children.length === 0) {
            return this.link == activePath
        }

        // 如果子节点active，当前节点就active
        for (const key in this.children) {
            let child = this.children[key]

            if (child.isActivated(activePath)) {
                return true;
            }
        }

        return false;
    }
    public getActivatedChild(activePath: string): navigatorNode {
        // console.log('get activated child of', this.id, 'while active path is', activePath)
        for (const key in this.children) {
            let child = this.children[key]

            if (child.isActivated(activePath)) return child;
        }

        return new navigatorNode;
    }
    public getActivated(activePath: string): navigatorNode[] {
        let collection = this.getActivatedChildren(activePath)
        collection.unshift(this)

        // console.log('active path is ', activePath, 'activated are', collection)

        return collection
    }
    public getActivatedChildren(activePath: string): navigatorNode[] {
        let parent: navigatorNode | null = this
        let collection: navigatorNode[] = []

        while (parent !== null) {
            let activatedChild: navigatorNode = parent.getActivatedChild(activePath)
            if (activatedChild.id) {
                collection.push(activatedChild)
                parent = activatedChild
            } else {
                parent = null
            }
        }

        // console.log('node is', this.id, 'active path is', activePath, 'activated children', collection)

        return collection
    }
    public getLastActivatedChild(activePath: string): navigatorNode {
        // console.log('get last activated child of', this)
        // console.log('activated children are', this.getActivatedChildren(activePath))
        let node = this.getActivatedChildren(activePath).pop()

        // console.log('last activated child is', node)
        return node ? node : (new navigatorNode);
    }
    public delete() {
        // console.log('删除导航', this.id)
        markdown.deleteMarkdownFile(this.id)
        update()
    }
    public getParent(): navigatorNode | null {
        // console.log('get parent of ', this)

        // 空节点或根节点的父节点是null
        if (this.id === '' || this.id === '/') {
            return null
        }

        let rootNode = getRootNavigator()
        let activatedNodes = [rootNode].concat(rootNode.getActivatedChildren(this.link))
        // console.log('activated nodes,when', this.id, activatedNodes)
        for (const key in activatedNodes) {
            if (activatedNodes[key].id === this.id) {
                return activatedNodes[parseInt(key) - 1]
            }
        }

        return null
    }
    public next(): navigatorNode | undefined {
        let parent = this.getParent()
        // console.log('get next,current parent is', parent)

        if (parent === null) {
            // 空节点的下一个节点是根节点
            if (this === new navigatorNode) {
                return getRootNavigator()
            }

            // 根节点的下一个节点是根节点的第一个节点
            if (this === getRootNavigator()) {
                let firstNode = this.children.shift()
                return firstNode ? firstNode : (new navigatorNode)
            }
        } else {
            let key = parent.findKey(this.id)
            let nextKey = key + 1

            // 如果同级的下一个节点不存在，返回父节点的下一个节点
            if (parent.children[nextKey] === undefined) {
                console.log('no brother next', this.id)
                return parent.next()
            }

            // console.log('get next node of', this.id)
            // console.log('parent is ', parent)
            // console.log('get next,current key is', key)

            return parent.children[nextKey]
        }
    }
    public prev(): navigatorNode | null {
        // 空节点的上一个节点是根节点
        if (this === new navigatorNode) {
            return getRootNavigator()
        }

        // 根节点的上一个节点是null
        if (this === getRootNavigator()) {
            return null
        }

        let parent = this.getParent()
        let nextBrother = parent?.children[parent.findKey(this.id) + 1]
        let parentNextBrother = parent?.next()

        // 同级的下一个节点存在，则返回
        if (nextBrother !== null && nextBrother !== undefined) {
            return nextBrother
        }

        // 如果同级的下一个节点不存在，返回父节点的下一个节点
        return parentNextBrother !== undefined ? parentNextBrother : null
    }
    public update(node: navigatorNode): boolean {
        console.log('update', this.id, 'set children to', node.children)
        // 如果是根节点
        if (this.id === '/') {
            return update(node)
        }

        // 非根节点
        let parent = this.getParent()
        if (!parent) return false

        let key = parent.findKey(this.id)
        parent.children[key] = node

        return parent.update(parent)
    }
    public setOrder(order: number) {
        let parent = this.getParent()
        if (parent === null) return false

        // 从父节点的子节点列表中删除本节点
        parent.children.splice(parent.findKey(this.id), 1);
        // 在指定的位置增加本节点
        parent.children.splice(order, 0, this);

        return parent.update(parent)
    }
    public createChild(title: string): navigatorNode {
        let id = this.id + '@' + title
        markdown.writeToMarkdownFile(id, "# Empty Title \r\n ## 简介")
        update()

        let created = getRootNavigator().find(id)
        if (!created) {
            console.error('error,can not find ', id)
            return new navigatorNode
        }

        return created
    }
}

/**
 * 获取根导航节点
 * 
 * @returns navigatorNode
 */
function getRootNavigator(): navigatorNode {
    if (!fs.existsSync(path.join(markdown.markdownRootPath, 'root.json'))) {
        console.log('root.json不存在，新建')
        update();
    }

    let jsonObject = JSON.parse(fs.readFileSync(path.join(markdown.markdownRootPath, 'root.json'), 'utf-8'))
    let root = transformToNode(jsonObject)

    // console.log('root', root)

    return root
}

function transformToNode(object: navigatorNode): navigatorNode {
    let node = new navigatorNode(object.id)
    node.title = object.title
    node.link = object.link

    if (object.children.length > 0) {
        object.children.forEach(function (child) {
            node.children.push(transformToNode(child))
        })
    }

    return node
}

/**
 * 根据路径计算出图书的名字
 * 
 * @param activePath 
 * @returns 
 */
// function getBookName(activePath: string): string {
//     let file = activePath.replace('/article/', '').replace('/editor/', '')
//     let parts = file.split('@')

//     return parts[0]
// }

/**
 * 生成一个导航节点
 * 
 * @param navigator 
 * @returns 
 */
function makeNode(navigator: string): navigatorNode {
    // console.log('now make navigator node for ' + navigator)

    let node = new navigatorNode
    node.id = navigator.replace(markdown.markdownRootPath + '/', '').replaceAll('/', '@').replace('.md', '')

    let title = node.id.split('@').pop()
    node.title = title != undefined ? title : ''

    node.link = '/article/' + node.id
    if (!node.link.includes('@')) node.link = node.link + '@home'

    if (!fs.existsSync(navigator)) {
        console.log('无法生成导航，文件不存在', navigator)
        return new navigatorNode
    }

    let stat = fs.statSync(navigator)

    if (stat.isDirectory()) {
        let children = fs.readdirSync(navigator)
        children.forEach((child) => {
            let childNode = makeNode(path.join(navigator, child))
            node.children.push(childNode)
        })
    }

    // console.log('navigator node for ' + navigator, node)

    return node;
}

/**
 * 从路由的路径中解析出 Markdown 文件的名字
 * 
 * @param routerPath 路由的路径，如：/editor/Python@home
 * @returns 
 */
function getMarkdownNameFromRoutePath(routerPath: string): string {
    return routerPath.replace('/article/', '').replace('/editor/', '')
}

/**
 * 将导航写入到navigators.json，不提供root节点则自动计算
 * 
 */
function update(root?: navigatorNode): boolean {
    if (root === undefined) {
        root = new navigatorNode('/')
        root.link = '/'
        root.title = '图书'
        fs.readdirSync(markdown.markdownRootPath).forEach((navigator) => {
            root?.children.push(makeNode(path.join(markdown.markdownRootPath, navigator)))
        })
    }

    // console.log(JSON.stringify(navigators))

    fs.writeFileSync(path.join(markdown.markdownRootPath, 'root.json'), JSON.stringify(root, null, 4))

    return true
}

let nav = {
    update,
    getRootNavigator,
    getMarkdownNameFromRoutePath
}

export {
    nav,
    navigatorNode
}