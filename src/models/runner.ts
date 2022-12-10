import fs from 'fs'
import path from 'path'
import electron from 'electron'

let code_runner = function (code = '', language = 'PHP') {
    let suffix = 'unknown'
    switch (language) {
        case 'PHP':
        case 'php':
            suffix = 'php'
            break;

        case 'python':
        case 'Python':
            suffix = 'py'
            break;

        case 'java':
        case 'Java':
            suffix = 'java'
            break;

        case 'js':
        case 'javascript':
        case 'javaScript':
        case 'JavaScript':
            suffix = 'js'
            break;

        case 'go':
        case 'Go':
        case 'Golang':
            suffix = 'go'
            break;

        case 'sh':
        case 'shell':
        case 'Shell':
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
    let tmpFilePath = path.join(electron.ipcRenderer.sendSync('get-app-path'), 'temp', 'tmp.' + suffix)
    fs.writeFileSync(tmpFilePath, content)

    console.log('language is', language, 'code is')
    console.log(fs.readFileSync(tmpFilePath).toString())

    // 执行文件
    let execSync = require("child_process").execSync;
    let exec = require("child_process").exec
    let output = ''
    let envPath = 'PATH=/opt/homebrew/bin/:/usr/local/bin:$PATH'
    switch (suffix) {
        case 'php':
            try {
                output = execSync(envPath + " && php " + tmpFilePath);
            } catch (err) {
                output = err.message
            }
            break;
        case 'py':
            try {
                output = execSync(envPath + " && python3 " + tmpFilePath);
            } catch (err) {
                output = err.message.trim()
            }
            break;
        case 'java':
            try {
                output = execSync(envPath + " && java " + tmpFilePath);
            } catch (err) {
                output = err.message.trim()
            }
            break;
        case 'js':
            try {
                output = execSync(envPath + " && node " + tmpFilePath);
            } catch (err) {
                output = err.message.trim()
            }
            break;
        case 'sh':
            try {
                output = execSync(envPath + " && sh " + tmpFilePath);
            } catch (err) {
                output = err.message.trim()
            }
            break;

        case 'go':
            try {
                output = execSync(envPath + " && go run " + tmpFilePath);
            } catch (err) {
                output = err.message.trim()
            }
            break;
        default:
            output = '缺少' + suffix + '的解析器'
    }

    return output.toString()
}

export default {
    code_runner
}