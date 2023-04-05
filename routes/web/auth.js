var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel') //导入用户模型
const md5 = require('md5')  // 导入加密


// 注册页面
router.get('/reg', (req, res) => {
    // 响应html
    res.render('reg')
})
// 点击注册
router.post('/reg', async (req, res) => {
    try {
        // 获取请求体数据
        let data = await UserModel.create({ ...req.body, password: md5(req.body.password) }) //将用户提交的账号密码md5加密后插入数据库
        res.render('success', { msg: '注册成功', url: '/login' })
    } catch (err) {
        res.status(500).send('注册失败')
    }
})


// 登录页面
router.get('/login', (req, res) => {
    // 响应html
    res.render('login')
})
// 点击登录
router.post('/login', (req, res) => {
    // 获取用户名与密码
    let { username, password } = req.body
    UserModel.findOne({ username: username, password: md5(password) }) // 根据用户提交的账号密码查询数据库 如果有返回数据 没有返回null
        .then((data) => {
            if (!data) {  // 如果没有查询出数据
                res.send('账号或密码错误')
                return
            }
            req.session.username = data.username //给用户写入session
            req.session._id = data._id
            // 如果有数据就是登录成功 跳转到账单列表
            res.render('success', { msg: '登录成功', url: '/account' })
        })
        .catch((err) => {
            res.status(500).send('登录失败')
        })
})


// 退出登录
router.post('/logout', (req, res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', { msg: '退出成功', url: '/login' })
    })
})

module.exports = router;
