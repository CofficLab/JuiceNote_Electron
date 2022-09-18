import fs from "fs";
import path from "path";
import { unescape } from "querystring";
import markdown from './markdown'

/**
 * 导航节点
 */
class navigatorNode {
    public name: string = ''
    public active: boolean = false
    public children: navigatorNode[] = []
}

/**
 * 返回导航节点列表
 * 
 * @returns navigatorNode[]
 */
function getNavigators(): navigatorNode[] {
    let navigators: navigatorNode[] = []

    fs.readdirSync(markdown.markdownRootPath).forEach((navigator) => {
        navigators.push(makeNode(path.join(markdown.markdownRootPath, navigator)))
    })

    // console.log(JSON.stringify(navigators))

    return navigators
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
    node.name = navigator.replace(markdown.markdownRootPath + '/', '').replaceAll('/', '@').replace('.md', '')

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
 * 判断导航节点是否是激活状态
 * 
 * @param node 导航节点
 * @param activePath 当前路由的路径
 * @returns 
 */
function shouldBeActive(node: navigatorNode, activePath: string) {
    let result = unescape(activePath).indexOf(node.name) > 0

    if (result) {
        console.log(node.name + ' should be active', node)
    } else {
        // console.log(node.name + ' should not be active')
    }

    return result
}

function getActiveNavigator(activePath: string): navigatorNode {
    // console.log('get active navigators, now path is ' + activePath)
    let navigators = getNavigators()
    let result = new navigatorNode

    navigators.forEach(function (navigator) {
        if (shouldBeActive(navigator, activePath)) {
            result = navigator
        }
    })

    return result
}

/**
 * 从路由的路径中解析出 Markdown 文件的名字
 * 
 * @param routerPath 路由的路径，如：/editor/06_Python@home
 * @returns 
 */
function getMarkdownNameFromRoutePath(routerPath: string): string {
    return routerPath.replace('/article/', '').replace('/editor/', '')
}

let nav = {
    shouldBeActive,
    getNavigators,
    getActiveNavigator,
    getMarkdownNameFromRoutePath
}

export {
    nav,
    navigatorNode
}