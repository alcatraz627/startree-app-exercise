const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMessages = require("webpack-messages");
const dotenv = require("dotenv");

const isDevelopment = process.env.NODE_ENV === "development";

const config = {
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    stats: "errors-warnings",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    // https://stackoverflow.com/questions/52541561/module-build-failed-from-node-modules-babel-loader-lib-index-js-error-cann
                    options: {
                        presets: ["@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: isDevelopment
                                    ? "[path][name]__[local]--[hash:base64:5]"
                                    : "[hash:base64]",
                            },
                            importLoaders: 1,
                        },
                    },
                    "sass-loader",
                ],
                // use: [
                //     "style-loader",
                //     "css-loader",
                //     "sass-loader",
                // ],
            },
            {
                test: /\.(jp?eg|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff2?|otf)$/,
                use: "file-loader",
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
        new WebpackMessages({
            name: "client",
            logger: (str) => console.log(`>> ${str}`),
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.config().parsed),
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "StarTree App Exercise",
            template: "src/index.ejs",
            meta: {
                viewport:
                    "width=device-width, initial-scale=1, shrink-to-fit=no",
            },
        }),
    ],
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "[name].bundle.js",
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    devServer: {
        static: __dirname + "/dist",

        hot: true,
        port: 9000,
        compress: true,
        historyApiFallback: true,
        client: {
            progress: true,
            logging: "warn",
        },
        onListening: (devServer) => {
            console.log(
                `Server listening on http://127.0.0.1:${devServer.options.port}`
            );
        },
    },
};

module.exports = config;
