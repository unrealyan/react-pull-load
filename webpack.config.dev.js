const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const autoprefixer = require('autoprefixer');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpack = require("copy-webpack-plugin");
// const prod = envs['NODE_ENV'] === 'production';
// console.log("env: " + (!prod ? 'development' : 'productiextract-text-webpack-pluginon'));

console.log(process.env.NODE_ENV)


module.exports = {
    devtool: 'source-map',
    mode: 'development',
    // entry: {
    //     //     main: ["babel-polyfill", './src/index.js'],
    //     //     login: ["babel-polyfill", './src/login.js'],
    //     // },
    entry: {
        index: './src/main.tsx'
    },

    output: {
        publicPath:"/",
        // library: envs.library,
        // libraryTarget: 'umd',
        // umdNamedDefine: true,
        // libraryExport: "default",
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
    },

    externals:[
        function(context, request, callback) {
            if (process.env.NODE_ENV === 'dev'){
                return callback()
            }else {
                return callback(null, 'commonjs ','react','html-webpack-plugin');
            }
        }
    ],

    // externals: {
    //     'react': 'commonjs react'
    // },

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
                            // globalVars: {
                            //     "mobile-size": "900px"
                            // },
                            // modifyVars:{
                            //     'primary-color': '#1DA57A',
                            // },
                            // javascriptEnabled: true,
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
                            // globalVars: {
                            //     "mobile-size": "900px"
                            // },
                            // modifyVars:{
                            //     'primary-color': '#1DA57A',
                            // },
                            // javascriptEnabled: true,
                        },
                    },
                    'css-loader',
                    // {
                    //     loader: "less-loader",
                    //     options: {
                    //         javascriptEnabled: true,
                    //
                    //     }
                    // },
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
            styles:path.resolve(__dirname, '../src/styles'),
            pages: path.resolve(__dirname, '../src/pages/'),
            store: path.resolve(__dirname, '../src/store/'),
            // Utils: path.resolve(__dirname, 'src/Utils'),
            // icomoon: path.resolve(__dirname, 'src/icomoon/style.css'),
            // iconfont: path.resolve(__dirname, 'src/iconfont/iconfont.css'),
            // page: path.resolve(__dirname, 'src/Pages/'),
            // constants: prod
            //     ? path.resolve(__dirname, 'src/constants/system-profile-prod.json')
            //     : path.resolve(__dirname, 'src/constants/system-profile-dev.json'),
        },
        extensions: ['.tsx', '.ts','.js', '.jsx', 'css', 'less','scss'],
    },
    // devtool: 'source-map',

    plugins: [
        // new CopyWebpack([
        //     {
        //         from: "login/i18n",
        //         to: "./"
        //     }
        // ]),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-min.css',
            chunkFilename: 'css/[id]-min.css'
        }),
        // new HtmlWebpackPlugin({
        //     minify: false,
        //     // hash: prod,
        //     template: './login/index.html',
        //     // chunks:['main','manifest','reactBase','xlsx','@material-ui','common','styles'],
        //     // chunks: ['main','vendor','react','react-dom','moment'],
        //     filename: 'index.html'
        // }),
        new HtmlWebpackPlugin({
            minify: false,
            // hash: prod,
            template: 'src/index.html',
            // chunks:['login','manifest','reactBase','@material-ui','common','styles'],
            // chunks: ['login','vendor','react','react-dom','moment'],
            filename: 'index.html'
        }),
        // new webpack.DefinePlugin(envs.DefinePlugin),
    ],
    devServer: {
        compress: true,
        contentBase: 'dist',
        publicPath: "/",
        quiet: false,
        hot: true,
        port: 8000,
        open: true,
        disableHostCheck: true,
        historyApiFallback: {
            rewrites: [
                {from: /^\/login/, to: '/login1.html'},
                {from: /.*/, to: '/index.html'},
            ]
            // index: '/index.html',
            // login:'/index.html'
        },
        public:"module.dev.amegroups.net:8000",
        host: '0.0.0.0',//'localhost',
        proxy: {
            // '/view':'/index.html',
            // '/rest':{
            //     target: 'http://39.106.212.120:8080',
            //     // pathRewrite:{'^/rest':'rest/inventory-service'}
            // },
            // '/rest/inventory-service': {
            //     target: 'http://192.168.2.39:8081',
            //     pathRewrite: {'/rest/inventory-service': ''}
            // },
            '/api/jwtAuth': {
                target: 'http://auth.t.amegroups.cn',
                changeOrigin: true,
                secure: true,
                // pathRewrite: {},
            },
            '/api/auth': {
                target: 'http://auth.t.amegroups.net',
                changeOrigin: true,
                secure: true,
                // pathRewrite: {'^/api/auth.t': '/api/auth'}
            },


            '/webapi': {
                target: 'http://ebook-api.amegroups.net',
                changeOrigin: true,
                secure: true,
                pathRewrite: {'^/webapi': '/webapi'}
            },

            '/wxapi': {
                target: 'http://api-center.amegroups.cn',
                changeOrigin: true,
                secure: true,
                pathRewrite: {'^/wxapi': ''}
            },


            '/api/oss': {
                // target: 'http://localhost:4000',
                target: 'http://microservice.amegroups.net/',
                // target: 'https://635249f7-d32a-4191-83b6-fbf47b3ab8c9.mock.pstmn.io',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/api/oss': '/api/ossServer'}
            },
            '/api/vodapi': {
                // target: 'http://localhost:4000',
                target: 'http://microservice.amegroups.net/',
                // target: 'https://635249f7-d32a-4191-83b6-fbf47b3ab8c9.mock.pstmn.io',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/api/vodapi': '/api'}
            },
            '/editor': {
                // target: 'http://localhost:4000',
                target: 'http://ales.amegroups.net/',
                // target: 'https://635249f7-d32a-4191-83b6-fbf47b3ab8c9.mock.pstmn.io',
                changeOrigin: true,
                secure: false,
                // pathRewrite: {'^/api/ales': ''}
            },
            '/api': {
                target: 'http://localhost:3000',
                // target: 'https://635249f7-d32a-4191-83b6-fbf47b3ab8c9.mock.pstmn.io',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/api': ''}
            },

        }

    }

};
