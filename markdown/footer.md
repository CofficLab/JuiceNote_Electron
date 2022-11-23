<script>

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
        btn.parentElement.classList.add("flex")
        btn.parentElement.classList.add('flex-row')
        btn.parentElement.classList.add('justify-end')
        btn.parentElement.classList.add('gap-4')

        target.append(runner)
    }
}

function run(target) {
    if (window.runner == undefined) {
        alert('在 APP 版本中才可以运行')
        return
    }

    if (target.innerHTML == '收起') {
        target.innerHTML = '运行'
        target.parentElement.getElementsByTagName('pre').item(0).style.display = 'none'
    } else {
        target.innerHTML = '收起'
        code = target.parentElement.parentElement.getElementsByTagName('code').item(0).innerText
        result = window.runner(code,'python')
        target.parentElement.getElementsByTagName('code').item(0).innerHTML = result
        target.parentElement.getElementsByTagName('pre').item(0).style.display = 'block'
    }
}
</script>
