// NPM
const webpack = require('webpack');
require('raw-loader');
require('html-minify-loader');
require('jade-html-loader');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const AssetsPlugin = require('assets-webpack-plugin');
const isProduction = process.argv.indexOf('--watch') < 0;
//const suffix = isProduction ? '-[hash]' : '';
const suffix = isProduction ? '' : '';

// === parse --target-entry option
// example:
//   npm run watch -- --target-entry=confirmation_sample_contract_react
//   npm run build -- --target-entry=confirmation_sample_contract_react
var entries = {
    src: './src/main',
}
const targetEntryParams = process.argv.filter((str) => {return /^--target-entry=/.test(str)});
if (targetEntryParams[0]) {
  var opt = targetEntryParams[0];
  var targetEntry = /^--target-entry=(.*)$/.exec(opt)[1]
}

if (targetEntry) {
  var newEntries = {};
  if (!entries[targetEntry]) {
    console.log("unknown target entry: " + targetEntry);
    process.exit(1);
  }
  newEntries[targetEntry] = entries[targetEntry];
  entries = newEntries;
}

module.exports = {

    devtool: "source-map",
    debug: true,

    resolve: {
        cache: false,
        extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.tsx'],
    },

    entry: entries,

    output: {
        path: './build',
        publicPath: '/build/',
        sourceMapFilename: "[file].map",
        chunkFilename: '[id].chunk.js',
        filename: `[name]${suffix}.js`,
        sourceMapFilename: "[file].map",
    },

    module: {
        loaders: [
            //{
            //    test: /\.ts$/,
            //    loader: 'awesome-typescript-loader',
            //},

            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                query: {
                    // remove TypeScript helpers to be injected below by DefinePlugin
                    'compilerOptions': {
                        'removeComments': true,
                        'noEmitHelpers': true,
                    },
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ]
                },
                exclude: [ /\.(spec|e2e)\.ts$/ ]
            },
            {
                test: /\.html$/,
                loader: 'raw!html-minify',
            },
            {
                test: /\.jade$/,
                loader: 'raw!jade-html',
            },
        ],
        noParse: [
            /rtts_assert\/src\/rtts_assert/,
            /reflect-metadata/,
            /zone\.js\/dist\/.+/,
            /angular2\/bundles\/.+/,
        ]
    },

    'html-minify-loader': {
        empty: true,        // KEEP empty attributes
        cdata: true,        // KEEP CDATA from scripts
        comments: true     // KEEP comments
    },

    plugins: [
        // awesome-typescript-loader の名残
        // new ForkCheckerPlugin(),
        //new OccurenceOrderPlugin(true),
        new DedupePlugin(),
        //new CommonsChunkPlugin({
        //    name: 'vendor',
        //    filename: `vendor${suffix}.js`,
        //    minChunks: Infinity,
        //}),
        //new AssetsPlugin({filename: 'assets.json'}),
        new ProvidePlugin({
            // TypeScript helpers
            '__metadata': 'ts-helper/metadata',
            '__decorate': 'ts-helper/decorate',
            '__awaiter': 'ts-helper/awaiter',
            '__extends': 'ts-helper/extends',
            '__param': 'ts-helper/param',
            'Reflect': 'es7-reflect-metadata/dist/browser'
        }),
        new UglifyJsPlugin({
            beautify: false,
            mangle: false,
            comments: false,
            compress : {
                screw_ie8 : true
            },
            //mangle: {
            //  screw_ie8 : true
            //}
        }),

    ],

    // we need this due to problems with es6-shim
    node: {
        global: 'window',
        progress: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    },

};

