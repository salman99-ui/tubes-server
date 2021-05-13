var url = require('url');

var addr = 'http://www.petanikode.com/search.php?year=2018&month=february';
var q = url.parse(addr,true);

console.log("nama protocol : " + q.protocol);