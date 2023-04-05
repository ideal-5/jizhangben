const express = require('express');
// 创建路由对象
const router = express.Router();
// 导入moment(处理日期)
const moment = require('moment')
// 导入数据库模型
const AccountModel = require('../../models/AccountModel')
// 检测是否登录的中间件
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')



// 首页路由规则
router.get('/', (req, res) => {
  // 重定向
  res.redirect('/account')
})


/* 记账本的列表 */
router.get('/account', checkLoginMiddleware, async function (req, res, next) {
  // 读取数据库集合信息
  try {
    let data = await AccountModel.find().sort({ time: -1 })
    res.render('list', { accounts: data, moment })
  } catch (err) {
    res.status(500).send('数据库读取错误')
  }
});

// 添加记录
router.get('/account/create', checkLoginMiddleware, (req, res, next) => {
  res.render('create')
})

// 新增记录
router.post('/account', checkLoginMiddleware, async (req, res) => {
  try {
    // 插入数据库
    let data = await AccountModel.create({
      ...req.body,
      time: moment(req.body.time).toDate() // 这里对time进行日期处理 并覆盖了上一行里面的time
    })
  } catch (err) {
    res.status(500).send('插入数据库失败~~')
  }
})

// 删除列表item
router.get('/account/:id', checkLoginMiddleware, async (req, res) => {
  let id = req.params.id  // 获取路径中的id
  try {
    let data = await AccountModel.deleteOne({ _id: id })
    res.render('success', { msg: '删除成功了', url: '/account' })
  } catch (err) {
    res.status(500).send('删除数据库失败')
  }
})

module.exports = router;
