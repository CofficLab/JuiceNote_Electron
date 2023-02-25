import hljs from 'highlight.js/lib/core';
import { CustomHTMLRenderer, HTMLMdNode, MdLikeNode, HTMLMdNodeConvertor } from "@toast-ui/editor/types";
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/github-dark.css'
import { Context, HeadingMdNode, HTMLConvertor, HTMLToken, MdNode } from '@toast-ui/editor/types/toastmark';
import { NodeInfo, ToMdConvertor, ToMdConvertorContext, ToMdConvertorReturnValues } from '@toast-ui/editor/types/convertor';
import { NodeViewPropMap } from '@toast-ui/editor/types/plugin';
import { NodeRangeInfo } from '@toast-ui/editor/types/editor';
import { MdContext } from '@toast-ui/editor/types/spec';
// import 'highlight.js/styles/github-dark-dimmed.css'

// 隐藏官方链接，在渲染开始时使用
function resetOfficialLink() {
    let officialLinkPlaceholder = document.getElementsByClassName("official-link").item(0);
    if (officialLinkPlaceholder != undefined) {
        officialLinkPlaceholder.setAttribute("href", "#");
        officialLinkPlaceholder.classList.add("hidden");
    }
}

let Render: CustomHTMLRenderer = {
    heading(node: MdLikeNode, context): HTMLToken {
        if (node.level == 1 && context.entering) {
            console.log("检测到entering H1，认为渲染开始", node.literal);
            resetOfficialLink();
        }

        return {
            type: context.entering ? "openTag" : "closeTag",
            tagName: "h" + node.level,
            classNames: [``],
        };
    },

    text(node: MdLikeNode, context: ToMdConvertorContext): ToMdConvertorReturnValues {
        // 渲染官方链接
        let officialLinkPlaceholder = document.getElementsByClassName("official-link").item(0);
        if (node.literal?.includes("o:") && officialLinkPlaceholder != undefined) {
            officialLinkPlaceholder.setAttribute('href', node.literal.replace("o:", ""));
            officialLinkPlaceholder.classList.remove("hidden");
        }

        // 清空当前的特殊占位符
        if (node.literal?.includes("run:")) return { type: "text", content: "" };
        if (node.literal?.includes("o:")) return { type: "text", content: "" };

        if (context == undefined || context == null) {
            return {}
        }

        // 其他文字原样返回
        return context.origin();
    },

    codeBlock(node, context) {
        console.log('渲染codeBlock')
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

        // 增加代码块的横幅
        //     origin.splice(0, 0, {
        //         type: "html",
        //         content: `
        //     <div class="h-8 translate-y-16 text-yellow-500 px-2 bg-gradient-to-r from-transparent via-transparent to-cyan-500/20 text-end">${language}</div>
        //   `,
        //     });

        // 不提供runner，增加提示文字
        if (!Object.hasOwn(window, 'runner')) {
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