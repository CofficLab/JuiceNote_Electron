import hljs from 'highlight.js/lib/core';
import { CustomHTMLRenderer, HTMLMdNode, MdLikeNode } from "@toast-ui/editor/types";
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/github-dark.css'
// import 'highlight.js/styles/github-dark-dimmed.css'

let Render: CustomHTMLRenderer = {
    heading(node, context): object {
        if (node.level == 1 && context.entering) {
            console.log("检测到entering H1，认为渲染开始，节点ID是", node.id, node.literal);
            // resetOfficialLink();
        }

        return {
            type: context.entering ? "openTag" : "closeTag",
            tagName: "h" + node.level,
            classNames: [``],
        };
    },

    text(node, context) {
        // 渲染官方链接
        let officialLinkPlaceholder = document.getElementsByClassName("official-link").item(0);
        if (node.literal.includes("o:") && officialLinkPlaceholder != undefined) {
            officialLinkPlaceholder.setAttribute('href', node.literal.replace("o:", ""));
            officialLinkPlaceholder.classList.remove("hidden");
        }

        // 清空当前的特殊占位符
        if (node.literal.includes("run:")) return { type: "text", content: "" };
        if (node.literal.includes("o:")) return { type: "text", content: "" };

        // 其他文字原样返回
        return context.origin();
    },

    codeBlock(node: TuiNode, context: TuiContext) {
        let origin = context.origin();
        let language = origin[1].attributes["data-language"];
        let code = origin[2].content;

        // 代码高亮
        let el = document.createElement("div");
        el.innerHTML = origin[2].content;
        el.innerHTML = hljs.highlightAuto(origin[2].content).value;

        // 增加行号
        // lineNumbersBlock(el);

        // 写回
        origin[2] = {
            type: "html",
            content: el.innerHTML,
        };

        console.log(origin)

        // 增加代码块的横幅
        //     origin.splice(0, 0, {
        //         type: "html",
        //         content: `
        //     <div class="h-8 translate-y-16 text-yellow-500 px-2 bg-gradient-to-r from-transparent via-transparent to-cyan-500/20 text-end">${language}</div>
        //   `,
        //     });

        // 不提供runner，增加提示文字
        if (window.runner == undefined) {
            origin.splice(5, 0, {
                type: "html",
                content: `
            <div class='flex text-end mt-0 text-sm'>APP版本支持运行代码</div>
          `,
            });
        }

        // 提供runner且上一个节点是运行标记：run:
        if (node.prev.firstChild?.literal == "run:") {
            origin.splice(6, 0, {
                type: "html",
                content: `
            <div class='flex flex-row mt-0 justify-end gap-4 -translate-y-14'>
              <pre class='bg-base-content ring my-0 px-1 hidden flex-grow'><code></code></pre>
              <div class='btn ring run mt-8' data-language='${language}' data-code='${code}'>运行</div>
            </div>
          `,
            });
        }

        return origin;
    }
}

export default Render