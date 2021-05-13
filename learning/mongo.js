var MongoClient = require('mongodb').MongoClient ;

MongoClient.connect("mongodb://localhost:9000/" , {useNewUrlParser : true , useUnifiedTopology : true } , function(err , db){
	if(err) throw err ;

	console.log("connected to mongodb");

	var dbo = db.db("Orang");

	dbo.collection("orangs").find().sort({name : 1 }).toArray(function(err , result){

		if(err) throw err ;
		console.log(result);
		db.close();	
	});

	
}) ;