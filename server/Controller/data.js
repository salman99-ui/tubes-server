var dataTamu = require('../Model/ruangtamu') 
var dataTidur = require('../Model/ruangtidur')
var dataDekor = require('../Model/dekors')

exports.ruangTamu = (req , res , next) => {
	dataTamu.find().then( result => {
		res.status(200).json({
			data : result
		})
	})
}


exports.ruangTidur = (req , res , next ) => {
	dataTidur.find().then( result => {
		res.status(200).json({
			data : result
		})
	})
}


exports.ruangDekor = (req , res , next) => {
	dataDekor.find().then( result => {
		res.status(200).json({
			data : result
		})
	})
}
