
// success, error 成功与失败的回调
module.exports = function (success, error) {

    // 判断是否传递连接错误回调 没有传递就给一个默认值
    if (typeof error !== 'function') {
        error = () => {
            console.log('连接失败');
        }
    }


    // 导入mongoose
    const mongoose = require('mongoose')

    // 导入配置服务端ip端口数据库的文件
    const { DBHOST, DBPORT, DBNAME } = require('../config')

    // 连接数据库服务
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)


    // 连接成功回调
    mongoose.connection.once('open', () => {
        success()
    })

    // 连接失败回调
    mongoose.connection.on('error', () => {
        // console.log('连接失败');
        error()
    })



    // 连接断开回调
    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    })
}