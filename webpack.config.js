'use strict';

// const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf = require('rimraf');

let homeDir = '/clientSide_src';
let cssName = NODE_ENV === 'development' ? 'stylesheet/[name].css?var=[hash]' : 'stylesheet/[name].css';
let jsName = NODE_ENV === 'development' ? 'javascripts/[name].js?var=[hash]' : 'javascripts/[name].js';

let plugins = [
	new ExtractTextPlugin(cssName)
];

let entry = [
	'babel-polyfill',
	'./index.js'
];

if (NODE_ENV === 'development') {
	plugins.push(new NpmInstallPlugin());
	plugins.push(new webpack.optimize.DedupePlugin());
	plugins.push(new webpack.optimize.OccurenceOrderPlugin());

	entry.push('webpack-hot-middleware/client');
}

function addHash(template, hash) {
	return NODE_ENV == 'production' ?
		template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`;
}


module.exports = {

	context: path.join(__dirname, homeDir),

	devtool: NODE_ENV !== 'production' ? 'inline-source-map' : null,

	entry,

	output: {
		path: path.join(__dirname, homeDir, '/static'),
		filename: jsName,
		publicPath: '/'
	},

	eslint: {
		configFile: '.eslintrc'
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new NpmInstallPlugin(),
		new ExtractTextPlugin(cssName)
	],

	htmlLoader: {
		ignoreCustomFragments: [/\{\{.*?}}/],
		root: path.resolve(__dirname, 'assets'),
		attrs: ['img:src', 'link:href']
	},

	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: NODE_ENV !== 'production' ? 'react-hot!babel!eslint-loader' : 'babel',
				exclude: [/node_modules/, /static/]
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('css-loader?sourceMap&?resolve url!postcss-loader!less-loader?sourceMap&?resolve url')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css-loader?sourceMap&?resolve url!postcss-loader?sourceMap&?resolve url')
			},
			{
				test: /\.gif$/,
				loader: 'url-loader?limit=10000&mimetype=image/gif'
			},
			{
				test: /\.jpg$/,
				loader: 'url-loader?limit=10000&mimetype=image/jpg'
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=10000&mimetype=image/png'
			},
			{
				test: /\.svg/,
				loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
			},
			{
				test: /\.(woff|woff2|ttf|eot)/,
				loader: 'url-loader?limit=1'
			},
			{
				test: /\.html$/,
				loader: addHash('file?name=assets/[name].[ext]', 'hash:6')
			},
			{
				test: /\.tpl$/,
				loader: 'html'
			},
		]
	},

	postcss: function () {
		return [autoprefixer, precss];
	}
};
