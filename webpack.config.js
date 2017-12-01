const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

let resolve = dir => {
	return path.resolve( __dirname, dir)
}

module.exports = {
	entry: './src/main.js',
	output: {
		path: resolve('dist'),
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextPlugin.extract({
							use: 'css-loader',
							fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
						})
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
				use: [{
					loader: "url-loader",
					options: {
						limit: 10000,
						name: 'fonts/[name].[hash:7].[ext]'    // 将字体放入fonts文件夹下
					}
				}]
			}
		]
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js',
			'@': resolve('src')
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	]
};