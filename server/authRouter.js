const Router = require("express").Router
const authController = require("./authController")
const { check } = require('express-validator')
const authMW = require('./middlewares/authMW')
const roleMW = require('./middlewares/roleMW')
const router = new Router()
router.post('/registration',[
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], authController.registration)
router.post('/login',authController.login)
router.get('/users',roleMW(["ADMIN"]),authController.getUsers)

module.exports = router