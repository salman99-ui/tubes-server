
const express	 = require('express')
const router 	 = express.Router()
const controller = require('../Controllers/Delete')

router.get('/' , controller.delete)

module.exports = router
