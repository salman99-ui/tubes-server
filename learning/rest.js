var express = require('express') ;
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));
app.use('/cssFiles',express.static(__dirname + '/assets'));


var conn = mysql.createConnection({
	host : 'localhost' ,
	user : 'root',
	password : '',
	database : 'db_belajar_golang'
}) ;

conn.connect(function(err){
	if (err) throw err ;
	console.log('koneksi berhasil');
});


app.get('/', function(req , res){
	res.sendFile('index.html',{root : __dirname});
})

app.post('/',function(req , res){
	res.send(req.body);
});

app.get('/api/data', function(req , res){
	conn.query("select * from tb_student" , function(err , results ){
		res.json({"status" : 200 , "err" : null , "Data" : results});
	});
});

app.get('/api/data/:id', function(req , res){
	var q = "select * from tb_student where id = " + req.params.id ;
	conn.query(q , function(err , results ){
		res.json({"status" : 200 , "err" : null , "Data" : results});
	});
});

app.post('/api/data',function(req , res){
const q = "insert into tb_student values('" + req.body.id + "','" + req.body.name + "','" + req.body.age + "','" 
+ req.body.grade + "')" ; 

	conn.query(q,function(err , results){
		if (err) throw err ;

		res.json({
			"status" : 200 ,
			"err" : null ,
			"message" : "data has been added"
		})
	})
})

app.put('/api/data/:id', function(req , res){
	
	var nama = req.body.name ;
	var nilai = req.body.age ;
	var grade = req.body.grade ;

	const sql = "update tb_student set name = '" + nama + "',age = '" + nilai +"', grade = '" + grade +"' where id = " +
	req.params.id ; 
	conn.query(sql , function(err , result){
		if (err) throw err ;

		res.json({"status" : 200 , "err" : null , "message" : "data has been changed" })
	})

})

app.delete('/api/data',function(req , res){
	conn.query("delete from tb_student where id = " + req.query.id , function(err , result){
		if (err) throw err ;

		res.json({
			"status" : 200 ,
			"err" : null ,
			"message" : "data deleted"
		})
	})
})



app.listen(8000,function(){
	console.log('server has running')
});