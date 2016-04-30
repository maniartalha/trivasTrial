var when      = require('when');
var request   = require('request');
var config    = require('./config');
var utils     = require('./utils');
var validator = require('./validators');
var shortid   = require('shortid');
 
var flowServerUrl = config[config.env].flow_server_uri;

var fetch = function(db,collectionName,query,limit,skip,projection,callback){
	query = utils.parseStringToObject(query)

	var collection = db.collection(collectionName);
	var activityListPromise = collection
								.find(query,projection)
								.limit(limit)
								.skip(skip)
								.toArray();
  
	var activityCountPromise = collection.count();
	
	when.all([activityListPromise,activityCountPromise]).then(function(value){
		// console.log('value',value);
		callback(null,{
			data:value[0],
			count:value[1]
		})
	},function(err){
		console.log('err',err);
		callback(err)
	})
}

var validation = function(db,body){
	if(body && body.activity_name && body.version && (body.hasOwnProperty('output') || body.hasOwnProperty('error'))){		
		var query = {
			activity_name           : body.activity_name,
			versions:{$elemMatch:{version : body.version}}
		}
		fetch(db,'activities',query,0,0,{'versions.$':1},checkActivityVersion.bind(null,db,body))
	}

}

var checkActivityVersion = function(db,body,err,activityList){
	if(err){
		console.log('errr',err)
		return;
	}
	if(activityList.data.length){

		var activity = activityList.data[0].versions[0];
		var errors   = {
			input  :{},
			output :{}
		}

		if(body.error){
			errors.output = {
				activityError:{
					error:[{						
						message :body.error.message || "",
						path    :[],
						stack   :body.error.stack || ""
					}],
					title:"Activity error."
				}
			}
		}else{
			errors.output = validator.output(body.output,activity.output_schema);
		}

		errors.input = validator.input(activity.input_schema || {})

		var dataToSet = {
			$set:{				
				"versions.$.errors"        : errors,
				"versions.$.tested_on"     : utils.getCurrentTimeStamp(),
				"versions.$.data_received" : body 
			}
		}
		// if(errors.length){
		// 	dataToSet.$set.status = 'failed';
		// }else{
		// 	dataToSet.$set.status = 'passed';
		// }
		// console.log('activityList',activityList)
		// console.log('already exists')
		updateActivityIntoDb(db,body.activity_name,body.version,dataToSet);
	}else{
		getActivityFromFlowServer(db,body);
	}
}

var getActivityFromFlowServer = function(db,body){
	var options = {
		url : flowServerUrl+'/searchactivity/',
		method:'POST',
		json:true,
		body:{
			search:body.activity_name
		}
	}
	if(config[config.env].auth){
		options.auth = config[config.env].auth;
		// console.log('options',options)
	}
	request(options,function(err,res,resBody){
		// console.log('----------------------->>',resBody,typeof(resBody));
		if(!err){
			if(resBody && resBody.length){
				newActivityManager(db,body,resBody[0]);
			}else{
				var error = {
					message:"Could not fetch activity with name "+ body.activity_name,
					data_received:body
				}

				setLog(db,error);
			}
		}else{
			console.log('err',err)
		}
	})
}

var newActivityManager = function(db,body,newActivity){
	if(body.version !== newActivity.version){
		var errorObj = {
			message:"Activity version mismatch.",
			data_received:body
		}
		setLog(db,errorObj);
		return;
	}
	// console.log('$$$$$$$$$',newActivity)
	var errors   = {
		input  :{},
		output :{}
	}

	if(body.error){
		errors.output = {
			activityError:{
				error:[{						
					message :body.error.message || "",
					path    :[],
					stack   :body.error.stack || ""
				}],
				title:"Activity error."
			}
		}
	}else{
		errors.output = validator.output(body.output,JSON.parse(newActivity.output ||'{}'))
	}

	errors.input = validator.input(JSON.parse(newActivity.input || '{}'))
	// var dataToInsert = {
	// 	$set:{
	// 		'activity_name' :newActivity.name,
	// 		'tags'          : newActivity.tags,
	// 		'versions'      :[{
	// 			"version_id"    :newActivity.version ,
	// 			"output_schema" : JSON.parse(newActivity.output),
	// 			"status"        : status,
	// 			"error"         : errors,
	// 			"tested_on"     : utils.getCurrentTimeStamp()
 //         	}]
	// 	}
	// }
	var dataToInsert = {
		$set:{
			'activity_name' : newActivity.name,
			'tags'          : newActivity.tags,
			'icon'			: newActivity.icon
		},
		$push:{
			'versions'      :{
				"version"       : newActivity.version ,
				"output_schema" : JSON.parse(newActivity.output),
				"input_schema"  : JSON.parse(newActivity.input),
				"errors"        : errors,
				"tested_on"     : utils.getCurrentTimeStamp(),
				data_received   : body
         	}
		}
	}
	// console.log('dataToInsert',dataToInsert)
	updateActivityIntoDb(db,body.activity_name,body.version,dataToInsert)
}

var updateActivityIntoDb = function(db,activity_name,version,data){

	var collection = db.collection('activities');

	collection.update({activity_name:activity_name,versions:{$elemMatch:{version:version}}},data,{upsert:true})
	.then(function(data){
		// console.log('updation success');
	},function(err){
		console.log('update error',err);
	})
}

var setLog = function(db,errorObj){
	errorObj.log_time = utils.getCurrentTimeStamp();
	errorObj.log_id = shortid.generate();

	var collection = db.collection('logs');

	collection.insert(errorObj).then(function(){

	},function(err){
		console.log('errr',err);
	}) 
}

var deleteLog = function(db,query,callback){
	var collection = db.collection('logs');

	query = utils.parseStringToObject(query)
	if(query.log_time){
		query.log_time = new RegExp('^'+query.log_time)
	}

	collection.remove(query).then(function(){
		callback(null,'success')
	},function(err){
		callback(err);
	})
}	

// var getActivity

module.exports = {
	fetch      : fetch,
	validation : validation,
	setLog     : setLog,
	deleteLog : deleteLog
}