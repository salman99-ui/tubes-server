const user = require('../Model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = (req , res , next) => {
	let {email , username , password } = req.body

	if(!username || !email || !password){
		res.status(400).json({
			message : 'field register should not empty '
		})
	}

	bcrypt.hash(password , 10)
	.then( hash => {
			const Data = new user({
				
				username : username ,
				email : email ,
				password : hash
			
		})


		Data.save().then( result => {
			res.status(201).json({
				message : "Success" ,
				data : result 
			})
		})

	})

	.catch(err => {
		res.status(500).json({
			message : "Internal Server Error"
		})
	})
}

exports.registerGoogle = (req , res , next) => {
	const {name , email } = req.body

	const Data = new user({
					 username : name ,
					 email : email
				})

	Data.save()
		.then(result => {
			 res.status(201)
			 	.json({ message : "Register Success" }) })
}

exports.login = (req , res , next) => {
	var { email , password} = req.body 

	if(!email || !password){
		res.status(400).json({
			message : "field login should not empty"
		})
	}

	user.findOne( {email : email})
	.then(User => {

		if(!User){
			res.status(400).json({
				message : "User Not Found"
			})
		}

		bcrypt.compare(req.body.password , User.password )
		.then(valid => {

			if(!valid){
				res.status(400).json({
				message : "Incorrect Password"
			})
			}
			const token = jwt.sign({id : User._id } , "130417" , {expiresIn : '24h'})

			res.status(200).json({
				message : "Success" , 
				token : "Bearer_" + token 
			})

			
		})
		.catch(err => {
			console.log(err)
		})
	})
}

exports.checkuser = (req , res , next) => {
	const { email , name } = req.body

	user.findOne({email : email})
		.then(User => {
			if( !User ){
				const Data = new user({
					username : name ,
					email : email
				})

				Data.save().then( result => {
					res.status(201).json({
						message : "Created" ,
						data : result
					})
				})
			}

			res.status(200).json({
				status : "Success Login" ,
				data : User
			})
		})
}

exports.updateUser = (req , res , next) => {
	const {token , name , ttl , gender , nohp , email , alamat} = req.body

	var Token = token.replace("Bearer_" , "")
	payload = jwt.verify(Token , "130417")
	console.log(payload.id)
	

	
}

exports.googleLogin = (req , res , next) => {
		const {email , name } = req.body 

		user.findOne({email : email})
			.then( User => {
				if(!User){
					const Data = new user({
						  username : name ,
						  email : email
					})

					Data.save().then(result => {
						let token = jwt.sign({id : result._id } , "130417" , { expiresIn : '24h'})

						res.status(201).json({
							message : "Register Success" ,
							token : token

						})
					})
				}

			let token = jwt.sign({id : User._id } , "130417" , { expiresIn : '24h'})

			res.status(201).json({ message : "Register Success" , token : token })



		})
}