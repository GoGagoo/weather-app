import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

const config: webpack.Configuration & { devServer: DevServerConfiguration } = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	devServer: {
		compress: true,
		port: 3000,
		open: true,
		hot: true,
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.bundle\.ts$/,
				use: {
					loader: 'bundle-loader', 
					options: {
						name: '[name]'
					}
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
		},
		{
				test: /\.(svg|png|gif|jpg)$/,
				exclude: /fonts/,
				loader: 'file-loader'
		},
		{
				test: /\.(ttf|eot|woff|svg|woff2)$/,
				loader: "file-loader"
		}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html', 
		}),
	],
}

export default config
