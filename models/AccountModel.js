
// 书籍集合
const mongoose = require('mongoose')

// 创建文档的结构对象
let AccountSchema = mongoose.Schema({
    title: {          //名称
        type: String,
        required: true
    },
    time: Date,    // 日期
    type: {       // 支出或的收入
        type: Number,
        default: -1
    },
    account: {     // 金额
        type: Number,
        required: true
    },
    remarks: String   // 描述
})

// 创建模型对象(绑定集合)
let AccountModel = mongoose.model('account', AccountSchema)

// 暴露模型对象
module.exports = AccountModel