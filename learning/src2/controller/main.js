const comment = require('../model/comment')

exports.getData = (req , res ,next) => {
	comment.find().then(result => {
		res.json({
			data : result
		})
	})
}

exports.insertData = (req , res , next ) => {
	if(!req.file){
		res.status(400).json({
			message : "Harus ada file "
		})
	}

console.log(req.file)

	// const Comment = new comment({

	// 	nama : req.body.name ,
	// 	aspek : req.body.aspek , 
	// 	laporan : req.body.laporan  , 
	// 	bukti : req.file.path 
	// })

	// Comment.save().then(data => {
	// 	res.status(201).json({
	// 		message : "Success" ,
	// 		data : data
	// 	})
	// })
	// .catch(err => {
	// 	res.status(500).json({
	// 		message : "Internal Server error "
	// 	})
	// })
}