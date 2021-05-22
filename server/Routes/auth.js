const express = require('express')
const controller = require('../Controller/auth')
var Routes = express.Router()

Routes.post('/register' , controller.register)
Routes.post('/googleregister' , controller.registerGoogle)
Routes.post('/login' , controller.login )
Routes.post('/check' , controller.checkuser)
Routes.post('/update' , controller.updateUser)
Routes.post('/googlelogin' , controller.googleLogin)
Routes.post('/checkemail' , controller.checkEmail)
Routes.post('/changepassword' , controller.changePassword)
module.exports = Routes