const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: "node",
    mode: "development",
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
        pathinfo: true,
        libraryTarget: "commonjs",
        path: __dirname + "/build/collector",
        filename: "index.js"
    },
    externals: [nodeExternals()],
};