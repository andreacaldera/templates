'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');
const chalk = require('chalk');
const buildUtill = require('./utill');
const watch = require('node-watch');

const src = path.join(__dirname, "../src");

let timeout = false;

try {
    let compiler = webpack(config);
    console.log(chalk.blue('RUNNING'), 'Developement file watching is now running.');
    console.log('Changes will be automaticaly built to', config.output.path);
    console.log('You can use the `yarn link` command to test this module to in local project.', '\n');

    buildUtill.webpacklBuild(compiler);

    watch(src, {recursive: true}, function (evt, name) {

        // give 0.1 seconds for multiple file events.
        // Some operating systems and IDEs make multiple calls for a single file modification.
        if (!timeout) {
            timeout = setTimeout(() =>{
                timeout = false;
                buildUtill.webpacklBuild(compiler);
            }, 100);

        }

    });

} catch (e) {
    console.log(chalk.red('Build failed due to fatal error'), e);
}
