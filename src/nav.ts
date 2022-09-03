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
    node.name = navigator.replace(markdownPath, '')

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

export { navigators }