module.exports = {
    //输出文件目录
    outputDir: 'dist',
    // 判断是否为生产环境，如果是改成/spa/路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    runtimeCompiler: true,
}
