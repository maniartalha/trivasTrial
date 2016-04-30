var utils = require('../../../utils'); 

var type = require('./type');

var title = "Basic input validation.";

var validator = function(schema){

	var errorObj = {
		title:title
	}

	if(utils.is.object(schema)){

		var errors = [];
		if(schema.oneOf){
			errors = errors.concat(type.oneOf(type,schema,schema.oneOf,['oneOf']))
		}
		if(schema.type){
			errors = errors.concat(type[schema.type](type,schema,schema,[]))
		}
		errorObj.error = errors;

	}else{
		
		errorObj.error = [{
			message:"Schema should be an object.",
			path:[]
		}]
	}

	return errorObj;
}

module.exports = validator;