<div class="mt-24"></div>

<script>

// 砖块状的样式
for (i = 0;i<document.getElementsByClassName('brick').length;i++) {
    let brick = document.getElementsByClassName('brick').item(i)
    brick.classList.add('bg-sky-500')
    brick.classList.add('dark:bg-sky-800')
    brick.classList.add('rounded')
    brick.classList.add('text-center')
    brick.classList.add('hover:scale-110')
    brick.classList.add('transition')
    brick.classList.add('duration-500')
}

// 红色砖块的样式
for (i = 0;i<document.getElementsByClassName('brick-red').length;i++) {
    let brick = document.getElementsByClassName('brick-red').item(i)
    brick.classList.add('bg-red-500')
    brick.classList.add('dark:bg-red-800')
    brick.classList.add('rounded')
    brick.classList.add('text-center')
    brick.classList.add('hover:scale-110')
    brick.classList.add('transition')
    brick.classList.add('duration-500')
}

// 黄色砖块的样式
for (i = 0;i<document.getElementsByClassName('brick-yellow').length;i++) {
    let brick = document.getElementsByClassName('brick-yellow').item(i)
    brick.classList.add('bg-yellow-500')
    brick.classList.add('dark:bg-yellow-800')
    brick.classList.add('rounded')
    brick.classList.add('text-center')
    brick.classList.add('hover:scale-110')
    brick.classList.add('transition')
    brick.classList.add('duration-500')
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
}

// 蓝绿色背景的样式
for (i = 0;i<document.getElementsByClassName('bg-cyan').length;i++) {
    let brick = document.getElementsByClassName('bg-cyan').item(i)
    brick.classList.add('bg-cyan-200/60')
    brick.classList.add('dark:bg-cyan-800')
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

    if (className.includes('language-python3') || className.includes('language-Python3')) {
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
