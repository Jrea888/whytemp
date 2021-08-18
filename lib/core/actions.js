/*
 * @Description:
 * @Author: zhangweigang
 * @Date: 2021-07-23 09:33:36
 * @LastEditTime: 2021-07-23 23:17:23
 * @LastEditors: zhangweigang
 */
const { promisify } = require('util');

const download = promisify(require('download-git-repo'));
const { vueRepo } = require('../config/repo-config.js');
const { commandSpawn } = require('../utils/terminal.js');
const { compile, writeToFile, createDirSync } = require('../utils/utils');
const open = require('open');
const path = require('path');

// 1、创建项目 安装依赖 运行打开浏览器
const createProjectAction = async (project) => {
  console.log('why helps you create your project~');
  // 1、从仓库拉取定义好的模板 clone项目
  await download(vueRepo, project, { clone: true });
  // 2、执行npm install
  const commandCode = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commandSpawn(commandCode, ['install'], { cwd: `./${project}` });
  console.log('开始运行...');
  // 3、运行npm run serve
  commandSpawn(commandCode, ['run', 'serve'], { cwd: `./${project}` });
  // 4、打开浏览器
  open('http://localhost:8080/');
};

// 2、创建组件模板--添加组件的action
const addComponentAction = async (name, dest) => {
  // 1、有对应的ejs模板
  const result = await compile('vue-components.ejs', { name, lowerName: name.toLowerCase() });
  console.log(result);
  // 2、写入文件 router.js 编译ejs模板 result
  console.log('打印dest：', dest);
  const targetPath = path.resolve(dest, `${name}.vue`);
  console.log('拼接的写文件的路径：', targetPath);
  writeToFile(targetPath, result);
};

// 3、添加页面和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1、编译模板
  const data = { name, lowerName: name.toLowerCase() };
  const pageResult = await compile('vue-components.ejs', data);
  const routeResult = await compile('vue-router.ejs', data);
  console.log(result);

  const targetDest = path.resolve(dest, name.toLowerCase());
  // 2、写入文件
  if (createDirSync(targetDest)) {
    const pagePath = path.resolve(targetDest, `${name}.vue`);
    const routePath = path.resolve(targetDest, 'router.js');
    writeToFile(pagePath, pageResult);
    writeToFile(routePath, routeResult);
  }
};

// 4、添加存贮 store
const addStoreAction = async (name, dest) => {
  const storeResult = await compile('vue-store.ejs', {});
  const typesResult = await compile('vue-types.ejs', {});

  const targetDest = path.resolve(dest, name.toLowerCase());
  // 2、写入文件
  if (createDirSync(targetDest)) {
    const storePath = path.resolve(dest, `${name}.js`);
    const typesPath = path.resolve(dest, 'types.js');
    writeToFile(storePath, storeResult);
    writeToFile(typesPath, typesResult);
  }
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
};
