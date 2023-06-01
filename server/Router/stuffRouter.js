const Router = require("express").Router
const stuffController = require("../Controllers/staffController")
const { check } = require('express-validator')
const authMW = require('../middlewares/authMW')
const roleMW = require('../middlewares/roleMW')
const router = new Router()
// router.post('/registration',[
//     check('username', "Имя пользователя не может быть пустым").notEmpty(),
//     check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
// ], authController.registration)
router.post('/login',stuffController.login)
// router.get('/users',roleMW(["admin"]),doctorController.getUsers)
// router.get('/me',doctorController.getMe)
router.get('/about/:id',stuffController.getMe)


module.exports = router