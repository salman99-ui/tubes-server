var mongoose = require('mongoose');

const PrakpamSchema = mongoose.Schema({
	name:String,

	email: String,
	
	phone:String,
	
	picture:String,
	
	salary:String,
	
	position:String
})
module.exports = mongoose.model("tabel", PrakpamSchema)