import path from "path";
import fs from "fs";

/**
 * 导航节点
 */
class navigatorNode {
    public name: any
    public children: navigatorNode[] = [];
}

const markdownPath = path.join(process.cwd(), "src/markdown");
let navigators: navigatorNode[] = []

fs.readdirSync(markdownPath).forEach((navigator) => {
    navigators.push(makeNode(path.join(markdownPath, navigator)))
})

// console.log(JSON.stringify(navigators))

/**
 * 生成一个导航节点
 * 
 * @param navigator 
 * @returns 
 */
function makeNode(navigator: string): navigatorNode {
    // console.log('now make navigator node for ' + navigator)

    let node = new navigatorNode
    node.name = navigator.replace(markdownPath + '/', '').replaceAll('/', '@').replace('.md', '')

    let stat = fs.statSync(navigator)

    if (stat.isDirectory()) {
        let children = fs.readdirSync(navigator)
        children.forEach((child) => {
            let childNode = makeNode(path.join(navigator, child))
            node.children.push(childNode)
        })
    }

    return node;
}

function shouldBeActive(node: navigatorNode, activePath: string) {
    let result = activePath.indexOf(node.name) > 0

    if (result) {
        console.log(node.name + ' should be active')
    } else {
        // console.log(node.name + ' should not be active')
    }

    return result
}

export { navigators, shouldBeActive, navigatorNode }