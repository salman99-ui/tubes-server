var mongoose = require('mongoose');

var blogschema = mongoose.Schema({
	title : {
		type : String ,
		required : true 
	},
	author : {
		type : Object ,
		required : true 
	},
	body : {
		type : String ,
		required : true 
	}
} , {
	timestamps : true 
})

module.exports = mongoose.model('blogpost' , blogschema)