#!/usr/bin/env node
// console.log('Hello Cli');
const program = require('commander');

const helpOptions = require('./lib/core/help');
const createCommands = require('./lib/core/create');

// 打印版本号 , '-v --version'
program.version(require('./package.json').version);

// 帮助和可选信息
helpOptions();

// 创项其他命令
createCommands();

// 解析why 后面已连续的命令参数
program.parse(process.argv);

// 拿不到参数
// console.log(program.dest, 'dest属性');
