// 运行代码
function run(target) {
  if (window.runner == undefined) {
    alert("在 APP 版本中才可以运行");
    return;
  }

  let resultCodeWrapper = target.previousElementSibling;
  let result = resultCodeWrapper.getElementsByTagName("code").item(0);

  if (target.innerHTML == "收起") {
    target.innerHTML = "运行";
    resultCodeWrapper.style.display = "none";
  } else {
    target.innerHTML = "运行中...";
    result.innerHTML = window.runner(
      target.attributes["data-code"].value,
      target.attributes["data-language"].textContent
    );
    resultCodeWrapper.style.display = "block";
    target.innerHTML = "收起";
  }
}
// 隐藏官方链接，在渲染开始时使用
function resetOfficialLink() {
  if (document.getElementsByClassName("official-link").item(0) != undefined) {
    let officialLinkPlaceholder = document.getElementsByClassName("official-link").item(0);
    officialLinkPlaceholder.setAttribute("href", "#");
    officialLinkPlaceholder.classList.add("hidden");
  }
}

// 砖块状的样式
for (let i = 0; i < document.getElementsByClassName("brick").length; i++) {
  let brick = document.getElementsByClassName("brick").item(i);
  brick.classList.add("bg-sky-500");
  brick.classList.add("dark:bg-sky-800");
  brick.classList.add("rounded");
  brick.classList.add("text-center");
  brick.classList.add("hover:scale-105");
  brick.classList.add("transition");
  brick.classList.add("duration-300");
  brick.classList.add("shadow-2xl");
}

// 红色砖块的样式
for (let i = 0; i < document.getElementsByClassName("brick-red").length; i++) {
  let brick = document.getElementsByClassName("brick-red").item(i);
  brick.classList.add("bg-red-500");
  brick.classList.add("dark:bg-red-800");
  brick.classList.add("rounded");
  brick.classList.add("text-center");
  brick.classList.add("hover:scale-105");
  brick.classList.add("transition");
  brick.classList.add("duration-300");
  brick.classList.add("shadow-2xl");
}

// 黄色砖块的样式
for (let i = 0; i < document.getElementsByClassName("brick-yellow").length; i++) {
  let brick = document.getElementsByClassName("brick-yellow").item(i);
  brick.classList.add("bg-yellow-500");
  brick.classList.add("dark:bg-yellow-800");
  brick.classList.add("rounded");
  brick.classList.add("text-center");
  brick.classList.add("hover:scale-105");
  brick.classList.add("transition");
  brick.classList.add("duration-300");
  brick.classList.add("shadow-2xl");
}

// 蓝绿色砖块的样式
for (let i = 0; i < document.getElementsByClassName("brick-cyan").length; i++) {
  let brick = document.getElementsByClassName("brick-cyan").item(i);
  brick.classList.add("bg-cyan-500");
  brick.classList.add("dark:bg-cyan-800");
  brick.classList.add("rounded");
  brick.classList.add("text-center");
  brick.classList.add("hover:scale-110");
  brick.classList.add("transition");
  brick.classList.add("duration-500");
  brick.classList.add("shadow-2xl");
}

// 蓝绿色背景的样式
for (let i = 0; i < document.getElementsByClassName("bg-cyan").length; i++) {
  let brick = document.getElementsByClassName("bg-cyan").item(i);
  brick.classList.add("bg-cyan-500/40");
  brick.classList.add("dark:bg-cyan-800/20");
  brick.classList.add("shadow");
}

// 天空色背景的样式
for (let i = 0; i < document.getElementsByClassName("bg-sky").length; i++) {
  let brick = document.getElementsByClassName("bg-sky").item(i);
  brick.classList.add("bg-sky-500");
  brick.classList.add("dark:bg-sky-800");
}

// 黄色背景的样式
for (let i = 0; i < document.getElementsByClassName("bg-yellow").length; i++) {
  let brick = document.getElementsByClassName("bg-yellow").item(i);
  brick.classList.add("bg-yellow-500");
  brick.classList.add("dark:bg-yellow-800");
}

