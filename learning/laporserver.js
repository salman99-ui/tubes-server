var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors') ;
var mongoose   = require('mongoose');
var model      = require('./schema');
var user       = require('./schema2'); 
var app        = express() ;
var controller = require('./controller');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true }))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/lapor' ,
 {useNewUrlParser : true , useUnifiedTopology : true } , function(err){
	if(err) throw err ;

	console.log('koneksi berhasil')
}) ;

app.listen(3000) ;

app.get('/test'      , controller.show   ) ;
app.get('/test/:id'  , controller.getOne ) ;
app.post('/test'     , controller.insert ) ;
app.get('/search/:data' , controller.search ) ;
app.put('/test/:id'  , controller.update ) ;
app.delete('/test/:id' , controller.delete ) ;


app.post('/register' , controller.register );
app.post('/login'    , controller.login ) ;

app.post('/token' , controller.verify) ;