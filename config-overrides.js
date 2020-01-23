const {useBabelRc, override, addWebpackAlias, fixBabelImports, overrideDevServer} = require('customize-cra')
const path = require('path')

const devServerConfig = () => config => {
  return {
    ...config,
    overlay: {
      warnings: false,
      errors: true
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

module.exports = {
  webpack: override(useBabelRc()),
  devServer: overrideDevServer(devServerConfig())
}
