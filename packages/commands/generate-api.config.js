'use strict';

const { chalkLog } = require('./../lib/util')
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

const stat = fs.accessSync(path.join(process.cwd(), 'scripts'))
if (stat.isDirectory()) {
  chalkLog('scripts目录存在')
} else {
  chalkLog('scripts目录不存在，我要新建')
}