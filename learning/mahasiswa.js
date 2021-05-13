var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express() ;



app.use(cors()) 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false }))

mongoose.connect("mongodb://localhost:9000/Mahasiswi", { useNewUrlParser : true , useUnifiedTopology : true } , function(err){
	if(err) throw err ;

	console.log("koneksi database berhasil")
})

var mhsSchema = mongoose.Schema({
	nama : {
		type : String ,
		required : [true , "Tolong field nama harus di isi"]
	} , 

	nim : {
		type : String ,
		required : [true , "Tolong field nim harus di isi"]
	} ,

	email : {
		type : String , 
		required : [true , "Tolong field email harus di isi"]
	} ,

	alamat : {
		type : String , 
		required : [true , "Tolong field alamat harus di isi"] 
	} , 

	handphone : {
		type : String , 
		required : [true , "Tolong field handphone harus di isi"]
	} ,

	programstudi : {
		type : String ,
		required : [true , "Tolong field programstudi harus di isi"]
	} ,

	angkatan : {
		type : Number ,
		required : [true , "Tolong field angkatan harus di isi"]
	}
}) ;


var mhsModel = mongoose.model("mahasiswi" , mhsSchema) ;



app.listen(8000 , function(){
	console.log("server has running") ;
})

app.get("/api/data" , function(req , res){
	
	mhsModel.find({} , function(err , result){
		if(err){

			res.json({
				status : 400 ,
				data : err 
			})

		}else{

		res.send(
			 result
		)
	}})
})

app.post("/api/data" , function(req , res){
	var data = new mhsModel({
		nama : req.body.nama , 
		nim  : req.body.nim ,
		email : req.body.email ,
		alamat : req.body.alamat ,
		handphone : req.body.handphone ,
		programstudi : req.body.programstudi ,
		angkatan : req.body.angkatan 
	}) ;

	data.save(function(err){
		if(err) throw err ;
	})

	res.json({
		status : 200 ,
		message : "data has been saved "
	}) ;


})


app.put("/api/data" , function(req , res){
	mhsModel.updateOne({
		nama : req.body.nama } ,
		 {
		 	// set data
		$set : {
			nim  : req.body.nim ,
		email : req.body.email ,
		alamat : req.body.alamat ,
		handphone : req.body.handphone ,
		programstudi : req.body.programstudi ,
		angkatan : req.body.angkatan 

		}

	},

// err handler
	function(err){
		if(err){
			res.json({
				status : 400 ,
				message : "data not updated "
			})
		}
	})
})

app.delete("/api/data/:id" , function(req , res){
	mhsModel.deleteMany({ _id : req.params.id} , function(err){
		if(err){
			res.json({
				status : 400 ,
				message : err 
			})
		}else{

			res.json({
				status : 200 ,
				message : "data success deleted "
			})
		}
	})
})


