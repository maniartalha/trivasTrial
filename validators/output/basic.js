var utils = require('../../utils');
var validate = {};
var title = "Basic output validation.";

validate.object = function(data,schema,path){
	var error = [];

	if(utils.is.object(data)){
		if(schema.properties){			
			var dataKeys = Object.keys(data);
			Object.keys(schema.properties).map(function(key){

				if(dataKeys.indexOf(key) === -1){
					error.push({
						message:key+" is missing.",
						path:path
					})

				}else{
					error = error.concat(validate.type(schema.properties[key].type,data[key], schema.properties[key], path.concat([key])))
				}
			})
		}else{
			error.push([{
				message:schema.title+" should have properties key.",
				path:path
			}])
		}

	}else{
		error.push([{
			message:schema.title+" must be a plain object.",
			path:path
		}])
	}

	return error;
}

validate.string = function(data,schema,path){
	var error = [];

	if(!utils.is.string(data)){
		error.push({
			message:"must be a string.",
			path:path
		})
	}

	return error;
}

validate.array = function(data,schema,path){
	var error = [];

	if(utils.is.array(data)){
		if(schema.items){			
			data.map(function(item,i){
				error = error.concat(validate.type(schema.items.type,item, schema.items, path.concat([i])))
			})
		}

	}else{
		error.push({
			message:schema.title+" must be a array.",
			path:path
		})
	}

	return error;
}


validate.number = function(data,schema,path){
	var error = [];

	if(!utils.is.number(data)){
		error.push({
			message:schema.title+" must be a number.",
			path:path
		})
	}

	return error;

}

validate.integer = function(data,schema,path){
	var error = [];

	if(!utils.is.integer(data)){
		error.push({
			message:schema.title+" must be an integer.",
			path:path
		})
	}

	return error;

}

validate.boolean = function(data,schema,path){
	var error = [];

	if(!utils.is.boolean(data)){
		error.push({
			message:schema.title+" must be a boolean.",
			path:path
		})
	}

	return error;
}

validate.any = function(){
	return [];
}

validate.type = function(type,data,schema,path){
	var error = [];

	if(validate.hasOwnProperty(type)){
		error = error.concat(validate[type](data,schema,path))
	}else{
		error.push({
			message:"schema must have a type.",
			path:path
		})
	}
		return error;
}

var validator = function(data,schema){
	if(!utils.is.undefinedOrNull(data)){
		return ({
			error:validate.type(schema.type,data,schema,[]),
			title:title
		})
	}else{
		return({
			error:[{
				message:"Data is null or is empty.",
				path:[]
			}],
			title:title
		}) 
	}
}

module.exports = validator;