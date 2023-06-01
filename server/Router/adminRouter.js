const Router = require("express").Router
const adminController = require("../Controllers/adminController")
const { check } = require('express-validator')
const authMW = require('../middlewares/authMW')
const roleMW = require('../middlewares/roleMW')
const router = new Router()

//дОктора
router.post('/doctor/add', adminController.addDoc)
router.delete('/doctor/del/:id',adminController.deleteDoc)
router.put('/doctor/edit/:id',adminController.editDoc)
router.get('/doctor/getAll',adminController.getDocs)

//Менеджеры

router.get('/staff/getAll',adminController.getStaff)
router.put('/stuff/edit/:id',adminController.editStuff)
router.delete('/stuff/del/:id',adminController.deleteStuff)
//Админы
router.post('/login', adminController.login)
router.post('/addAdmin',adminController.addAdmin)
// router.delete('/doctor/delete',adminController.deleteDoc)
router.post('/staff/add',adminController.addStuff)
// router.get('/me',authController.getMe)

// router.post('/pacient/add',adminController.addPac)


// router.get('/me',authMW(),adminController.getMe)


module.exports = router