const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const user = require('../model/user')
const test = require('../model/test')

exports.signup = (req , res , next) => {
	const {username , email , password } = req.body

	bcrypt.hash(password , 10 )
	.then(hash => {
		const Data = new user({
			username : username ,
			email : email ,
			password : hash
		})

		Data.save().then(result => {
			let token = jwt.sign({id : result.id } , '130417' , {expiresIn : '24h'})
			
			res.status('201').json({
				message : "Success" ,
				data : result ,
				token : token
			})
		})

		.catch(err => {
			res.status(500).json({
				message : "Server Error" , 
			})
		})
	})
}

exports.login = (req , res , next) => {
	user.findOne({
		email : req.body.email
	})

	.then( User => {
		if(!User){
			res.status(401).json({
				message : "User Not Found !"
			})
		}

		bcrypt.compare(req.body.password , User.password)
		.then(valid => {
			if(!valid){

				res.status(401).json({
				message : "Incorrect Password !"
			  })
					
			}

			

			console.log(valid)

		})
	})
}

exports.test = (req , res , next) => {
	console.log(req.body)
	const Data = new test({
		username : req.body.username ,
		nim : req.body.nim
	})

	Data.save().then(result => {
		res.status(200).json({
			message : 'Success' ,
			data : result
		}) 

		console.log("Success")
	})

	.catch(err => {
		console.log(err)
	})
}	