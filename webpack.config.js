const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
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
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
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
        new webpack.HotModuleReplacementPlugin({}),
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "Carthago delenda est",
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
        filename: "bundle.js",
    },
    devServer: {
        static: __dirname + "./dist",

        // hot: true,
        port: 9000,
        compress: true,
        historyApiFallback: true,
    },
};
