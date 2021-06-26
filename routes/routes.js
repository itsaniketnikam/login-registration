const express = require('express')
const router = express.Router()
const usrCtrl = require('../controller/userController')
const authGuard= require('../middleware/tokenAccess')

router.post('/users/register',usrCtrl.register)
router.post('/users/login',usrCtrl.login)

router.post('/users/addresses',authGuard.auth,usrCtrl.saveAddress)
// router.get('/users',usrCtrl.getAll)

module.exports = router