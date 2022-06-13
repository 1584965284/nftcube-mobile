const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '123'
        return args
      })
  }, 
  publicPath: process.env.NODE_ENV === "production" ? "/mobile/" : "/",
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      //less加载器
      less: {
        //修改变量
        lessOptions: {
        modifyVars: {
          "checkbox-border-color": 'black',
          "nav-bar-arrow-size":"20px",
          "nav-bar-icon-color":"white",
        }
      }
      }
    }
  }
})
