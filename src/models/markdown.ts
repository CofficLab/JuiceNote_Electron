import path from 'path'
import fs from 'fs'

const markdownRootPath = path.join(process.cwd(), 'markdown')
const md = require('markdown-it')({
    html: true
});

md.use(require("markdown-it-anchor").default);
md.use(require("markdown-it-table-of-contents"));

/**
 * 返回markdown文件的绝对路径
 * 
 * @param markdownFile markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getAbsolutePath(markdownFile: string): string {
    // console.log('get absolute path of ' + markdownFile)

    return path.join(markdownRootPath, markdownFile.replace('@', '/') + '.md')
}

/**
 * 获取原始的的markdown内容
 * 
 * @param markdownName markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getMarkdownContent(markdownName: string) {
    var absolutePath = getAbsolutePath(markdownName)

    if (!fs.existsSync(absolutePath)) {
        writeToMarkdownFile(markdownName, "# " + markdownName)
    }

    // console.log('read markdown content: ' + fs.readFileSync(absolutePath, 'utf-8'))

    return fs.readFileSync(absolutePath, 'utf-8')
}

/**
 * 获取渲染后的markdown内容
 * 
 * @param markdownName markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getMarkdownRenderedContent(markdownName: string) {
    if (!fs.existsSync(getAbsolutePath(markdownName))) {
        writeToMarkdownFile(markdownName, "# " + markdownName)
    }

    // console.log('get markdown rendered content:' + md.render("[[toc]] \r\n" + getMarkdownContent(markdownName)))

    return md.render("[[toc]] \r\n" + getMarkdownContent(markdownName))
}

/**
 * 获取markdown的table of contents
 * 
 * @param markdownName markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getMarkdownToc(markdownName: string): string {
    var htmlWithToc = getMarkdownRenderedContent(markdownName)
    var dom = document.createElement('div')

    dom.innerHTML = htmlWithToc

    let toc = dom.getElementsByClassName('table-of-contents')[0]

    return toc ? toc.outerHTML : ''
}

/**
 * 获取markdown渲染后的不带TOC的HTML
 * 
 * @param markdownFile markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getMarkdownRenderedContentWithoutToc(markdownFile: string): string {
    var html = getMarkdownRenderedContent(markdownFile)
    var dom = document.createElement('div')

    dom.innerHTML = html
    let toc = dom.getElementsByClassName('table-of-contents')[0]
    if (toc) {
        dom.removeChild(toc)
    }

    return dom.innerHTML
}

/**
 * 往markdown文件里写内容
 * 
 * @param markdownFile markdown文件名，相对于markdown根目录的路径
 * @param content 要写入的内容
 * @returns 
 */
function writeToMarkdownFile(markdownFile: string, content: string): void {
    return fs.writeFileSync(getAbsolutePath(markdownFile), content)
}

let markdown = {
    getMarkdownToc,
    markdownRootPath,
    getMarkdownContent,
    writeToMarkdownFile,
    getMarkdownRenderedContent,
    getMarkdownRenderedContentWithoutToc
}

export default markdown