// 提示横幅的样式
for (let i = 0; i < document.getElementsByClassName("banner").length; i++) {
  let banner = document.getElementsByClassName("banner").item(i);
  // 如果创建p元素会被.prose的样式影响
  let p = document.createElement("div");
  let text = banner.innerText;
  banner.classList.add("bg-gradient-to-r");
  banner.classList.add("from-cyan-800/30");
  banner.classList.add("rounded-xl");
  banner.classList.add("py-3");
  banner.classList.add("px-2");
  banner.classList.add("mb-8");
  banner.classList.add("flex");
  banner.classList.add("flex-row");
  banner.classList.add("gap-4");
  banner.classList.add("ring-1");
  banner.classList.add("justify-start");
  // banner.classList.add('shadow-xl')

  banner.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

  p.classList.add("my-0");
  p.classList.add("ml-1");
  p.innerText = text;

  banner.append(p);
}

// 警告横幅的样式
for (let i = 0; i < document.getElementsByClassName("warning").length; i++) {
  let banner = document.getElementsByClassName("warning").item(i);
  let p = document.createElement("p");
  let text = banner.innerText;
  banner.classList.add("bg-gradient-to-r");
  banner.classList.add("from-yellow-800/30");
  banner.classList.add("rounded-xl");
  banner.classList.add("py-3");
  banner.classList.add("px-2");
  banner.classList.add("mb-4");
  banner.classList.add("flex");
  banner.classList.add("flex-row");
  banner.classList.add("ring-1");
  banner.classList.add("justify-start");
  // banner.classList.add('shadow-xl')

  banner.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

  p.classList.add("my-0");
  p.classList.add("ml-1");
  p.innerText = text;

  banner.append(p);
}

// ask的样式
for (let i = 0; i < document.getElementsByClassName("ask").length; i++) {
  let banner = document.getElementsByClassName("ask").item(i);
  banner.classList.add("bg-sky-800/20");
  banner.classList.add("py-2", "px-2", "mb-4");
  banner.classList.add("flex", "flex-col", "gap-0");
  banner.classList.add("ring-1", "rounded-sm");
  // banner.classList.add('text-sm')
}

// 生成a标签
for (let i = 0; i < document.getElementsByClassName("link").length; i++) {
  let target = document.getElementsByClassName("link").item(i);
  let link = target.innerText;

  let div = document.createElement("div");
  div.innerHTML = '<a href="" target="_blank"></a>';

  let a = div.getElementsByTagName("a").item(0);
  a.innerText = link;
  a.href = link;

  target.innerHTML = div.innerHTML;
}

// window.Alpine.start();

window.customHTMLRenderer = {
  heading(node, context) {
    if (node.level == 1 && context.entering) {
      console.log("检测到entering H1，认为渲染开始，节点ID是", node.id, node.literal);
      resetOfficialLink();
    }

    return {
      type: context.entering ? "openTag" : "closeTag",
      tagName: "h" + node.level,
      classNames: [``],
    };
  },
  text(node, context) {
    // 渲染官方链接
    if (node.literal.includes("o:")) {
      let officialLinkPlaceholder = document.getElementsByClassName("official-link").item(0);
      officialLinkPlaceholder.href = node.literal.replace("o:", "");
      officialLinkPlaceholder.classList.remove("hidden");
    }

    // 清空当前的特殊占位符
    if (node.literal.includes("run:")) return { type: "text", content: "" };
    if (node.literal.includes("o:")) return { type: "text", content: "" };

    // 其他文字原样返回
    return context.origin();
  },
  codeBlock(node, context) {
    let origin = context.origin();
    let language = origin[1].attributes["data-language"];
    let code = origin[2].content;

    // 增加代码块的横幅
    // origin.splice(0, 0, {
    //   type: "html",
    //   content: `
    //     <div class="h-8 translate-y-16 text-yellow-500 px-2 bg-gradient-to-r from-transparent via-transparent to-cyan-500/20 text-end">${language}</div>
    //   `,
    // });

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
  },
};

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("run")) {
    run(event.target);
  }
});
