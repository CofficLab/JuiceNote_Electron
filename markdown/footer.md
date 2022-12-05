<div class="mt-24"></div>

<script>

// 砖块状的样式
for (i = 0;i<document.getElementsByClassName('brick').length;i++) {
    let brick = document.getElementsByClassName('brick').item(i)
    brick.classList.add('bg-sky-500')
    brick.classList.add('dark:bg-sky-800')
    brick.classList.add('rounded')
    brick.classList.add('text-center')
    brick.classList.add('hover:scale-105')
    brick.classList.add('transition')
    brick.classList.add('duration-300')
    brick.classList.add('shadow-2xl')
}

// 红色砖块的样式
for (i = 0;i<document.getElementsByClassName('brick-red').length;i++) {
    let brick = document.getElementsByClassName('brick-red').item(i)
    brick.classList.add('bg-red-500')
    brick.classList.add('dark:bg-red-800')
    brick.classList.add('rounded')
    brick.classList.add('text-center')
    brick.classList.add('hover:scale-105')
    brick.classList.add('transition')
    brick.classList.add('duration-300')
    brick.classList.add('shadow-2xl')
}

// 黄色砖块的样式
for (i = 0;i<document.getElementsByClassName('brick-yellow').length;i++) {
    let brick = document.getElementsByClassName('brick-yellow').item(i)
    brick.classList.add('bg-yellow-500')
    brick.classList.add('dark:bg-yellow-800')
    brick.classList.add('rounded')
    brick.classList.add('text-center')
    brick.classList.add('hover:scale-105')
    brick.classList.add('transition')
    brick.classList.add('duration-300')
    brick.classList.add('shadow-2xl')
}

// 蓝绿色砖块的样式
for (i = 0;i<document.getElementsByClassName('brick-cyan').length;i++) {
    let brick = document.getElementsByClassName('brick-cyan').item(i)
    brick.classList.add('bg-cyan-500')
    brick.classList.add('dark:bg-cyan-800')
    brick.classList.add('rounded')
    brick.classList.add('text-center')
    brick.classList.add('hover:scale-110')
    brick.classList.add('transition')
    brick.classList.add('duration-500')
    brick.classList.add('shadow-2xl')
}

// 蓝绿色背景的样式
for (i = 0;i<document.getElementsByClassName('bg-cyan').length;i++) {
    let brick = document.getElementsByClassName('bg-cyan').item(i)
    brick.classList.add('bg-cyan-500/40')
    brick.classList.add('dark:bg-cyan-800/20')
    brick.classList.add('shadow')
}

// 天空色背景的样式
for (i = 0;i<document.getElementsByClassName('bg-sky').length;i++) {
    let brick = document.getElementsByClassName('bg-sky').item(i)
    brick.classList.add('bg-sky-500')
    brick.classList.add('dark:bg-sky-800')
}

// 黄色背景的样式
for (i = 0;i<document.getElementsByClassName('bg-yellow').length;i++) {
    let brick = document.getElementsByClassName('bg-yellow').item(i)
    brick.classList.add('bg-yellow-500')
    brick.classList.add('dark:bg-yellow-800')
}

// 提示横幅的样式
for (i = 0; i< document.getElementsByClassName('banner').length; i++) {
    let banner = document.getElementsByClassName('banner').item(i)
    let p = document.createElement('p')
    let text = banner.innerText
    banner.classList.add('bg-gradient-to-r')
    banner.classList.add('from-cyan-800/30')
    banner.classList.add('rounded-xl')
    banner.classList.add('py-2')
    banner.classList.add('px-2')
    banner.classList.add('mb-4')
    banner.classList.add('flex')
    banner.classList.add('flex-row')
    banner.classList.add('justify-start')

    banner.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

    p.classList.add("my-0")
    p.classList.add("ml-1")
    p.innerText = text

    banner.append(p)
}

