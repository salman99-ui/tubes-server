var mongoose = require('mongoose')

var Schema = mongoose.Schema({

	Name : {
		type : String ,
		required : [true , "Must Have name"]
	} ,

	Price : {
		type : Number 
	} ,

	Describe : {
		type : String
	} ,

	linksImg : {
		type : String 
	}
})

module.exports = mongoose.model('tamu' , Schema)