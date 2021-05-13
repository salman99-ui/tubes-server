const {validationResult} = require('express-validator')
const dataSchema     = require('../../schema2')

exports.createProduct = (req , res , next) => 
		{
			const errors = validationResult(req)

			if(!errors.isEmpty()){
				const err = new Error("Invalid request")
				err.status = 400 
				err.data = errors.array()
				throw err 
			}

			const post = new dataSchema({
				title : req.body.title ,
				body : req.body.body ,
				author : {
					uid : 1 , 
					name : 'salman'
				}
			})

			post.save().then( result => {
				res.status(201).json({
					message : 'create blog success' ,
					data : result
				})
			})
			.catch(err => {
				throw err
			})

				
		}  

exports.getAllProduct = (req , res , next) => 
	{
		res.json({
			name : "salman"
		})
	}