'use strict';

const { chalkLog } = require('../lib/util')
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const { COPYFILE_EXCL } = fs.constants;
const originFileurl = path.join(__dirname, './../../template/simple.config.js')
const scriptUrl = path.join(process.cwd(), 'scripts')
const fileUrl = path.join(process.cwd(), 'scripts/generate-api.config.js')

try {
  const stat = fs.statSync(scriptUrl)
  if (stat.isDirectory()) {
    chalkLog('scripts目录存在')
    if (fs.existsSync(fileUrl)) {
      console.log('配置文件已存在');
    } else {
      chalkLog('scripts目录下generate-api.config.js不存在，在scripts目录下新建')
      console.log(originFileurl, fileUrl)
      fs.copyFileSync(originFileurl, fileUrl);
    }

  }
} catch (err) {
  chalkLog('scripts目录不存在，在根目录新建')
  fs.mkdirSync(scriptUrl)
  fs.copyFileSync(originFileurl, fileUrl);
}