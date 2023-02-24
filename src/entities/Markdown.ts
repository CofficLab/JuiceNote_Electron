import fs from "fs"
import hljs from 'highlight.js'

class Markdown {
    public absoluteFilePath: string = ''
    private static md = require('markdown-it')({
        html: true,
    })

    static renderErrorPage(title: string, lines?: string[]): string {
        title = '## ' + title
        let linesAsString = lines == undefined ? '' : lines.map(line => {
            return '### ' + line
        }).join("\n")

        return Markdown.md.render(title + "\n" + linesAsString)
    }

    public constructor(absoluteFilePath: string) {
        if (!fs.existsSync(absoluteFilePath)) {
            throw '要初始化的markdown文件「' + absoluteFilePath + '」不存在'
        }

        this.absoluteFilePath = absoluteFilePath
    }

    public content(): string {
        return fs.readFileSync(this.absoluteFilePath, 'utf-8')
    }

    // 获取markdown渲染后的HTML
    public html() {
        if (!fs.existsSync(this.absoluteFilePath)) {
            return Markdown.md.render("## 文件「" + this.absoluteFilePath + "」不存在")
        }

        return Markdown.md.render(this.content())
    }

    // 获取markdown渲染后的HTML，带TOC
    public htmlWithToc() {
        if (!fs.existsSync(this.absoluteFilePath)) {
            return Markdown.md.render("## 文件「" + this.absoluteFilePath + "」不存在")
        }

        return Markdown.md.render("[[toc]] \r\n" + this.content())
    }

    public toc(): string {
        let htmlWithToc = this.htmlWithToc()

        return Markdown.getTocFromHtml(htmlWithToc)
    }

    // 获取markdown渲染后的HTML的标题
    public getTitle(): string {
        let html = this.htmlWithToc()
        let dom = Markdown.makeDom(html)
        let titleDom = dom.getElementsByTagName('h1')[0]

        return titleDom ? titleDom.innerText : ''
    }

    // 更新源文件
    public update(content: string) {
        fs.writeFileSync(this.absoluteFilePath, content)
    }

    static renderWithToc(sourceCode: string): string {
        return Markdown.md.render("[[toc]] \r\n" + sourceCode)
    }

    static renderWithoutToc(sourceCode: string): string {
        return Markdown.md.render(sourceCode)
    }

    static renderToc(sourceCode: string): string {
        let html = Markdown.renderWithToc(sourceCode)
        let toc = Markdown.getTocFromHtml(html)

        return toc
    }

    private static getTocFromHtml(html: string): string {
        let dom = Markdown.makeDom(html)
        let toc = dom.getElementsByClassName('table-of-contents')[0]

        if (toc == undefined) return ''

        let tocWithoutTitle = toc.getElementsByTagName('ul')[0].getElementsByTagName('ul')[0]

        return tocWithoutTitle ? tocWithoutTitle.outerHTML : ''
    }

    // 创建DOM元素
    private static makeDom(html: string): HTMLDivElement {
        let dom = document.createElement('div')
        dom.innerHTML = html

        return dom
    }
}

export default Markdown