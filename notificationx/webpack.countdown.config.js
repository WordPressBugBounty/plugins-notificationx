const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const plugins = defaultConfig.plugins.filter(
    (plugin) =>
        plugin.constructor.name != "MiniCssExtractPlugin" &&
        plugin.constructor.name != "CleanWebpackPlugin"
);

const config = {
    ...defaultConfig,
    entry: {
        countdown: path.resolve(
            __dirname,
            "blocks/countdown/index.jsx"
        ),
    },
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        ...defaultConfig.resolve,
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
        ...defaultConfig.output,
        filename: "index.js",
        path: path.resolve(process.cwd(), "blocks/countdown/"),
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                "blocks/countdown/index.js",
                "blocks/countdown/index.asset.php",
            ],
        }),
        ...plugins,
    ]
};

module.exports = config;
