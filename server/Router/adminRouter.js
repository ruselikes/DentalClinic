const Router = require("express").Router
const adminController = require("../Controllers/adminController")
const { check } = require('express-validator')
const authMW = require('../middlewares/authMW')
const roleMW = require('../middlewares/roleMW')
const router = new Router()
router.post('/doctor/add', adminController.addDoc)
router.post('/login', adminController.login)
router.delete('/doctor/delete',adminController.deleteDoc)
router.post('/staff/add',adminController.addStuff)
// router.get('/me',authController.getMe)
router.get('/doctor/getAll',adminController.getDocs)
router.get('/staff/getAll',adminController.getStaff)
router.put('/doctor/edit/:id',adminController.editDoc)
router.put('/stuff/edit/:id',adminController.editStuff)
router.delete('/doctor/del/:id',adminController.deleteDoc)
router.delete('/stuff/del/:id',adminController.deleteStuff)
router.post('/addAdmin',adminController.addAdmin)
// router.get('/me',authMW(),adminController.getMe)


module.exports = router