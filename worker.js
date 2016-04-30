module.exports = function(db){

	var app = require('express')();
	var activities = require('./activity');
	var bodyParser = require('body-parser');
	var cors = require('cors');
	var utils = require('./utils');

	var fetchQuery = function(collectionName,req,res){

		var query  		= parseStringToObject(req.query.query || {} ),
			limit      	= parseStringToObject(req.query.limit || 0),
			skip       	= parseStringToObject(req.query.skip || 0),
			projection 	= parseStringToObject(req.query.projection || {});

		activities.fetch(db,collectionName,query,limit,skip,projection,function(err,data){
			if(err){
				res.status(400).send(err);
			}else{
				res.send(data);
			}
		})
	}

	app.use(cors());

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())

	app.get('/',function(req,res){
		console.log('query', req.query)
		res.send('get working...!!!');
	})

	// app.post('/post',function(req,res){
	// 	console.log('post',req.body);
	// 	res.send('post working...!!!')
	// })

	// app.post('/test',function(req,res){
	// 	console.log('post',req.body);
	// 	res.send('post working...!!!')
	// })

	app.get('/activities',fetchQuery.bind(null,'activities'));
	
	app.get('/logs',fetchQuery.bind(null,'logs'));

	app.delete('/log',function(req,res){

		var query  		= req.query.query || {}
		activities.deleteLog(db,query,function(err,data){
			if(err){
				res.status(400).send(err);
			}else{
				res.send(data);
			}
		})
	});

	app.post('/validate', function(req,res){
		var error = '';
		if(!req.body){
			error = "Please send body in proper format";
		}else if (!req.body.activity_name) {
			error = "'activity_name' is mandatory.";
		}else if (!req.body.version) {
			error = "'version' is mandatory.";
		}else if (!(req.body.hasOwnProperty('output') || req.body.hasOwnProperty('error'))) {
			error = "Body should have 'output' or 'error'.";
		}

		if(error){
			var errornObj = {
				message: error,
				data_received:req.body
			}
			activities.setLog(db,errornObj)
			res.status(400).send(errornObj)
		}else{
			activities.validation(db,req.body);
			res.status(200).send('ok');
		}
		// if(req.body && req.body.activity_name && req.body.version && (req.body.hasOwnProperty('output') || req.body.hasOwnProperty('error'))){
		// }else{
		// 	console.log('err','request did not have a proper json format.')
		// 	res.status(400).send('please send a proper json.')
		// }
	})

	app.listen(process.env.PORT || 3000, function() {
		console.log('test');
	    console.log('Process ' + process.pid + ' is listening to all incoming requests');
	});

}
