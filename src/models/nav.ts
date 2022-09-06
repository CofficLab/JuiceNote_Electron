import fs from "fs";
import path from "path";
import markdown from './markdown'

/**
 * 导航节点
 */
class navigatorNode {
    public name: any
    public children: navigatorNode[] = [];
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
    let result = activePath.indexOf(node.name) > 0

    if (result) {
        // console.log(node.name + ' should be active')
    } else {
        // console.log(node.name + ' should not be active')
    }

    return result
}

let nav = {
    navigatorNode,
    shouldBeActive,
    getNavigators
}

export default nav