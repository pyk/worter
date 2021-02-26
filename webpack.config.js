const TerserPlugin = require("terser-webpack-plugin");

/**
 * Webpack configuration to build the tests as Cloudflare Workers script.
 *
 * Our goal is to run the tests inside Cloudflare Workers itself. So we have
 * 100% certainty that our tests will succeed in the production environment.
 */
const webworkerConfig = {
    target: "webworker",
    entry: "./test.ts",
    resolve: {
        extensions: [".ts", ".js", ".json"], // .js and .json is required in order to build mocha for the browser
        plugins: [],
    },
    // Disable function mangling in webpack optimizer to reserve the function
    // name. This will help us to keep the built size small but also helps us
    // debugging when there is something wrong.
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                },
            }),
        ],
    },
    // performance: {
    //     hints: false,
    // },
    node: {
        fs: "empty", // fs: "empty" is required in order to build mocha for the browser
    },
    devtool: "cheap-module-source-map",
    // Use module defined in the main webpack config
    module: {
        rules: [
            /**
             * Use ts-loader to compile TypeScript files.
             *
             * Doc:
             * https://github.com/TypeStrong/ts-loader
             */
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.json",
                },
            },
        ],
    },
};

module.exports = () => {
    return webworkerConfig;
};
