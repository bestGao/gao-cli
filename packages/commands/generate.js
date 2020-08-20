const { chalkLog } = require('./../lib/util')
const axios = require('axios')
const child_process = require('child_process')
const path = require('path');
const fs = require('fs')
const shelljs = require('shelljs');
const importFileUrl = path.join(process.cwd(), 'scripts/generate-api.config.js')
const { generateType } = require('./../init')
const jarUrl = path.join(__dirname, '../../node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator.jar')
const genFolder = path.join(process.cwd(), './typings')

try {
    const stat = fs.statSync(genFolder)
    if (stat.isDirectory()) {
        chalkLog('scripts目录存在\n')
    } else {
        fs.mkdirSync(genFolder)
        chalkLog('新建typings目录\n')
    }
    const { APIGROUP } = require(importFileUrl)
    const url = APIGROUP[0]
    // APIGROUP.for()
    child_process.exec(`java -jar ${jarUrl} generate -g typescript-axios --skip-validate-spec -i ${url} -o "${genFolder}"`, { encoding: 'utf8' })
    process.exit()
} catch (err) {
    chalkLog('获取typings目录报错\n')
    fs.mkdirSync(genFolder)
    process.exit(0)
}