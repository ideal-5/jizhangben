
// 用户名和密码集合
const mongoose = require('mongoose')

// 创建文档的结构对象
let UserSchema = mongoose.Schema({
    username: String,
    password: String
})

// 创建模型对象(绑定集合)
let UserModel = mongoose.model('user', UserSchema)

// 暴露模型对象
module.exports = UserModel