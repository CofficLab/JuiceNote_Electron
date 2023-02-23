// 砖块状的样式
for (i = 0; i < document.getElementsByClassName("brick").length; i++) {
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
for (i = 0; i < document.getElementsByClassName("brick-red").length; i++) {
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
for (i = 0; i < document.getElementsByClassName("brick-yellow").length; i++) {
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
for (i = 0; i < document.getElementsByClassName("brick-cyan").length; i++) {
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
for (i = 0; i < document.getElementsByClassName("bg-cyan").length; i++) {
  let brick = document.getElementsByClassName("bg-cyan").item(i);
  brick.classList.add("bg-cyan-500/40");
  brick.classList.add("dark:bg-cyan-800/20");
  brick.classList.add("shadow");
}

// 天空色背景的样式
for (i = 0; i < document.getElementsByClassName("bg-sky").length; i++) {
  let brick = document.getElementsByClassName("bg-sky").item(i);
  brick.classList.add("bg-sky-500");
  brick.classList.add("dark:bg-sky-800");
}

// 黄色背景的样式
for (i = 0; i < document.getElementsByClassName("bg-yellow").length; i++) {
  let brick = document.getElementsByClassName("bg-yellow").item(i);
  brick.classList.add("bg-yellow-500");
  brick.classList.add("dark:bg-yellow-800");
}

// 提示横幅的样式
for (i = 0; i < document.getElementsByClassName("banner").length; i++) {
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
for (i = 0; i < document.getElementsByClassName("warning").length; i++) {
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
for (i = 0; i < document.getElementsByClassName("ask").length; i++) {
  let banner = document.getElementsByClassName("ask").item(i);
  banner.classList.add("bg-sky-800/20");
  banner.classList.add("py-2", "px-2", "mb-4");
  banner.classList.add("flex", "flex-col", "gap-0");
  banner.classList.add("ring-1", "rounded-sm");
  // banner.classList.add('text-sm')
}

// 生成a标签
for (i = 0; i < document.getElementsByClassName("link").length; i++) {
  let target = document.getElementsByClassName("link").item(i);
  let link = target.innerText;

  let div = document.createElement("div");
  div.innerHTML = '<a href="" target="_blank"></a>';

  let a = div.getElementsByTagName("a").item(0);
  a.innerText = link;
  a.href = link;

  target.innerHTML = div.innerHTML;
}

// 生成官方文档的链接
if (document.getElementsByClassName("official-link").item(0) != undefined) {
  let officialLinkPlaceholder = document.getElementsByClassName("official-link").item(0);
  officialLinkPlaceholder.href = "";
  officialLinkPlaceholder.classList.add("hidden");

  for (i = 0; i < document.getElementsByClassName("o").length; i++) {
    let target = document.getElementsByClassName("o").item(i);
    let link = document.createElement("a");
    let href = target.innerText;

    target.innerHTML = "";

    officialLinkPlaceholder.href = href;
    officialLinkPlaceholder.classList.remove("hidden");
  }
} else {
  // 没有预定义位置时，自动生成样式
  for (i = 0; i < document.getElementsByClassName("o").length; i++) {
    let target = document.getElementsByClassName("o").item(i);
    let link = document.createElement("a");
    let href = target.innerText;

    target.innerHTML = "";
    target.classList.add("w-full", "flex", "mb-2", "text-center");

    link.innerHTML = "官方文档";
    link.target = "_blank";
    link.href = href;
    link.classList.add("no-underline", "text-base");
    link.classList.add("px-4", "py-2", "w-full");
    // link.classList.add('shadow-lg')
    link.classList.add("ring-1", "border-t-8", "border-yellow-900/50", "rounded-sm");
    link.classList.add("bg-cyan-500/50", "dark:bg-cyan-900/70");

    target.append(link);
  }
}

// 增加代码块的横幅
for (i = 0; i < document.getElementsByTagName("code").length; i++) {
  let banner = document.createElement("div");
  let bannerClass = "code-banner";
  codeDom = document.getElementsByTagName("code").item(i);
  target = codeDom.parentElement;
  language = findOutTheLanguage(codeDom.className);

  if (language != "" && target.getElementsByClassName(bannerClass).length == 0) {
    codeDom.classList.add("pr-4");
    target.classList.add("pt-0");
    target.classList.add("lg:pt-0", "xl:pt-0", "2xl:pt-0");
    target.classList.add("pr-0", "lg:pr-0", "xl:pr-0", "2xl:pr-0");
    banner.innerHTML = language;
    banner.classList.add(bannerClass);
    banner.classList.add("bg-gradient-to-r", "from-transparent", "via-transparent", "to-cyan-500/20");
    banner.classList.add("px-2", "rounded-none");
    banner.classList.add("text-end");
    banner.classList.add("text-gray-100/40");
    target.prepend(banner);
  }
}

// 生成代码运行相关的dom
if (window.runner != undefined) {
  for (i = 0; i < document.getElementsByClassName("run").length; i++) {
    let target = document.getElementsByClassName("run").item(i).nextElementSibling;
    let runner = document.createElement("div");
    let runnerClass = "code-runner";
    // target.classList.add('w-full')
    // target.classList.add('ring-1')
    runner.classList.add(runnerClass);
    runner.classList.add("flex");
    runner.classList.add("flex-row");
    runner.classList.add("justify-end");
    runner.classList.add("gap-4");
    runner.classList.add("mt-4");
    runner.classList.add("mr-4");
    runner.innerHTML = "<pre><code></code></pre><button onclick=run(this)>运行</button>";
    let btn = runner.getElementsByTagName("button").item(0);
    let pre = runner.getElementsByTagName("pre").item(0);
    btn.classList.add("btn");
    btn.classList.add("ring");
    pre.classList.add("my-0");
    pre.classList.add("flex-grow");
    pre.classList.add("hidden");
    pre.classList.add("bg-base-content");
    pre.classList.add("dark:bg-base-100");
    btn.parentElement.classList.add("flex");
    btn.parentElement.classList.add("flex-row");
    btn.parentElement.classList.add("justify-end");
    btn.parentElement.classList.add("gap-4");

    if (target.getElementsByClassName(runnerClass).length == 0) target.append(runner);
  }
} else {
  for (i = 0; i < document.getElementsByClassName("run").length; i++) {
    let target = document.getElementsByClassName("run").item(i).nextElementSibling;
    let runner = document.createElement("div");
    runner.classList.add("text-end");
    runner.classList.add("py-1");
    runner.classList.add("text-xs");
    runner.classList.add("text-gray-100/40");
    runner.classList.add("pr-2");
    runner.innerHTML = "APP 版本支持运行代码";

    target.append(runner);
  }
}

// 返回课程的平台，可能是网页或者桌面APP
function getPlatform() {
  if (window.runner == undefined) {
    return "WEB";
  }

  return "APP";
}

// 运行代码
function run(target) {
  if (window.runner == undefined) {
    alert("在 APP 版本中才可以运行");
    return;
  }

  if (target.innerHTML == "收起") {
    target.innerHTML = "运行";
    target.parentElement.getElementsByTagName("pre").item(0).style.display = "none";
  } else {
    target.innerHTML = "运行中...";
    codeDom = target.parentElement.parentElement.getElementsByTagName("code").item(0);
    language = findOutTheLanguage(codeDom.className);
    result = window.runner(codeDom.innerText, language);
    target.parentElement.getElementsByTagName("code").item(0).innerHTML = result;
    target.parentElement.getElementsByTagName("pre").item(0).style.display = "block";
    target.innerHTML = "收起";
  }
}

function findOutTheLanguage(className) {
  // console.log('find out the language,class name is',className)
  language = "";

  if (
    className.includes("language-python3") ||
    className.includes("language-Python3") ||
    className.includes("language-python")
  ) {
    language = "Python";
  }

  if (className.includes("language-php")) {
    language = "PHP";
  }

  if (className.includes("language-java")) {
    language = "Java";
  }

  if (className.includes("language-sh")) {
    language = "Shell";
  }

  if (className.includes("language-go") || className.includes("language-golang")) {
    language = "Golang";
  }

  if (
    className.includes("language-js") ||
    className.includes("language-JavaScript") ||
    className.includes("language-javaScript") ||
    className.includes("language-javascript")
  ) {
    language = "JavaScript";
  }

  return language;
}

window.Alpine.start();
