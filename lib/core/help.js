/*
 * @Description:
 * @Author: zhangweigang
 * @Date: 2021-07-23 09:07:10
 * @LastEditTime: 2021-07-23 09:12:27
 * @LastEditors: zhangweigang
 */
const program = require('commander');
const helpOptions = () => {
  // options 属性
  program.option('-w --why', 'a why cli');
  program.option('-d --dest <dest>', 'a destination folder,例如:-d /src/components');

  // 监听--help执行完后
  program.on('--help', function () {
    console.log('');
    console.log('other');
    console.log('   why --version');
    console.log('   why --dest');
  });
};

module.exports = helpOptions;
