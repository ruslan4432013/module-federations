import path, { dirname } from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import webpack from "webpack";
import { fileURLToPath } from "node:url";

const {ModuleFederationPlugin} = webpack.container

const isDevelopment = process.env.NODE_ENV !== "production";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

export default {
  mode: "development",
  entry: {
    app: path.resolve(__dirname, "src", "index.tsx"),
  },
  devServer: {
    hot: true,
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    globalObject: 'self',
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                ['@babel/preset-react', {
                  runtime: 'automatic'
                }],
              ],
              plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean),
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      }
    ]
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      library: {type: 'module'},
      remotes: {
        vite_service_example: 'http://localhost:5001/assets/remoteEntry.js',
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      scriptLoading: 'module',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin()
  ].filter(Boolean)
}