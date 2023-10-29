const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db/MySQL')
// const joi = require('@hapi/joi')

//登录函数
exports.login = (req, res) => {
    const userinfo = req.body
    console.log(userinfo)
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, function (err, results) {
        if (err) return res.send({
            status: 1,
            msg: '登录异常'
        })
        if (!userinfo.username || !userinfo.password) {
            return res.send({
                status: 1,
                msg: '用户名或密码不能为空'
            })
        }
        if (results.length !== 1) return res.send({
            status: 1,
            msg: '不存在该用户的账号信息'
        })
        const comparResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!comparResult) {
            return res.send({
                status: 1,
                msg: '密码错误'
            })
        }
        // req.changeSessionId();
        req.session.user = req.body
        req.session.islogin = true
        return res.send({
            status: 0,
            msg: '登陆成功'
        })
    })
}

//注册函数
exports.reguser = (req, res) => {
    console.log(req.body)
    const sql = 'select * from ev_users where username=?'
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        return res.send({
            status: 1,
            msg: '用户名或密码不能为空'
        })
    }
    db.query(sql, [userinfo.username], function (err, results) {
        if (err) {
            return res.send({
                status: 1,
                msg: '发生未知错误'
            })
        }
        if (results.length > 0) {
            return res.send({
                status: 1,
                msg: '该用户名已被占用'
            })
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, msg: err.msg })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, msg: '注册用户失败，请稍后再试！' })
            }
            // 注册成功
            res.send({ status: 0, msg: '注册成功！' })
        })
    })
}

//获取名字函数
exports.username = (req, res) => {

    if (!req.session.islogin) {
        return res.send({
            status: 1,
            msg: '请先登录'
        })
    }
    return res.send({
        username: req.session.user.username,
        status: 0
    })
}

//退出登录函数
exports.logout = (req, res) => {
    // TODO_04：清空 Session 信息
    req.session.destroy()
    res.send({
        status: 0,
        msg: '退出登录成功',
    })
}

//注册时检测名字是否已被占用函数
exports.chachong = (req, res) => {
    const sql = 'select * from ev_users where username=?'
    const userinfo = req.body.username
    db.query(sql, [userinfo], function (err, results) {
        if (err) {
            return res.send({
                status: 1,
                msg: '发生未知错误'
            })
        }
        if (results.length > 0) {
            return res.send({
                status: 1,
                msg: '该用户名已被占用'
            })
        }
        return res.send({
            status: 0,
            msg: ''
        })
    })
}


exports.xx = (req, res) => {
    console.log(req.body)
    if (!req.body) {
        return res.send({
            status: 1,
            msg: '内容为空'
        })
    }
    res.send({ status: 0, msg: ' 成功！' })
}
//检测表单数据是否符合规则
/* exports.rules = (req, res) => {
    // password = req.body
    console.log(expressJoi(mima))
    if (expressJoi(mima)) {
        return res.send({
            status: 0,
            msg: ''
        })
    }
    else {
        return res.send({
            status: 1,
            msg: '请输入'
        })
    }
}
 */

// s%3AfdgSCdYK_JUcsHq4DLOD4vcIEmXxQNIW.sVQiYLHCuZRERKGKKINOrcG%2FUSbzL6F%2FF9d32rB5k14