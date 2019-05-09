'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const config = require('../webpack.config');
const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const buildUtill = require('./utill');

const src = path.join(__dirname, "../src");

try{
  let compiler = webpack(config);
  console.log('');
  console.log(chalk.blue('RUNNING'), 'Creating an optimized production build...');
  console.log('Build will be publihed to', config.output.path);
  console.log('You can use the `yarn publish` command to push changes up to npm', '\n')

  buildUtill.webpacklBuild(compiler);

}catch(e){
  console.log(chalk.red('Build failed due to fatial error'), e);
}
