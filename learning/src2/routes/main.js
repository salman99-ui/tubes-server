const express = require('express')
const router = express.Router()

const Controller = require('../controller/main')

router.get('/' , Controller.getData)
router.post('/' , Controller.insertData)

module.exports = router