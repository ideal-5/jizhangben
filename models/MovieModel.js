
// 电影集合
const mongoose = require('mongoose')

// 创建文档的结构对象
let MovieSchema = mongoose.Schema({
    title: String,
    director: String // 导演
})

// 创建模型对象(绑定集合)
let MovieModel = mongoose.model('movie', MovieSchema)

// 暴露模型对象
module.exports = MovieModel