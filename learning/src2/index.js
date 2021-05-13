var express = require('express')
var mongoose = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')

var path = require('path')

var app = express()

const mainRoutes = require('./routes/main')
const authRoutes = require('./routes/auth')
const authFile = require('./middleware/multer')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false }))
app.use(cors())

app.use('/images' , express.static(path.join(__dirname + "/assets/images")))
app.use((req , res , next) => {
	console.log("request success")
	next()
})
app.use('/main' , authFile , mainRoutes)
app.use('/auth' , authRoutes)
app.use('/image' , authFile , (req , res , next) => {
	if(!req.file){
		res.send('Invalid')
	}

	res.json({
		name : req.file.filename ,
		path : req.file.path
	})
})


mongoose.connect("mongodb://localhost:9000/comment" , {useUnifiedTopology : true , useNewUrlParser : true })
.then( () => {
	console.log("Server has running")
	app.listen(4000)
})
.catch((err) => {
	console.log(err)
})
