const mongoose = require('mongoose')

const userSche = mongoose.Schema({
	username : {
		type : String ,
		required : [true , "Must have username "]
	} ,

	nim : {
		type : String ,
		required : [true , "Must have a email "]
	} ,

	
})

module.exports = mongoose.model('test' , userSche)