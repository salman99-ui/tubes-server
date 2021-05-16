var express = require('express')
var mongoose = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')
var path = require('path')
var app = express() 

const authRoutes = require('./Routes/auth')
const dataRoutes = require('./Routes/data')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false }))
app.use(cors())
app.use('/images' , express.static(path.join(__dirname + "/assets/images")))

app.use((req , res , next) => {
	console.log("request success")
	next()
})



app.use('/auth' , authRoutes)
app.use('/data' , dataRoutes)


mongoose.connect('mongodb://localhost:9000/pwl' ,  {useUnifiedTopology : true , useNewUrlParser : true })
.then( () => {
	console.log('server has running')
	app.listen('4000')
}).catch(err => {
	console.log(err)
})