// 检测登录中间件
module.exports = (req, res, next) => {
    // 判断session存在否
    if (!req.session.username) {
        res.redirect('/login')  // 如果session 不存在 跳往登录页面
        return
    }
    next()
}