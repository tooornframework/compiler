const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_moduels/,
                use: [
                    'awesome-typescript-loader'
                ],
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },
    entry: './modules/client/Client.ts',
    output: {
        libraryTarget: "commonjs",
        path: __dirname + "/build/client",
        filename: "index.js"
    },
    externals: [
        "node_modules/typescript",
        "node_modules/ts-morph"
    ],
    plugins: [
        new BundleAnalyzerPlugin()
    ]
};