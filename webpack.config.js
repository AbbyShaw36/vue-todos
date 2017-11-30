const webpack = require('webpack');
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
				loader: 'vue-loader'
			},
			// {
			// 	test: /\.scss/,
			// 	use: [{
			// 		loader: 'style-loader'  // 将 JS 字符串生成为 style 节点
			// 	}, {
			// 		loader: 'css-loader'  // 将 CSS 转化成 CommonJS 模块
			// 	}, {
			// 		loader: 'sass-loader'  // 将 Sass 编译成 CSS
			// 	}]
			// }
		]
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js',
			'@': resolve('src')
		},
		extensions: ['*', '.js', '.vue', '.json']
	}
};