const Router = require("express").Router
const appointmentConroller= require("../Controllers/appointmentConroller")
const { check } = require('express-validator')
const authMW = require('../middlewares/authMW')
const roleMW = require('../middlewares/roleMW')
const router = new Router()
router.post('/addNew', appointmentConroller.addAppointment)
// router.post('/login',appointmentConroller.login)
// router.get('/users',roleMW(["admin"]),appointmentConroller.add)
// // router.get('/me',authController.getMe)
// router.get('/me',authMW(),appointmentConroller.getMe)


module.exports = router