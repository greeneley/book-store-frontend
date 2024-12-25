const path = require("path");
const package = require("./package.json");
const dotenv = require("dotenv");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

dotenv.config();

module.exports = (env, options) => {
	const devMode = options.mode === "development" ? true : false;

	process.env.NODE_ENV = options.mode;

	return {
		mode: options.mode,
		entry: path.resolve(__dirname, "./src/index.tsx"), // Điểm vào của ứng dụng, nơi Webpack bắt đầu quá trình xây dựng
		output: {
			path: path.resolve(__dirname, "./dist"),
			filename: "[name].[contenthash].js",
			chunkFilename: "[name].[contenthash].js",
			clean: true,
			publicPath: "/"
		}, // Cấu hình đầu ra, bao gồm đường dẫn và tên tệp cho các tệp được xây dựng
		devtool: "source-map",
		devServer: {
			port: 8082,
			historyApiFallback: true
		},
		resolve: {
			extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
			alias: {
				"@": path.resolve(__dirname, "src")
			},
			fallback: { stream: false, buffer: false }
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					loader: "babel-loader"
				},
				{
					test: /\.css$/i,
					// include: path.resolve(__dirname, 'src'),
					use: [
						devMode ? "style-loader" : MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								sourceMap: true
							}
						},
						{
							loader: "postcss-loader"
						}
					]
				},
				{
					test: /\.(woff|woff2|ttf|eot)$/,
					loader: "file-loader",
					options: {
						name: "[name].[contenthash].[ext]"
					}
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: "file-loader",
					options: {
						name: "[name].[contenthash].[ext]"
					}
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						"style-loader",
						// Translates CSS into CommonJS
						"css-loader",
						// Compiles Sass to CSS
						"sass-loader"
					]
				}
			]
		},
		plugins: [
			// need to use ForkTsCheckerWebpackPlugin because Babel loader ignores the compilation errors for Typescript
			new ForkTsCheckerWebpackPlugin(),
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: devMode ? "[name].css" : "[name].[contenthash].css",
				chunkFilename: devMode ? "[name].css" : "[name].[contenthash].css"
			}), // Tách CSS ra khỏi JavaScript và tạo các tệp CSS riêng biệt. Điều này rất hữu ích cho việc tối ưu hóa tải trang
			// copy static files from public folder to build directory
			new CopyPlugin({
				patterns: [
					{
						from: "public/**/*",
						globOptions: {
							ignore: ["**/index.html"]
						}
					}
				]
			}),
			new HtmlWebpackPlugin({
				template: "./public/index.html",
				filename: "index.html",
				title: package.name,
				meta: {
					title: package.name,
					description: package.description,
					author: package.author,
					keywords: Array.isArray(package.keywords) ? package.keywords.join(",") : undefined,
					"og:title": package.name,
					"og:description": package.description,
					"og:url": package.homepage
				},
				minify: {
					html5: true,
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true,
					minifyURLs: false,
					removeComments: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributese: true,
					useShortDoctype: true
				}
			}),
			new webpack.DefinePlugin({
				"process.env": JSON.stringify(process.env)
			})
			// !devMode ? new CleanWebpackPlugin() : false,
			// !devMode ? new BundleAnalyzerPlugin() : false
		].filter(Boolean),
		optimization: {
			// splitChunks: {
			//     cacheGroups: {
			//         // vendor chunk
			//         vendor: {
			//             // sync + async chunks
			//             chunks: 'all',
			//             name: 'vendor',
			//             // import file path containing node_modules
			//             test: /node_modules/
			//         }
			//     }
			// },
			minimizer: [
				new TerserPlugin({
					extractComments: true,
					terserOptions: {
						compress: {
							drop_console: true
						}
					}
				}),
				new CssMinimizerPlugin()
			]
		}
	};
};
