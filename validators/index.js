var input = require('./input')
var output = require('./output')

var inputIterator = function(schema){
	var inputErrorObj = {};
	Object.keys(input).map(function(key){
		inputErrorObj[key] = input[key](schema);
	})

	return inputErrorObj;
}

var outputIterator = function(data,schema){
	var outputErrorObj = {};
	Object.keys(output).map(function(key){
		outputErrorObj[key] = output[key](data,schema);
	})

	return outputErrorObj;
}

module.exports = {
	input:inputIterator,
	output:outputIterator
}


/**************
*
*	error = [
*		{
*  			message:'message to be shown',
*  			path:[]	
*		}
*	]
*
**/