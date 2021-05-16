var express = require('express')
var Routes = express.Router()

var controller = require('../Controller/data')

Routes.get('/ruangtamu' , controller.ruangTamu)
Routes.get('/ruangtidur' , controller.ruangTidur)
Routes.get('/dekors' , controller.ruangDekor)

module.exports = Routes