var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel') //导入用户模型
const md5 = require('md5')  // 导入加密
// 导入jwt(生成、校验token的)
const jwt = require('jsonwebtoken')


// 点击登录
router.post('/login', (req, res) => {
    // 获取用户名与密码
    let { username, password } = req.body
    UserModel.findOne({ username: username, password: md5(password) }) // 根据用户提交的账号密码查询数据库 如果有返回数据 没有返回null
        .then((data) => {
            if (!data) {  // 如果没有查询出数据
                res.json({
                    code: '2002',
                    msg: '用户名或密码错误',
                    data: null
                })
                return
            }
            // 创建当前用户的token
            let token = jwt.sign({
                username: data.username,
                _id: data._id
            }, 'ideal', {
                expiresIn: 60 * 60 * 24 * 7
            })
            // 响应token
            res.json({
                code: '0000',
                msg: '登录成功',
                data: token
            })
        })
        .catch((err) => {
            res.json({
                code: '2001',
                msg: '数据库读取失败',
                data: null
            })
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
