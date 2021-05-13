const express = require('express')
const controller = require('../Controller/auth')
var Routes = express.Router()

Routes.post('/register' , controller.register)
Routes.post('/login' , controller.login )
Routes.post('/check' , controller.checkuser)
Routes.post('/update' , controller.updateUser)
Routes.post('/googlelogin' , controller.googleLogin)
module.exports = Routes