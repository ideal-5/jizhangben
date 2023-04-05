var express = require('express');
var router = express.Router();
// 导入moment(处理日期)
const moment = require('moment')
// 导入数据库模型
const AccountModel = require('../../models/AccountModel')
// 引入jwt
const jwt = require('jsonwebtoken')
// 导入检测token的中间件
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')


/* 记账本的列表 */
router.get('/account', checkTokenMiddleware, async function (req, res, next) {
    // 读取数据库集合信息
    try {
        let data = await AccountModel.find().sort({ time: -1 })
        res.json({
            // 响应编号
            code: '0000',
            // 响应信息
            msg: '读取成功',
            // 响应数据
            data: data
        })
    } catch (err) {
        res.json({
            code: '1001',
            msg: '读取失败',
            data: null
        })
    }
})

// 新增记录
router.post('/account', checkTokenMiddleware, async (req, res) => {
    try {
        // 插入数据库
        let data = await AccountModel.create({
            ...req.body,
            time: moment(req.body.time).toDate() // 这里对time进行日期处理 并覆盖了上一行里面的time
        })

        res.json({
            code: '0000',
            msg: '创建成功',
            data: data
        })
    } catch (err) {
        res.json({
            code: '1002',
            msg: '创建失败',
            data: null
        })
    }


})

// 删除列表item
router.delete('/account/:id', checkTokenMiddleware, async (req, res) => {
    let id = req.params.id  // 获取路径中的id
    try {
        let data = await AccountModel.deleteOne({ _id: id })
        res.json({
            code: '0000',
            msg: '删除成功',
            data: {}
        })
    } catch (err) {
        res.json({
            code: '1003',
            msg: '删除账单失败',
            data: null
        })
    }
})

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, async (req, res) => {
    // 获取传过来的id
    let { id } = req.params
    try {
        // 查询数据库
        let data = await AccountModel.findById(id)

        res.json({
            code: '0000',
            msg: '读取成功',
            data: data
        })

    } catch (err) {
        res.json({
            code: '1004',
            msg: '读取失败',
            data: null
        })
    }
})

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, async (req, res) => {
    // 获取传过来的id
    let { id } = req.params
    try {
        // 更新数据库
        let data = await AccountModel.updateOne({ _id: id }, req.body)
        try {
            let retData = await AccountModel.find({ _id: id })
            res.json({
                code: '0000',
                msg: '更新成功',
                data: retData
            })
        } catch (err) {
            res.json({
                code: '1004',
                msg: '读取失败',
                data: null
            })
        }

    } catch (err) {
        res.json({
            code: '1005',
            msg: '更新失败',
            data: null
        })
    }
})

module.exports = router;
