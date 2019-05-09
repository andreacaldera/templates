const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const paths = {
    build: path.join(__dirname, "/build"),
    entry: path.join(__dirname, "/src/index.js"),
    src: path.join(__dirname, "/src")
};

module.exports = {
    bail: true,
    devtool: 'source-map',
    entry: paths.entry,

    output: {
        path: paths.build,
        filename: "index.js",
        library: "react-component-lib",
        libraryTarget: "umd"
    },

    resolve: {
        modules: [
            'node_modules',
            paths.src
        ]
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,

                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: paths.appSrc,
            },

            // Any media files will be placed in the media directory with a hashed filename to avoide naming
            // conflicts.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:8].[ext]',
                },
            },

            // Process JS with Babel.
            {
                test: /\.(js|jsx)$/,
                include: paths.src,
                loader: require.resolve('babel-loader'),
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            minimize: true,
                            sourceMap: true
                        }
                    }, {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer(
                                    {
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9',
                                        ],
                                        flexbox: 'no-2009',
                                    }
                                ),
                            ],
                        },
                    }, {
                        loader: require.resolve('sass-loader'),
                        options: {
                            includePaths: [
                                paths.src
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }
}
