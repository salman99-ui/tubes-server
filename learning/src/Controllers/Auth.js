const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../Model/user')
exports.sign = (req , res , next) => {

	bcrypt.hash(req.body.password , 10)

	.then((hash) => {
		const User = new user({
			username : req.body.username ,
			password : hash
		})

		User.save().then((data) => {
			res.status(201).json({
				message : 'Success' ,
				data : data
			})
		})
	})

	.catch((err) => {
		res.status(500).json({
			error : err
		})
	})
}

exports.login = (req , res , next) => {
	user.findOne({
		username : req.body.username 

	})
	.then((user) => {

		if(!user){
			res.status(401).json({
				message : "User Not Found !"
			})
		}

		bcrypt.compare(req.body.password , user.password)

		.then(valid => {
			if(!valid){
				res.status(401).json({
					message : "Password Incorrect"
				})
			}

			const Token = jwt.sign(
				{ userId : user._id } ,
				"130417" ,
				{expiresIn : '24h'} 
			)

			res.status(200).json({
				user_Id : user._id ,
				token : Token
			})
		})

		.catch( err => {
			res.status(500).json({
				err : err
			})
		})

	})

	.catch( err => {
		res.status(500).json({
			err : err
		})
	})	
}

exports.getData = (req , res , next) => {
	user.find().then(user => {
		res.status(200).json({
			status : 200 , 
			message : "Success" ,
			data : user
		})
	})
	.catch(err => {
		res.status(500).json({
			err : "Internal Server Error"
		})
	})
}