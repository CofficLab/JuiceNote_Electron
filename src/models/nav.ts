import fs from "fs";
import path from "path";
import markdown from './markdown';
import { unescape } from "querystring";

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
    public find(id: string) {
        this.children.forEach(function (child) {
            if (child.id == id) {
                return child
            }
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
        // 如果是根节点
        if (this.id == getRootNavigator().id) {
            return true;
        }

        // 当前节点的链接等于目标链接
        if (this.link === activePath) {
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
        // console.log('get activated child of', this)
        for (const key in this.children) {
            let child = this.children[key]

            if (child.isActivated(activePath)) return child;
        }

        return new navigatorNode;
    }
    public getActivatedChildren(activePath: string): navigatorNode[] {
        let parent: navigatorNode | null = this
        let collection: navigatorNode[] = []

        while (parent !== null) {
            let activatedChild = parent.getActivatedChild(activePath)
            if (activatedChild.id) {
                collection.push(activatedChild)
                parent = activatedChild
            } else {
                parent = null
            }
        }

        // console.log('activated children', collection)

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
}

/**
 * 获取根导航节点
 * 
 * @returns navigatorNode[]
 */
function getRootNavigator(): navigatorNode {
    return getNavigators();
}

/**
 * 获取导航节点列表
 * 
 * @returns navigatorNode[]
 */
function getNavigators(): navigatorNode {
    let navigators: navigatorNode = new navigatorNode('/')

    if (!fs.existsSync(path.join(markdown.markdownRootPath, 'navigators.json'))) {
        console.log('navigators.json不存在，新建')
        update();
    }

    let json = fs.readFileSync(path.join(markdown.markdownRootPath, 'navigators.json'), 'utf-8')
    let items = JSON.parse(json)
    items.children.forEach(function (item: navigatorNode) {
        navigators.children.push(makeNode(path.join(markdown.markdownRootPath, item.id)))
    })

    return navigators
}

/**
 * 根据路径计算出图书的名字
 * 
 * @param activePath 
 * @returns 
 */
function getBookName(activePath: string): string {
    let file = activePath.replace('/article/', '').replace('/editor/', '')
    let parts = file.split('@')

    return parts[0]
}

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
 * 将导航写入到navigators.json
 * 
 */
function update(navigators?: navigatorNode) {
    let items: navigatorNode = new navigatorNode('root')

    if (navigators) items = navigators

    fs.readdirSync(markdown.markdownRootPath).forEach((navigator) => {
        items.children.push(makeNode(path.join(markdown.markdownRootPath, navigator)))
    })

    // console.log(JSON.stringify(navigators))

    fs.writeFileSync(path.join(markdown.markdownRootPath, 'navigators.json'), JSON.stringify(items, null, 4))
}

/**
 * 创建一个新的导航节点
 * 
 * @param name 节点的路径
 */
function make(name: string) {
    markdown.writeToMarkdownFile(name, "# Empty Title \r\n ## 简介")
    update()

    return makeNode(path.join(markdown.markdownRootPath, name) + '.md')
}

let nav = {
    make,
    update,
    getNavigators,
    getBookName,
    getMarkdownNameFromRoutePath
}

export {
    nav,
    navigatorNode
}