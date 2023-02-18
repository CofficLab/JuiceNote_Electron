import fs from "fs"
import path from "path"
import hljs from 'highlight.js'
import variables from "./Variables";

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

class Markdown {
    public absoluteFilePath: string = ''

    public constructor(absoluteFilePath: string) {
        if (!fs.existsSync(absoluteFilePath)) {
            throw '要初始化的markdown文件「' + absoluteFilePath + '」不存在'
        }

        this.absoluteFilePath = absoluteFilePath
    }

    public content(): string {
        // 需要补上markdown文件共同的footer
        return fs.readFileSync(this.absoluteFilePath, 'utf-8') + fs.readFileSync(path.join(variables.markdownRootPath, 'footer.md'), 'utf-8')
    }

    // 获取markdown渲染后的HTML
    public html() {
        if (!fs.existsSync(this.absoluteFilePath)) {
            return md.render("## 文件「" + this.absoluteFilePath + "」不存在")
        }

        // if (path.extname(this.file) === '.py') {
        //     return md.render("# " + this.title + "\r\n```python\r\n" + this.content() + "\r\n```")
        // }

        return md.render(this.content())
    }

    // 获取markdown渲染后的HTML，带TOC
    public htmlWithToc() {
        if (!fs.existsSync(this.absoluteFilePath)) {
            return md.render("## 文件「" + this.absoluteFilePath + "」不存在")
        }

        return md.render("[[toc]] \r\n" + this.content())
    }

    public toc(): string {
        let htmlWithToc = this.htmlWithToc()
        let dom = Markdown.makeDom(htmlWithToc)
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
        let dom = Markdown.makeDom(html)
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

export default Markdown