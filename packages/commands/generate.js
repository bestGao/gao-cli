const { chalkLog } = require('./../lib/util')
const axios = require('axios')
const { exec } = require('child_process')
const path = require('path');
const fs = require('fs')
const ora = require('ora')
const importFileUrl = path.join(process.cwd(), 'scripts/generate-api.config.js')
const { generateType } = require('./../init')
const jarUrl = path.join(__dirname, '../../node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator.jar')
const genFolder = path.join(process.cwd(), './src/typings')

const spinner = ora('gao-cli').start();

setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = '正在生成';
}, 1000);

fs.access(importFileUrl, fs.constants.F_OK, err => {
    if (err) {
        chalkLog('请先执行 gao-cli init')
        // process.exit(0)
    } else {
        // fs.access(genFolder, fs.constants.F_OK, err => {
        //     if (err) {
        //         fs.mkdir(genFolder, { recursive: true }, err => {
        //             if (err) {
        //                 chalkLog(`access ${genFolder} error occurred`)
        //              } else { gen() }
        //         })
        //     } else {
        //         gen()
        //     }
        // })
        gen()
    }
})

function gen() {
    spinner.start()
    const { APIGROUP } = require(importFileUrl)
    const url = APIGROUP[0]
    console.log(genFolder)
    exec(`java -jar ${jarUrl} generate -g typescript-axios --skip-validate-spec -i "${url}" -o "${genFolder}"`, { encoding: 'utf8' }, (error, stdout, stderr) => {
        chalkLog(`生成代码出错：${error}`)
        spinner.stop()
        process.exit()
    })
    // spinner.stop()
}
// try {
//     const stat = fs.statSync(genFolder)
//     if (stat.isDirectory()) {
//         chalkLog('scripts目录存在\n')
//         chalkLog('执行')
//         exec(`java -jar ${jarUrl} generate -g typescript-axios --skip-validate-spec -i ${url} -o "${genFolder}"`, { encoding: 'utf8' }, (error, stdout, stderr) => {
//             chalkLog(error, stdout, stderr)
//         })
//         return false
//     } else {
//         fs.mkdirSync(genFolder)
//         chalkLog('新建typings目录\n')
//     }
//     const { APIGROUP } = require(importFileUrl)
//     const url = APIGROUP[0]
//     // APIGROUP.for()

//     // process.exit()
//     return
// } catch (err) {
//     chalkLog('获取typings目录报错: \n', err)
//     // fs.mkdirSync(genFolder)
//     // process.exit()
// }