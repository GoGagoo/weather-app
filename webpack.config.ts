import CopyWebpackPlugin from 'copy-webpack-plugin'
import dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

dotenv.config()

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

const config: webpack.Configuration & { devServer: DevServerConfiguration } = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
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
						name: '[name]',
					},
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
				loader: 'file-loader',
			},
			{
				test: /\.(ttf|eot|woff|svg|woff2)$/,
				loader: 'file-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new webpack.DefinePlugin({
			'process.env.OPEN_CAGE_DATA_KEY': JSON.stringify(
				process.env.OPEN_CAGE_DATA_KEY
			),
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'public/weather-icons', to: 'weather-icons' }],
		}),
	],
}

export default config
