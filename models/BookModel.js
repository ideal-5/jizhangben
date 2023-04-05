
// 书籍集合
const mongoose = require('mongoose')

// 创建文档的结构对象
let BookSchema = mongoose.Schema({
    name: String,
    author: String, // 作者
    price: Number
})

// 创建模型对象(绑定集合)
let BookModel = mongoose.model('books', BookSchema)

// 暴露模型对象
module.exports = BookModel