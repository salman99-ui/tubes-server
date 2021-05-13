module.exports = {
	index : function(req , res){
		res.send('ini get') ;
	} ,

	post : function(req , res){
		res.send('ini post') ;
	}
}

exports.display = function(req , res){
	res.send('nama salman') ;
}