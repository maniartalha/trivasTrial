var utils = require('../../../utils');

var number = function(type,context,schema,path){
	var error = [];

	if(!(schema.options && schema.options.hidden) && !schema.hasOwnProperty('title')){
		error.push({
			message :"type number should have 'title' key.",
			path    :path
		})
	}

	if(schema.hasOwnProperty('default') && !utils.is.number(schema.default)){
		error.push({
			message :"default key should be a number.",
			path    :path
		})
	}

	if(schema.hasOwnProperty('enum')){
		if (utils.is.array(schema.enum)) {
			schema.enum.map(function(val,i){
				if(!utils.is.number(val)){
					error.push({
						message :i+" value of enum should be an number.",
						path    :path.concat(['enum',i])
					})
				}
			})
		}else{
			error.push({
				message :"enum key should be an array.",
				path    :path
			})
		}
	}

	return error;
}

module.exports = number;