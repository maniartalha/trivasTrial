// var cluster     = require('cluster');
var MongoClient = require('mongodb').MongoClient;
var config      = require('./config');

// console.log('version',process.versions)

// if(cluster.isMaster){

// 	var numWorkers = require('os').cpus().length;
// 	console.log('Master cluster setting up ' + numWorkers + ' workers...');

//     for(var i = 0; i < numWorkers; i++) {
//         cluster.fork();
//     }

//     cluster.on('online', function(worker) {
//         console.log('Worker ' + worker.process.pid + ' is online');
//     });

//     cluster.on('exit', function(worker, code, signal) {
//         console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//         console.log('Starting a new worker');
//         cluster.fork();
//     });
// }else{
	// console.log('cluster id',cluster.worker.id);
	var url = config[config.env].mongo_server_url;

	MongoClient.connect(url, function(err, db) {
		if(!err){
	  		console.log("Connected correctly to server");
			require('./worker')(db);
		}else{
			console.log('err',err);
		}

	  // db.close();
	});
// }
