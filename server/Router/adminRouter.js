const Router = require("express").Router
const adminController = require("../Controllers/adminController")
const { check } = require('express-validator')
const authMW = require('../middlewares/authMW')
const roleMW = require('../middlewares/roleMW')
const router = new Router()
router.post('/doctor/add', adminController.addDoc)
router.delete('/doctor/delete',adminController.deleteDoc)
// router.get('/users',roleMW(["admin"]),adminController.getDoc)
// router.get('/me',authController.getMe)
router.get('/doctor/getAll',adminController.getDocs)
router.put('/doctor/edit/:id',adminController.editDoc)
router.delete('/doctor/del/:id',adminController.deleteDoc)
// router.get('/me',authMW(),adminController.getMe)


module.exports = router