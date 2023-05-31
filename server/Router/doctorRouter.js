const Router = require("express").Router
const doctorController = require("../Controllers/doctorController")
const { check } = require('express-validator')
const authMW = require('../middlewares/authMW')
const roleMW = require('../middlewares/roleMW')
const router = new Router()
// router.post('/registration',[
//     check('username', "Имя пользователя не может быть пустым").notEmpty(),
//     check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
// ], authController.registration)
router.post('/login',doctorController.login)
// router.get('/users',roleMW(["admin"]),doctorController.getUsers)
// router.get('/me',doctorController.getMe)
router.get('/aboutdoc/:id',doctorController.getMe)


module.exports = router