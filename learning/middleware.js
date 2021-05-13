module.exports = {
	midd : function(req , res , next){
	var time = new Date() ;
	console.log(time.toString());
	next() ;
}
}