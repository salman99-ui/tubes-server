const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


const NinjaSchema = new Schema({
	_id : {
		type : Number
	} , 
	name : {
		type : String 
	},

}) ;

const Ninja = mongoose.model('customers',NinjaSchema);

module.exports = Ninja ;