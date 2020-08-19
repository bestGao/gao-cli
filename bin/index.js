#!/usr/bin/env node

const { error } = require('./../packages/lib/util.js')

const currentNodeVersion = process.versions.node;
const major = currentNodeVersion.split('.')[0];

if (major < 14) {
  error(`You are running Node: ${currentNodeVersion} generate-api cli requires Node 14 or higher. \n请下载最新stable版的node.js`);
  process.exit(1);
}

require('../packages/init');
