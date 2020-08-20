'use strict';
const { isOverride } = require('./../init')
const { chalkLog, error } = require('../lib/util')
const path = require('path');
const fs = require('fs');
const originFileurl = path.join(__dirname, './../../template/simple.config.js')
const scriptUrl = path.join(process.cwd(), 'scripts')
const fileUrl = path.join(process.cwd(), 'scripts/generate-api.config.js')

try {
  const stat = fs.statSync(scriptUrl)
  if (stat.isDirectory()) {
    chalkLog('scripts目录存在\n')
    try {
      if (fs.existsSync(fileUrl)) {
        chalkLog('配置文件已存在\n');
        if (isOverride) {
          fs.copyFileSync(originFileurl, fileUrl);
          chalkLog('强制生成配置文件\n')
        }
        process.exit()
      } else {
        chalkLog('scripts目录下generate-api.config.js不存在，在scripts目录下新建\n')
        fs.copyFileSync(originFileurl, fileUrl);
      }
    } catch (err) {
      error('文件报错\n')
      console.log(err)
    }
    process.exit()
  }
} catch (err) {
  chalkLog('scripts目录报错\n')
  fs.mkdirSync(scriptUrl)
  fs.copyFileSync(originFileurl, fileUrl);
}