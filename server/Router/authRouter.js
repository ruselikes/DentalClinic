const Router = require("express").Router
const authController = require("../Controllers/authController")
const { check } = require('express-validator')
const authMW = require('../middlewares/authMW')
const roleMW = require('../middlewares/roleMW')
const router = new Router()
router.post('/registration', authController.registration)
// router.post('/registration',[
//     check('username', "Имя пользователя не может быть пустым").notEmpty(),
//     check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
// ], authController.registration)
router.post('/login',authController.login)
router.get('/users',authController.getUsers)
router.delete('/delete/:id',authController.delete)

router.put('/edit/:id',authController.edit)
router.get('/me',authMW(),authController.getMe)
router.get('/me/:id',authController.getPacient)

// router.get('/me',authMW(),authController.getMe)


module.exports = router