// 声明检测token中间件
module.exports = (req, res, next) => {
    // 获取请求头中的token
    let token = req.get('token')
    // 校验token
    if (!token) {  // 如果token为空 返回token缺失
        return res.json({
            code: '2003',
            msg: 'token缺失',
            data: null
        })
    }
    jwt.verify(token, 'ideal', (err, data) => {
        if (err) {   // 如果err有值 说明token校验失败
            res.json({
                code: '2004',
                msg: 'token校验失败',
                data: null
            })
            return
        }
        // token没错执行下面代码
        next()
    });
}