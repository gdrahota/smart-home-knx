module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  transpileDependencies: [
    'quasar',
  ],
  devServer: {
    port: 9000,
    proxy: {
      '^/api': {
        changeOrigin: true,
        target: 'http://localhost:8080',
        headers: {
          Connection: 'keep-alive',
        },
        ws: true,
      },
      '^/socket.io': {
        target: 'http://localhost:8080',
        ws: true,
      },
    },
  },
}
