var mongoose = require('mongoose');
var express =require('express');
var bodyParser = require('body-parser') ;
var cors = require('cors');
var app = express();
app.use(bodyParser.urlencoded({extended : false }));
app.use(bodyParser.json()) ;
app.use(cors());



mongoose.connect('mongodb://localhost:27017/mongos',{useNewUrlParser : true , useUnifiedTopology : true },function(err){
	if(err) throw err ;

	console.log('koneksi mongo berhasil');
});

var MahaSchema = mongoose.Schema({
	name : {
		firstname :{
			type : String 
		} , 
		lastname : {
			type : String
		}
	} , 
	Asal : {
		type : String
	} ,

	Umur : {
		type : Number 
	} ,

	ProgramStudi : {
		type : String
	} ,

	Created : {
		type : Date ,
		default : Date.now
	}
});

var Mahasiswa = mongoose.model('Mahasiswa',MahaSchema) ;

app.listen(8000 , function(){
	console.log('server start');
})


app.get('/data/api', function(req , res){
	Mahasiswa.find({} , function(err , result){
		res.json(result);
	})
})

app.post('/data/api',function(req , res){
	var mahasiswaBaru = new Mahasiswa({
		name : {
			firstname : req.body.firstname ,
			lastname  : req.body.lastname 
		} ,
		Asal : req.body.asal , 
		Umur : req.body.umur ,
		ProgramStudi : req.body.program
	})

	mahasiswaBaru.save(function(err){
		if(err) throw err ;

		res.json({
			message : "dat has been saved" ,
			err     : null ,
			status  : 200 ,
			Data : req.body

		})
	})
})

app.put('/data/api',function(req , res){
	Mahasiswa.updateOne({_id : req.body.id} , {
		$set : {
			ProgramStudi : "Teknik Manajemen"
		}
	},function(err){
		if(err) throw err ;

		res.json({
			message : "dat has been updated" ,
			err     : null ,
			status  : 200 
		})
	})
})

app.delete('/data/api',function(req , res){
	Mahasiswa.deleteOne({_id : req.body.id},function(err){
		res.json({
			message : "dat has been deleted" ,
			err     : null ,
			status  : 200 
		})
	})
})

