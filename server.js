var express = require('express');
var fs = require('fs');
var mustache = require('mustache');

//var server = express.createServer();
// express.createServer()  is deprecated. 
var server = express(); // better instead

server.configure(function(){
	var oneDay = 86400000;		//cache static files
  	server.use('/model', express.static(__dirname + '/model'));
  	server.use(express.static(__dirname + '/public', { maxAge: oneDay }));
  	sej
});

var demoData = [{ // dummy data to display
"name":"Steve Balmer",
"company": "Microsoft",
"systems": [{
"os":"Windows XP"
},{
"os":"Vista"
},{
"os":"Windows 7"
},{
"os":"Windows 8"
}]
},{
"name":"Steve Jobs",
"company": "Apple",
"systems": [{
"os":"OSX Lion"
},{
"os":"OSX Leopard"
},{
"os":"IOS"
}]
},{
"name":"Mark Z.",
"company": "Facebook"
}];

server.get('/app/:slug', function(req,res){
	var slug = [req.params.slug][0];
	var data = {records:demoData};
	var page = fs.readFileSync(__dirname + '/app/' + slug,'utf8');
	var html = mustache.to_html(page,data);
	//console.log(html);
	
	res.send(html);
});
server.listen(process.env.PORT || 3000);
