const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const debug = process.env.NODE_ENV !== 'production'
const productionGzipExtensions = ['js', 'css'];
const CompressionWebpackPlugin = require('compression-webpack-plugin');
//const VueConf = require('./src/assets/js/libs/vue_config_class')
//const vueConf = new VueConf(process.argv)
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    // baseUrl: './', //vueConf.baseUrl, // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('imgurl', resolve('src/assets/img'))
            .set('components', resolve('src/components'))
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    },
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    css: { // 配置高于chainWebpack中关于css loader的配置
        // modules: true, // 是否开启支持‘foo.module.css’样式
        // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        sourceMap: false, // 是否在构建样式地图，false将提高构建速度
        loaderOptions: { // css预设器配置项
            sass: {
                data: ''//`@import "@/assets/scss/mixin.scss";`
            }
        }
    },
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
            'axios': 'axios',
            'vue-apexchart': 'VueApexCharts'
        }
        if (process.env.NODE_ENV === 'production'){
            return {
                plugins: [
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: productionGzipExtensions,
                        threshold: 2048,
                        minRatio: 0.8
                    })
                ]
            }
        }
    },
    // chainWebpack: config => {
        
    // },

    // configureWebpack: config => {
    //     if (isProduction) {
    //         const plugins = []
    //         plugins.push(
    //             new CompressionWebpackPlugin({
    //                 filename: '[path].gz[query]',
    //                 algorithm: 'gzip',
    //                 test: productionGzipExtensions,
    //                 threshold: 10240,
    //                 minRatio: 0.8
    //             })
    //         )
    //         config.plugins = [
    //             ...config.plugins,
    //             ...plugins
    //         ]
    //     }
    // },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: false,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null,
        // proxy: {
        //     '/api': {
        //         target: '<url>',
        //         ws: true,
        //         changOrigin: true
        //     }
        // },
        before: app => { }
    }
}
