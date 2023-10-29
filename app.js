const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
app.use(cors())
//session中间件
app.use(session({
    secret: 'aaa',
    resave: false,
    // resave: true,
    saveUninitialized: true
}))
// const joi = require('@hapi/joi')
const userRouter = require('./router/router')
app.use(express.static('./web'))
/* app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
}) */
app.use(express.urlencoded({ extended: false }))
/* app.use(function (err, req, res, next) {
    if (err instanceof joi.ValidationError) return res.cc(err)
    res.cc(err)
}) */
app.use(userRouter)

// 定义错误级别中间件
/* app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        // 验证失败报错
        return res.send({ status: 1, msg: '请输入' })
    }
    // 未知错误
    return res.send({
        status: 1,
        msg: '未知错误'
    })
}) */


app.listen(80, () => {
    console.log('http://127.0.0.1')
})
