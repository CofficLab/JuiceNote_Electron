import fs from 'fs'
import path from 'path'
import electron from 'electron'

const markdownRootPath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'markdown')
const root = markdownRootPath
const md = require('markdown-it')({
    html: true
});

md.use(require("markdown-it-anchor").default)
md.use(require("markdown-it-table-of-contents"))

// console.log('markdown root path is ', markdownRootPath)

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
 * 返回markdown目录的绝对路径
 * 
 * @param markdownFile markdown目录，相对于markdown根目录的路径
 * @returns 
 */
function getAbsolutePathOfFolder(markdownFile: string): string {
    // console.log('get absolute path of ' + markdownFile)

    return path.join(markdownRootPath, markdownFile.replace('@', '/'))
}

/**
 * 获取原始的markdown内容
 * 
 * @param markdownName markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getMarkdownContent(markdownName: string) {
    var absolutePath = getAbsolutePath(markdownName)

    if (!fs.existsSync(absolutePath)) {
        console.log(absolutePath + 'not exists, generate')
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
    // console.log('get markdown rendered content of ' + markdownName)
    if (!fs.existsSync(getAbsolutePath(markdownName))) {
        // writeToMarkdownFile(markdownName, "# " + markdownName)
        return md.render("## 文件「" + markdownName + "」不存在")
    }

    // console.log('get markdown rendered content:' + md.render("[[toc]] \r\n" + getMarkdownContent(markdownName)))

    return md.render("[[toc]] \r\n" + getMarkdownContent(markdownName))
}

/**
 * 获取markdown的标题
 * 
 * @param markdownName markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getMarkdownTitle(markdownName: string): string {
    let html = getMarkdownRenderedContent(markdownName)
    let dom = makeDom(html)
    let title = dom.getElementsByTagName('h1')[0]

    return title ? title.innerText : ''
}

/**
 * 获取markdown的table of contents
 * 
 * @param markdownName markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getMarkdownToc(markdownName: string): string {
    let htmlWithToc = getMarkdownRenderedContent(markdownName)
    let dom = makeDom(htmlWithToc)
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
    return removeToc(getMarkdownRenderedContent(markdownFile));
}

/**
 * 获取markdown渲染后的不带标题的HTML
 * 
 * @param markdownFile markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getMarkdownRenderedContentWithoutTitle(markdownFile: string): string {
    return removeTitle(getMarkdownRenderedContent(markdownFile))
}

/**
 * 获取markdown渲染后的不带标题、不带TOC的正文的HTML
 * 
 * @param markdownFile markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function getMarkdownRenderedBody(markdownFile: string): string {
    return removeTitle(removeToc(getMarkdownRenderedContent(markdownFile)))
}

/**
 * 往markdown文件里写内容
 * 
 * @param markdownFile markdown文件名，相对于markdown根目录的路径
 * @param content 要写入的内容
 * @returns 
 */
function writeToMarkdownFile(markdownFile: string, content: string): void {
    console.log('write to markdown file', markdownFile)
    if (!fs.existsSync(path.dirname(getAbsolutePath(markdownFile)))) {
        fs.mkdirSync(path.dirname(getAbsolutePath(markdownFile)))
    }

    return fs.writeFileSync(getAbsolutePath(markdownFile), content)
}

/**
 * 重命名文件
 * 
 * @param markdownFile 
 * @param name 
 */
function rename(markdownFile: string, name: string) {
    if (markdownFile !== name) {
        console.log('markdown:rename', markdownFile, 'to', name)
        fs.renameSync(getAbsolutePath(markdownFile), getAbsolutePath(name));
    }
}

/**
 * 删除Markdown文件
 * 
 * @param markdownFile markdown文件名，相对于markdown根目录的路径
 * @returns 
 */
function deleteMarkdownFile(markdownFile: string): void {
    fs.unlinkSync(getAbsolutePath(markdownFile))
}

/**
 * 移除TOC部分
 * 
 * @param html HTML代码
 * @returns 
 */
function removeToc(html: string) {
    let dom = makeDom(html)
    let toc = dom.getElementsByClassName('table-of-contents')[0]

    if (toc) dom.removeChild(toc)

    return dom.innerHTML
}

/**
 * 移除标题部分
 * 
 * @param html HTML代码
 * @returns 
 */
function removeTitle(html: string) {
    let dom = makeDom(html)
    let toc = dom.getElementsByTagName('h1')[0]

    if (toc) dom.removeChild(toc)

    return dom.innerHTML
}

/**
 * 
 * 创建DOM元素
 * 
 * @param html HTML代码
 * @returns 
 */
function makeDom(html: string) {
    let dom = document.createElement('div')
    dom.innerHTML = html

    return dom
}

function moveTo(markdownFile: string, destination: string) {
    fs.renameSync(getAbsolutePathOfFolder(markdownFile), getAbsolutePathOfFolder(destination))
}

function getOrder(markdownFile: string) {
    return markdownFile.split('_')[0]
}

function getId(path: string) {
    return path.replace(markdownRootPath, '').replace('.md', '').replace('/', '').replaceAll('/', '@')
}

function isExists(id: string) {
    return fs.existsSync(getAbsolutePath(id)) || fs.existsSync(getAbsolutePathOfFolder(id))
}

let markdown = {
    moveTo,
    getOrder,
    getId,
    rename,
    root,
    isExists,
    getMarkdownToc,
    getMarkdownTitle,
    markdownRootPath,
    getMarkdownContent,
    deleteMarkdownFile,
    writeToMarkdownFile,
    getMarkdownRenderedBody,
    getMarkdownRenderedContent,
    getMarkdownRenderedContentWithoutToc,
    getMarkdownRenderedContentWithoutTitle
}

export default markdown
