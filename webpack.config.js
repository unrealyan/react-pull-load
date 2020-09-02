const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(process.env.NODE_ENV)


module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        index: './src/index.tsx'
    },

    output: {
        publicPath: "/",
        path: path.resolve(__dirname, './'),
        // library: envs.library,
        // libraryTarget: 'umd',
        // umdNamedDefine: true,
        // libraryExport: "default",
        libraryTarget: 'commonjs2',
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
    },


    externals: {
        'react': 'commonjs react'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: 'html-loader?exportAsEs6Default',
                options: {
                    // Disables attributes processing
                    attributes: false,
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.NODE_ENV === 'development',
                        },
                    },
                    // "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },


            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                ],

            },

            {
                test: /\.(png|jpg|jpeg|gif)(\?[\s\S]+)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 600000,
                            name: '[name].[ext]',
                            publicPath: '/assets/',
                            outputPath: 'assets/'
                        },
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: '[name].[ext]',
                    publicPath: '/fonts/',
                    outputPath: 'fonts/'
                },
                exclude: /node_modules/,
            },
        ]
    },

    resolve: {
        alias: {
            components: path.resolve(__dirname, '../src/components/'),
            compose: path.resolve(__dirname, '../src/compose/'),
            api: path.resolve(__dirname, '../src/api/'),
            apiHooks: path.resolve(__dirname, '../src/apiHooks/'),
            // less: path.resolve(__dirname, 'src/Less/'),
            util: path.resolve(__dirname, '../src/util/util.js'),
            assets: path.resolve(__dirname, '../src/assets'),
            styles: path.resolve(__dirname, '../src/styles'),
            pages: path.resolve(__dirname, '../src/pages/'),
            store: path.resolve(__dirname, '../src/store/')
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx', 'css', 'less', 'scss'],
    },
    // devtool: 'source-map',

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]-min.css',
            chunkFilename: 'css/[id]-min.css'
        })
    ]

};
