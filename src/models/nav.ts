import fs from "fs";
import path from "path";
import { unescape } from "querystring";
import markdown from './markdown'

/**
 * 导航节点
 */
class navigatorNode {
    public constructor(name?: string) {
        if (name) this.name = name
    }
    public name: string = ''
    public path: string = ''
    public title: string = ''
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

    if (!fs.existsSync(path.join(markdown.markdownRootPath, 'navigators.json'))) {
        computeAndSaveNavigators();
    }

    let json = fs.readFileSync(path.join(markdown.markdownRootPath, 'navigators.json'), 'utf-8')
    let items = JSON.parse(json)
    items.forEach(function (item: navigatorNode) {
        navigators.push(makeNode(path.join(markdown.markdownRootPath, item.name)))
    })

    return navigators
}

function computeAndSaveNavigators() {
    let navigators: navigatorNode[] = []

    fs.readdirSync(markdown.markdownRootPath).forEach((navigator) => {
        navigators.push(makeNode(path.join(markdown.markdownRootPath, navigator)))
    })

    console.log(JSON.stringify(navigators))

    fs.writeFileSync(path.join(markdown.markdownRootPath, 'navigators.json'), JSON.stringify(navigators, null, 4))
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
    node.name = navigator.replace(markdown.markdownRootPath + '/', '').replaceAll('/', '@').replace('.md', '')
    node.path = node.name
    node.title = node.path.split('@')[1]

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
 * 判断导航节点是否是激活状态
 * 
 * @param node 导航节点
 * @param activePath 当前路由的路径
 * @returns 
 */
function shouldBeActive(node: navigatorNode, activePath: string) {
    let result = unescape(activePath).indexOf(node.name) > 0

    if (result) {
        // console.log(node.name + ' should be active', node)
    } else {
        // console.log(node.name + ' should not be active')
    }

    return result
}

function getActiveNavigator(activePath: string): navigatorNode {
    // console.log('get active navigators, now path is ' + activePath)
    let navigators = getNavigators()
    let result = new navigatorNode

    if (activePath.indexOf('sort') > 0) {
        result.name = '正在排序'
    } else {
        navigators.forEach(function (navigator) {
            if (shouldBeActive(navigator, activePath)) {
                result = navigator
            }
        })
    }

    return result
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
 * @param navigators 
 */
function update(navigators?: navigatorNode[]) {
    if (navigators === undefined) {
        navigators = getNavigators();
    }

    fs.writeFileSync(path.join(markdown.markdownRootPath, 'navigators.json'), JSON.stringify(navigators, null, 4))
}

/**
 * 创建一个新的导航节点
 * 
 * @param name 节点的路径
 */
function make(name: string) {
    markdown.writeToMarkdownFile(name, "# Empty Title \r\n ## 简介")
    update()
}

/**
 * 删除一个导航节点
 * 
 * @param name 节点的路径
 */
function deleteNav(name: string) {
    let markdownFile = name.replace('/article/', '')
    console.log('删除导航', markdownFile)
    markdown.deleteMarkdownFile(markdownFile)
    update()
}

let nav = {
    make,
    update,
    deleteNav,
    shouldBeActive,
    getNavigators,
    getBookName,
    getActiveNavigator,
    getMarkdownNameFromRoutePath
}

export {
    nav,
    navigatorNode
}