import fs from "fs"
import path from "path"
import hljs from 'highlight.js'
import variables from "./variables";
import log from "./log";

const md = require('markdown-it')({
    html: true,
    highlight: function (str: any, lang: any) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
        }

        return ''; // 使用额外的默认转义
    }
});

md.use(require("markdown-it-anchor").default)
md.use(require("markdown-it-table-of-contents"), {
    'includeLevel': [1, 2, 3, 4]
})

/**
 * 导航节点的定义，基于“树”数据结构
 * 
 * 空节点->根节点->图书1->章节1
 *                   -> 章节2 
 *                   -> 章节n
 *            ->图书2->章节1
 *                   -> 章节2 
 *                   -> 章节n
 *            ->图书3->章节1
 *                   -> 章节2 
 *                   -> 章节n
 *            ->图书n->章节1
 *                   -> 章节2 
 *                   -> 章节n
 */
class markdown {
    public file: string = ''
    private rootPath = variables.rootPath

    public constructor(file?: string) {
        if (file) {
            // console.log('初始化markdown', file)
            this.file = file
        }
    }

    public content(): string {
        // log.info('markdown.content', 'file is' + this.file)
        // 需要补上markdown文件共同的footer
        return fs.readFileSync(this.file, 'utf-8') + fs.readFileSync(path.join(this.rootPath, 'footer.md'), 'utf-8')
    }

    /**
     * 获取markdown渲染后的HTML
     * 
     * @returns 
     */
    public html() {
        if (!fs.existsSync(this.file)) {
            return md.render("## 文件「" + this.file + "」不存在")
        }

        // if (path.extname(this.file) === '.py') {
        //     return md.render("# " + this.title + "\r\n```python\r\n" + this.content() + "\r\n```")
        // }

        return md.render(this.content())
    }

    /**
     * 获取markdown渲染后的HTML，带TOC
     * 
     * @returns 
     */
    public htmlWithToc() {
        if (!fs.existsSync(this.file)) {
            return md.render("## 文件「" + this.file + "」不存在")
        }

        return md.render("[[toc]] \r\n" + this.content())
    }

    public toc(): string {
        let htmlWithToc = this.htmlWithToc()
        let dom = markdown.makeDom(htmlWithToc)
        let toc = dom.getElementsByClassName('table-of-contents')[0]

        if (toc == undefined) return ''

        let tocWithoutTitle = toc.getElementsByTagName('ul')[0].getElementsByTagName('ul')[0]

        return tocWithoutTitle ? tocWithoutTitle.outerHTML : ''
    }

    /**
     * 获取标题
     * 
     * @returns 
     */
    public getTitle(): string {
        // 如果是markdown文件，获取markdown渲染后的HTML的标题
        let html = this.htmlWithToc()
        let dom = markdown.makeDom(html)
        let titleDom = dom.getElementsByTagName('h1')[0]

        return titleDom ? titleDom.innerText : ''
    }

    /**
     * 
     * 创建DOM元素
     * 
     * @param html HTML代码
     * @returns 
     */
    private static makeDom(html: string) {
        let dom = document.createElement('div')
        dom.innerHTML = html

        return dom
    }
}

export default markdown