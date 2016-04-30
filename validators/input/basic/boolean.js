var utils = require('../../../utils');

var boolean = function(type,context,schema,path){
	var error = [];

	if(!(schema.options && schema.options.hidden) && !schema.hasOwnProperty('title')){
		error.push({
			message :"type boolean should have 'title' key.",
			path    :path
		})
	}

	if(schema.hasOwnProperty('default') && !utils.is.boolean(schema.default)){
		error.push({
			message :"default key should be a boolean.",
			path    :path
		})
	}

	if(schema.hasOwnProperty('enum')){
		if (utils.is.array(schema.enum)) {
			schema.enum.map(function(val,i){
				if(!utils.is.boolean(val,i)){
					error.push({
						message :i+" value of enum should be an boolean.",
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

module.exports = boolean;