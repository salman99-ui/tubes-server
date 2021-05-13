const express		 = require('express')
const router 	 	 = express.Router()
const authController = require('../Controllers/Auth')
const auth 			 = require('../Middleware/Auth')

router.get('/' , authController.sign)

router.get('/data' , auth , authController.getData)

router.post('/login'  , authController.login)


module.exports = router