const mongoose = require('mongoose')

const userSche = mongoose.Schema({
	username : {
		type : String ,
		required : [true , "Must have username "]
	} ,

	email : {
		type : String ,
		required : [true , "Must have a email "]
	} ,

	password : {
		type : String ,
		required : [true , "Must have a password"]
	}
})

module.exports = mongoose.model('user' , userSche)