// 增加代码块的横幅
for (i = 0; i< document.getElementsByTagName('code').length; i++) {
    let banner = document.createElement('div')
    codeDom = document.getElementsByTagName('code').item(i)
    target = codeDom.parentElement
    language = findOutTheLanguage(codeDom.className)

    if (language != '') {
        codeDom.classList.add('pr-4');
        target.classList.add('pt-0')
        target.classList.add('lg:pt-0')
        target.classList.add('xl:pt-0')
        target.classList.add('2xl:pt-0')
        target.classList.add('pr-0')
        target.classList.add('lg:pr-0')
        target.classList.add('xl:pr-0')
        target.classList.add('2xl:pr-0')
        banner.innerHTML = language
        banner.classList.add('bg-gradient-to-r')
        banner.classList.add('from-transparent')
        banner.classList.add('via-transparent')
        banner.classList.add('to-cyan-500/20')
        banner.classList.add('px-2')
        banner.classList.add('text-end')
        banner.classList.add('text-gray-100/40')
        target.prepend(banner)
    }
}

// 生成代码运行相关的dom
if (window.runner != undefined) {
    for (i = 0; i< document.getElementsByClassName('run').length; i++) {
        let target = document.getElementsByClassName('run').item(i).nextElementSibling
        let runner = document.createElement('div')
        runner.classList.add('flex')
        runner.classList.add('flex-row')
        runner.classList.add('justify-end')
        runner.classList.add('gap-4')
        runner.classList.add('mt-4')
        runner.classList.add('mr-4')
        runner.innerHTML = '<pre><code><\/code><\/pre><button onclick=run(this)>运行</button>'
        let btn = runner.getElementsByTagName('button').item(0)
        let pre = runner.getElementsByTagName('pre').item(0)
        btn.classList.add('btn')
        btn.classList.add('ring')
        pre.classList.add('my-0')
        pre.classList.add('flex-grow')
        pre.classList.add('hidden')
        pre.classList.add('bg-base-content')
        pre.classList.add('dark:bg-base-100')
        btn.parentElement.classList.add("flex")
        btn.parentElement.classList.add('flex-row')
        btn.parentElement.classList.add('justify-end')
        btn.parentElement.classList.add('gap-4')

        target.append(runner)
    }
} else {
    for (i = 0; i< document.getElementsByClassName('run').length; i++) {
        let target = document.getElementsByClassName('run').item(i).nextElementSibling
        let runner = document.createElement('div')
        runner.classList.add('text-end')
        runner.classList.add('py-1')
        runner.classList.add('text-xs')
        runner.classList.add('text-gray-100/40')
        runner.classList.add('pr-2')
        runner.innerHTML = 'APP 版本支持运行代码'

        target.append(runner)
    }
}

// 运行代码
function run(target) {
    if (window.runner == undefined) {
        alert('在 APP 版本中才可以运行')
        return
    }

    if (target.innerHTML == '收起') {
        target.innerHTML = '运行'
        target.parentElement.getElementsByTagName('pre').item(0).style.display = 'none'
    } else {
        target.innerHTML = '运行中...'
        codeDom = target.parentElement.parentElement.getElementsByTagName('code').item(0)
        language = findOutTheLanguage(codeDom.className)
        result = window.runner(codeDom.innerText,language)
        target.parentElement.getElementsByTagName('code').item(0).innerHTML = result
        target.parentElement.getElementsByTagName('pre').item(0).style.display = 'block'
        target.innerHTML = '收起'
    }
}

function findOutTheLanguage(className) {
    console.log('find out the language,class name is',className)
    language = ''

    if (className.includes('language-python3') || className.includes('language-Python3') || className.includes('language-python')) {
        language = 'python'
    }

    if (className.includes('language-php')) {
        language = 'php'
    }

    if (className.includes('language-java')) {
        language = 'java'
    }

    if (className.includes('language-sh')) {
        language = 'sh'
    }

    if (className.includes('language-go') || className.includes('language-golang')) {
        language = 'go'
    }

    if (className.includes('language-js') || className.includes('language-javascript')) {
        language = 'javascript'
    }
    
    return language
}

window.Alpine.start()
</script>
