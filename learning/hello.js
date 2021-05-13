var express = require('express') ;
var mysql = require('mysql');
var bodyParser = require('body-parser');

var conn = mysql.createConnection({
	host : "localhost" ,
	user : "root" ,
	password : "" ,
	database : "pekerja"
}) ;

var app = express();

app.use(bodyParser.urlencoded({extended : false })) ;
app.use(bodyParser.json()) ;

app.listen(8000,function(){
	console.log('server has running');
})


app.get('/api/employees' , function(req , res){
	var sql = "select * from pekerja" ;
	conn.query(sql , function(err , result){
		if(err) throw err ;
		res.json({
			"status" : 200 ,
			"err" 	 : null ,
			"data"   : result
		})
	})
})

app.post('/api/employees' , function(req , res){
	var sql = "insert into pekerja values('" + req.body.nama + "','" + req.body.email + "')" ;
	conn.query(sql , function(err , result){
		if(err) throw err ;
		res.json({
			"status" : 200 ,
			"err" 	 : null ,
			"message" : "Data has been saved" 
		}) 
	}) 
})

app.put('/api/employees', function(req , res){
	var sql = "update pekerja set email = '" + req.body.email + "' where nama = '" + req.body.nama + "'" ;

	conn.query(sql , function(err , result){
		if(err) throw err ;

		res.json({
			"status" : 200 ,
			"err" 	 : null ,
			"message" : "Data has been saved" 
		})
	})
})

app.delete('/api/employees/:nama' , function(req , res){
	conn.query("delete from pekerja where nama = '" + req.params.nama + "'" , function(err , result){
		if(err) throw err ;
		res.json({
			"status" : 200 ,
			"err" 	 : null ,
			"message" : "Data has been delete" 
		})

	})
})
