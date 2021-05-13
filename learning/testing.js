var express = require('express') ;
var controller = require('./test');
var app = express() ;
var middleware = require('./middleware') ;


app.use(middleware.midd)
app.set('view engine' , 'ejs')
app.route('/test')
.get(controller.index)
.post(controller.post)

app.get('/testing' , function(req , res){
	const data = {
		name : "salman damanhuri"
	} ;

	res.render('index',{data : data })
})


app.listen(8000 , function(){
	console.log('server has running') ;
})