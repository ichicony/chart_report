const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://172.28.1.45:8803/api/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
 
    lintOnSave: false, // 关闭格式检查
    productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
    // configureWebpack: config => {
    //     config.plugins.forEach((val) => {
    //         if (val instanceof HtmlWebpackPlugin) {
    //             val.options.scale=2
    //             console.log(val)
    //             console.log(val.options.templateParameters.toString())
    //         }
    //     })    
    // }
    // configureWebpack: {
    //     module: {
    //       rules: [
    //         {
    //           test: /\.(html)$/,
    //           exclude: /node_modules/,
    //           use: {
    //             loader: 'html-loader',
    //             options: {
    //               minimize: true
    //             }
    //           }
    //         }
    //       ]
    //     }
    //   }
}