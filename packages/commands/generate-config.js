'use strict';

const { isOverride } = require('./../init')
const { chalkLog, error } = require('../lib/util')
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises
const originFileurl = path.join(__dirname, './../../template/simple.config.js')
const scriptUrl = path.join(process.cwd(), 'scripts')
const fileUrl = path.join(process.cwd(), 'scripts/generate-api.config.js')

fsPromises.access(scriptUrl, fs.constants.F_OK).then(() => {
  chalkLog('scripts目录已存在\n')
  fsPromises.access(fileUrl, fs.constants.F_OK).then(() => {
    if (isOverride) {
      copyFile(isOverride)
    } else {
      chalkLog('配置文件已存在')
    }
  }).catch(err => {
    chalkLog('查找配置文件失败\n')
    genConfig('file')
  })
}).catch((err) => {
  chalkLog('查找目录scripts失败\n')
  genConfig('all')
})

function copyFile(isEnforce = false) {
  fsPromises.copyFile(originFileurl, fileUrl).then(() => {
    chalkLog(`${isEnforce ? '强制' : ''}生成配置文件\n`)
  }).catch(err => {
    chalkLog('复制文件报错')
  })
}

function genFolder(callback = () => { }) {
  fsPromises.mkdir(scriptUrl, { recursive: true }).then(() => {
    chalkLog('自动生成/scripts目录\n')
    if (callback) { callback() }
  }).catch(err => {
    console.log('创建目录scripts失败：', err)
  })
}

function genConfig(type = 'all') {
  if (type === 'file') {
    copyFile()
  } else if (type === 'all') {
    genFolder(copyFile)
  }
  else {
    process.exit('退出init')
  }
}