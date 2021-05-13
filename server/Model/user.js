const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	
		username : {
			type : String ,
			required : [true , "must have username"]
		} ,

		email : {
			type : String ,
			unique : true ,
			required : true 
		} ,

		password : {
			type : String ,
			
		} ,

		ttl : {
			type : String ,
			
		} ,	

		kelamin : {
			type : String ,
			 
		} ,

		nohp : {
			type : String ,
			
		} ,

		alamat : {
			type : String ,
			
		} ,

		avatar : {
			type : String ,
			
		} ,

		cart : [{}] ,

	
})

module.exports = mongoose.model('user' , userSchema)