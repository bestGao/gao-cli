const { chalkLog } = require("./../lib/util");
const axios = require("axios");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const ora = require("ora");
const importFileUrl = path.join(
  process.cwd(),
  "scripts/generate-api.config.js"
);
const { generateType } = require("./../init");
const jarUrl = path.join(
  __dirname,
  "../../node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator.jar"
);
const genFolder = path.join(process.cwd(), "./src/typings");

const spinner = ora("gao-cli").start();

setTimeout(() => {
  spinner.color = "yellow";
  spinner.text = "正在生成";
}, 1000);

fs.access(importFileUrl, fs.constants.F_OK, (err) => {
  if (err) {
    chalkLog("请先执行 gao-cli init");
    process.exit();
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
    gen();
  }
});

function gen() {
  const id = 355;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUzLCJpYXQiOjE1OTkxODI2NTksImV4cCI6MTU5OTc4NzQ1OX0.vbTCb11LKXx_dzqX1eFdRo0l27uldpO_ftVHCFao5Vc";
  const url = `http://121.37.134.143:13000/api/interface/get/?id=${id}&token=${token}`;
  spinner.start();
  // const { APIGROUP } = require(importFileUrl);
  // const url = APIGROUP[0];
  const fullCookie = `_yapi_uid=53;_yapi_token=${token}`;
  exec(`curl -b ${fullCookie} ${url}`, (error, stdout, stderr) => {
    console.log(stdout)
    spinner.stop();
    process.exit();
  });
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
