const fs = require('fs')
const user = require('../Model/user')
const path = require('path')

exports.delete = (req , res , next) => {
	const filepath = path.join(__dirname , '../../', 'images/1617678165485-Guido.jpg')
	fs.unlink(filepath , err => console.log(err))
	res.status(200).json({
		message : "success"
	})
}