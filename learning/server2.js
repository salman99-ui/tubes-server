var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')


var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:9000/Orang?authSource=admin',{useNewUrlParser : true , useUnifiedTopology : true },function(err){
	if(err) throw err ;
	console.log('koneksi mongo db berhasil');
})


var orangSch = mongoose.Schema({
	name : {
		type : String,
		required : [true , "tidak boleh kosong"]
	} ,
	umur : {
		type : Number ,
		required : [true , "tidak boleh kosong"]
	},
	ttl : {
		type : String ,
		required : [true , "tidak boleh kosong"]
	},
	created : {
		type : Date ,
		default : Date.now()
	}
})

var OrgModel = mongoose.model('orang',orangSch)


OrgModel.bulkWrite([
{
	insertOne : {
		document : {
			name : "Noval" ,
			umur : 90 ,
			ttl : "mauk"
		}
	}
} ,

{
	updateOne : {
		filter : {
			_id : "5f58ff34476aa84368ccede9"
		} ,
		update : {
			$set : {
				name : "Salman Damanhuri"
			}
		}

	}
}
])


app.get('/api/data', function(req , res){
 OrgModel.find({},function(err , result){
 	if(err) throw err ;

 	res.json(result)
 })
})

app.post('/api/data',function(req , res){
	var orang = new OrgModel({
		name : req.body.name ,
		umur : req.body.umur ,
		ttl  : req.body.ttl  
	})

	orang.save(function(err){
		if(err) throw err ;

		res.json({
			err : null ,
			message : "success" ,
			data : orang
		})
	})
})

app.put('/api/data/:id', function(req , res){
	OrgModel.updateOne({
		_id : req.params.id
	},{
		$set : {
			name : req.body.name ,
			umur : req.body.umur ,
			ttl  : req.body.ttl  
		}
	},function(err){
		if(err) throw err ;

		res.json({
			err : null ,
			message : "data has modified" ,
			data : {
				name : req.body.name ,
				umur : req.body.umur ,
				ttl  : req.body.ttl  
			}
		})
	})
})

app.delete('/api/data/:id',function(req , res){
	OrgModel.deleteOne({
		_id : req.params.id
	},function(err){
		if(err) throw err ;

		res.json({
			err : null ,
			message : "data has been deleted" 
		})
	})
})

app.post('/api/login',function(req , res){
	OrgModel.findOne({ name : req.body.name },function(err , result){
		

		if(!result){
			res.json({
				data : null ,
				message : "data not found" ,
				status : 404
			})
		}else{
			res.json({
				data : result ,
				message : "data found" ,
				status : 200
			})
		}
	})
})

app.listen(8000,function(){
	console.log('server has running')
})
