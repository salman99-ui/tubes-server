const mongoose = require('mongoose')

const express = require('express')

var router = express.Router()

const Controller = require('../controller/auth')

router.post('/sign' , Controller.signup)
router.post('/login' , Controller.login)
router.post('/test' , Controller.test)
router.post('/google-login' , Controller.googleLogin)
module.exports = router