const webpack = require('webpack')
const {useBabelRc, override, addWebpackResolve, addWebpackPlugin, overrideDevServer} = require('customize-cra')

const devServerConfig = () => config => {
  return {
    ...config,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
    proxy: {
      [process.env.REACT_APP_BASE_API]: {
        target: process.env.REACT_APP_SERVER_URL,
        changeOrigin: true,
        pathRewrite: {
          [process.env.REACT_APP_BASE_API]: ''
        }
      }
    }
  }
}

const resolveConfig = (config) => {
  return {
    ...config,
    fallback: {
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      process: require.resolve('process/browser'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util')
    }
  }
}

const definePluginsConfig = (config) => {
  return addWebpackPlugin(new webpack.ProvidePlugin({
    ...config,
    Buffer: ['buffer', 'Buffer'],
    process: 'process/browser'
  }))
}

module.exports = {
  webpack: override(
    useBabelRc(),
    addWebpackResolve(resolveConfig()),
    definePluginsConfig()
  ),
  devServer: overrideDevServer(devServerConfig())
}
