var express 		= require('express');
var fs 				= require('fs');
var mustache 		= require('mustache');
var config      	= require('./config');
var log             = require('./log')(module);
var ModelFactory    = require('./api/model').ModelFactory;

//var server = express.createServer();
// express.createServer()  is deprecated. 
var server = express(); // better instead


server.configure(function(){
	var oneDay = 86400000;		//cache static files
  	server.use('/controlers', express.static(__dirname + '/controlers'));
  	server.use(express.static(__dirname + '/public', { maxAge: oneDay }));
  	server.use(express.logger('dev')); // выводим все запросы со статусами в консоль
  	server.use(express.json()); // стандартный модуль, для парсинга JSON в запросах
  	server.use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
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

server.get('/api/model', function(req, res) {
    return ModelFactory.find(function (err, articles) {
        if (!err) {
            return res.send(articles);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

server.get('/api/model/:id', function(req, res) {
    return ArticleModel.findById(req.params.id, function (err, model) {
        if(!model) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', model:model });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

server.post('/api/model', function(req, res) {
    var model = new ModelFactory({
        title: req.body.title,
        name: req.body.name,
        description: req.body.description
        //images: req.body.images
    });

    model.save(function (err) {
        if (!err) {
            log.info("article created");
            return res.send({ status: 'OK', model:model });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

server.listen(process.env.PORT || 3000);
