var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mysql = require('mysql');


var conn = mysql.createConnection({
	host : 'localhost' ,
	user : 'root' ,
	password : '',
	database : 'db_belajar_golang'
});

conn.connect(function(err){
	if (err) throw err ;
	console.log('koneksi berhasil');
})

var app = express();
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','hbs');
app.use(bodyParser.urlencoded({extended : false}));
app.use('/cssFiles',express.static(__dirname + '/assets'));

app.route('/book')
.get(function(req , res){
	res.end('this is get')
})

app.get('/home',function(req , res){
	conn.query("select * from tb_student",function(req , result){
		res.render('home',{
			results : result 
		})
	})
})

app.listen(8000 , function(req , res){
	console.log('server has running')
})