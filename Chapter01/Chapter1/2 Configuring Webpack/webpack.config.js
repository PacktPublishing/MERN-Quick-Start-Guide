module.exports = {
	entry: ['@babel/polyfill'],
	target: 'web',
	devtool: 'source-map',
	performance: {
		maxEntrypointSize: Infinity,
		maxAssetSize: Infinity,
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
		}],
	},
	resolve: { extensions: ['.js', '.json'] },
}
