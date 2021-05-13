var model = require('./schema');
var user  = require('./schema2');
var jwt   = require('jsonwebtoken');

module.exports = {
	show : function(req , res){
		model.find( {} , (err , result ) => {
			res.json({
				status : 200 ,
				data : result
			})
		})
	} ,


	insert : function(req , res){
		model.create({
			
			nama    : req.body.nama ,
			laporan : req.body.laporan ,
			aspek   : req.body.aspek 
		} , 

 		function(err){
 			if(err) throw err ;

 			res.json({
 				message : "Created" ,
 				status  : 201 
 			 })
 		   }
		)
	} ,

	update : function(req , res){
		model.updateOne({
			_id : req.params.id
		} , 

		{
			nama    : req.body.nama ,
			laporan : req.body.laporan ,
			aspek   : req.body.aspek 
		} ,

		function(err){
			if(err) throw err ;

			res.json({
				status  : 200 , 
				message : "success updated"
			})
		  }
		)
	  } ,


	  delete : function(req , res){

	  	model.deleteOne({
	  		_id : req.params.id
	  	} , 

	  	function(err){
	  		if(err) throw err ;

	  		res.json({
	  			status   : 200 ,
	  			message  : "data has been delete"
	  		})
	  	  }
	  	)
	  } ,


	  getOne : function(req , res){
	  	
	  	model.findOne({ _id : req.params.id } , (err , result) =>{
	  		res.json(result)
	  	})

	  } ,


	  search : function(req , res){
	  	model.find({

	  		aspek : {
	  			$regex : '.*' + req.params.data + '.*' ,
	  			$options : 'i'
	  		}
	  	} , 

	  	function(err , result){
	  		if(err) throw err ;

	  		res.json(result)
	  	 })
	  } ,


	  register : function(req , res){
	  	user.create({

	  		name     : req.body.name  ,
	  		email    : req.body.email ,
	  		password : req.body.password 
	  	} , 

	  	function(err , data){
	  		if(err) throw err ;

	  		res.json({
	  			err     : null ,
	  			message : "success" ,
	  			status  : 201 
	  		})

	  	  }

	  	)
	  } ,


	  login : function(req , res){
	  	user.findOne({
	  		email : req.body.email 
	  	} , 

	  	function(err , result){
	  		if(err) throw err ;

	  		if(!result){
	  			res.json({ status : 400})
	  		}else{

	  			if(result.password != req.body.password){
	  				res.json({ status : 401 })

	  			}else{
	  				let payload = { subject : result._id }
	  				let token   = jwt.sign(payload , 'secretkey') ;

	  				res.json({
	  					status : 200 ,
	  					token  : token
	  				})
	  			}
	  		}}
	  	)	
	  } ,

	  verify : function(req , res){
	  	let token   = req.body.token ;
	  	let payload = jwt.verify(token , "secretkey") ;

	  	user.findOne({
	  		_id : payload.subject 
	  	} , 

	  	function(err , result){
	  		if(!result) res.json({status : 401 })
	  			res.json({
	  				status : 200 ,
	  				message : "success"
	  			})
	  	 })
	  }




}