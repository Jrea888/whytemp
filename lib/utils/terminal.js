/*
 * @Description:
 * @Author: zhangweigang
 * @Date: 2021-07-23 11:41:03
 * @LastEditTime: 2021-07-23 14:21:39
 * @LastEditors: zhangweigang
 */
const { spawn } = require('child_process');

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    // 流中的管道将信息打印出来
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    // 这里的命令执行完成之后，回到第三部继续执行 npm run serve
    childProcess.on('close', () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn
};
