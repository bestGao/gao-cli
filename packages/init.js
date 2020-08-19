const { program } = require('commander');
const { chalkLog } = require('./lib/util');
const { version: curVersion } = require('../package.json')

function programInit() {
  program.version(curVersion, '-V, --version', '打印版本号');
  program.command('init').description('生成接口地址配置文件模板').action(() => {
    chalkLog('生成接口地址配置文件模板到/scripts/')
    require('./commands/generate-api.config')
  })
  // program
  //   .command('init')
  //   .description(
  //     '生成配置文件genConfig.js 默认添加到scripts/'
  //   )
  //   .action(require('./commands/simple-config.js'))
  //   .on('--help', () => {
  //     log('默认读取scripts/下的genConfig.js');
  //   });

  // program
  //   .command('add-component [name]')
  //   .description(
  //     '新增一个通用组件，默认加在./src/components 或者 .src/component目录， \n 支持创建多级目录，例如：demo/test/header \n使用时，支持 fc-vue add-component 【回车】 来选择输入信息'
  //   )
  //   .option('-s, --simple', '创建简单版的页面，只新增一个.vue文件')
  //   .action(require('./commands/add-component'))
  //   .on('--help', () => {
  //     log('支持 fc-vue add-component 【回车】 来选择输入信息');
  //   });
  program.parse(process.argv);
}

programInit();
