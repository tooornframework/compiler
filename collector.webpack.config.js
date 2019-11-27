const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts$/,
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
    entry: './modules/collector/Collector.ts',
    output: {
        libraryTarget: "commonjs",
        path: __dirname + "/build/collector",
        filename: "index.js"
    },
    externals: [nodeExternals()],
};