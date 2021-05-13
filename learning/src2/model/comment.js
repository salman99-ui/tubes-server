const mongoose = require('mongoose')

const comSchema = mongoose.Schema({
	nama : {
		type : String ,
		required : [true , 'Must Have a Name']
	} ,

	aspek : {
		type : String ,
		enum : ["Dosen" , "Mahasiswa" , "Tendik" , "LTPB"] ,

	} ,

	laporan : {
		type : String ,
		required : [true , "Must Have a Laporan"]
	} ,

	bukti : {
		type : String ,
		required : [true , "Must Have file"]
	}
} ,

{
	timestamps : true
})

module.exports = mongoose.model('comment' , comSchema)