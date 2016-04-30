var utils = require('../../../utils');

var integer = function(type,context,schema,path){

	var error = [];

	if(!(schema.options && schema.options.hidden) && !schema.hasOwnProperty('title')){
		error.push({
			message :"type integer should have 'title' key.",
			path    :path
		})
	}

	if(schema.hasOwnProperty('default') && !utils.is.integer(schema.default)){
		error.push({
			message :"default key should be a integer.",
			path    :path
		})
	}

	if(schema.hasOwnProperty('enum')){
		if (utils.is.array(schema.enum)) {
			schema.enum.map(function(val,i){
				if(!utils.is.integer(val)){
					error.push({
						message :i+" value of enum should be an integer.",
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

module.exports = integer;