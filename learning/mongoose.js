var express = require('express') ;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended : false })) ;


mongoose.connect('mongodb://localhost:9000/Manusia' , {useNewUrlParser : true , useUnifiedTopology : true } , function(err){
	if(err) throw err ;
	console.log("koneksi berhasil");
})



var manSchema = mongoose.Schema({
	name : {
		type : String ,
		required : true 
	} ,
	age : {
		type : Number ,
		required : true ,

	} ,
	address : [{}]
})

var manModel = mongoose.model("manusia" , manSchema) ;

app.listen(8000 , function(){
	console.log("server has running") ;
})

app.get("/api/test",function(req , res){
	manModel.find({},function(err , result){
		res.json({
			status : 200 ,
			err : "null" , 
			data : result
		})
	})
})

app.post('/api/test' , function(req , res){
	var Data = new manModel({
		name : req.body.nama ,
		age : req.body.umur ,
		address : {
			provinsi : req.body.provinsi ,
			kabupaten : req.body.kabupaten
		}
	})

	Data.save(function(err){
	if(err){
		res.json({
			Status : 400 ,
			Err : err ,
			message : "Your data missing"
		})
	}else{
		res.json({
			Status : 200 ,
			Err : err ,
			message : "Your data success save"
		})
	}
		
	})
	})