const express = require('express')
const router = express.Router()
const router_function = require('../router_function/router_function')

/* const expressJoi = require('@escook/express-joi')
const { mima } = require('../schema/user') */

//登录路由
router.post('/api/login'/*, expressJoi(reg_login_schema)*/, router_function.login)

//注册路由
router.post('/api/reguser', router_function.reguser)

//获取名字路由
router.get('/api/username', router_function.username)

//退出登录路由
router.post('/api/logout', router_function.logout)

//注册名字检测是否已被占用路由
router.post("/api/chachong", router_function.chachong)


router.post("/api/xx", router_function.xx)

//验证表单内容是否符合规则路由
// router.post('/api/rules',/*  expressJoi(mima), */ router_function.rules)

module.exports = router