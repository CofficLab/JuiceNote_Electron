import fs from 'fs'
import path from 'path'


let code_runner = function (code = '', language = 'PHP') {
    let suffix = 'unknown'
    switch (language) {
        case 'PHP':
        case 'php':
            suffix = 'php'
            break;

        case 'python':
            suffix = 'py'
            break;

        case 'java':
            suffix = 'java'
            break;
        case 'sh':
        case 'bash':
            suffix = 'sh'
            break;

        default:
            return '未识别编程语言：' + language
    }

    // 确定文件内容
    let content = code
    if (suffix == 'php') content = "<?php \r\n" + content

    // 写入临时文件
    let tmpFilePath = path.join(process.cwd(), 'tmp.' + suffix)
    fs.writeFileSync(tmpFilePath, content)

    console.log('language is', language, 'code is')
    console.log(fs.readFileSync(tmpFilePath).toString())

    // 执行文件
    let execSync = require("child_process").execSync;
    let output = ''
    switch (suffix) {
        case 'php':
            output = execSync("php " + tmpFilePath);
            break;
        case 'py':
            try {
                output = execSync("python3 " + tmpFilePath);
            } catch (err) {
                output = err.message.trim()
            }
            break;
        case 'java':
            try {
                output = execSync("java " + tmpFilePath);
            } catch (err) {
                output = err.message.trim()
            }
            break;
        case 'sh':
            try {
                output = execSync("sh " + tmpFilePath);
            } catch (err) {
                output = err.message.trim()
            }
            break;
        default:
            output = '缺少' + suffix + '的解析器'
    }

    return output.toString()
}

let shell_runner = function (code = '') {
    console.log('code is')
    console.log(code)

    // 写入临时文件
    let tmpFilePath = path.join(process.cwd(), 'tmp.sh')
    fs.writeFileSync(tmpFilePath, code)

    // 执行文件
    let execSync = require("child_process").execSync;
    let output = ''

    try {
        output = execSync("sh " + tmpFilePath);
    } catch (err) {
        output = err.message.trim()
    }

    return output.toString()
}

export default {
    code_runner,
    shell_runner
}