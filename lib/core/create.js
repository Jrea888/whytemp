/*
 * @Description:
 * @Author: zhangweigang
 * @Date: 2021-07-23 09:23:01
 * @LastEditTime: 2021-08-17 09:00:51
 * @LastEditors: zhangweigang
 */
const program = require('commander');
const { createProjectAction, addComponentAction, addPageAndRouteAction, addStoreAction } = require('./actions');

const createCommands = () => {
  // 1、create创建项目的使用
  program.command('create <project> [other...]').description('clone a repository into a folder').action(createProjectAction);

  // 2、创建组件模板
  program
    .command('addcpn <name>')
    .description('add vue component，例如：why addcpn HelloWord [-d src/components]')
    .action((name) => {
      // 取出 -d 的后面路径和命令 自动加入到program.dest属性中
      addComponentAction(name, program.dest || 'src/components');
    });

  // 3、创建.vue pages模板
  program
    .command('addpage <name>')
    .description('add vue page and router config，例如：why addpage Home [-d src/pages]')
    .action((name) => {
      // 取出 -d 的后面路径和命令 自动加入到program.dest属性中
      addPageAndRouteAction(name, program.dest || 'src/pages');
    });

  // 4、创建store存储
  program
    .command('addstore <store>')
    .description('add vue store，例如：why addstore Home [-d src/store]')
    .action((store) => {
      addStoreAction(store, program.dest || 'src/store/modules');
    });
};

module.exports = createCommands;
