const jwt = require('jsonwebtoken')

module.exports = (req , res , next) => {
	try{
		const token = req.headers.authorization
		const decodeToken = jwt.verify(token , "130417")
		const userId = decodeToken.userId
		if(req.body.userId !== userId){
			throw "Invalid user ID"
		}else{
			next()
		}
	}
	catch{
		res.status(401).json({
			err : "Invalid Request !"
		})
	}
}