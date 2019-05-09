const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const config = require('../webpack.config');
const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const buildUtill = require('./utill');

/**
 * Execute a webpack build process and handle responses.
 * @param  {[type]} compiler webpack config to build;
 * @return null
 */
exports.webpacklBuild = function (compiler) {

    compiler.run((err, stats) => {

        if (err) {
            console.log(chalk.red('BUILD TOOL FAILED'), 'Build tools encountered a critical error.\n');
            console.log(err);
            return;
        }

        const messages = formatWebpackMessages(stats.toJson({}, true));

        // Build with errors
        if (messages.errors.length) {
            console.log(chalk.red('ERROR'), 'Build completed with errors');
            console.log(new Error(messages.errors.join('\n')));
            return;
        }

        // Build with Warnings
        if (messages.warnings.length) {
            console.log(chalk.yellow('WARNING'), 'Build completed with some warnings');
            console.log(new Error(messages.warnings.join('\n')));
            return;
        }

        // Succesfull BUILD
        console.log(chalk.green('SUCCESS'), 'Build completed with no issues.', chalk.gray((stats.endTime - stats.startTime) + 'ms'));
    });
};
