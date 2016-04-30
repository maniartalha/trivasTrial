var utils = require('../../../utils');
var toolBox = require('./toolBox');

var object = function(type,context,schema,path){

	var error = [];
	if(schema.hasOwnProperty('properties')){

		if(utils.is.object(schema.properties)){

			Object.keys(schema.properties).map(function(key){

				if(utils.is.object(schema.properties[key])){
					var resolvedSchema = schema.properties[key];

					if(key === 'oneOf'){
						error = error.concat(type.oneOf(type,context,resolvedSchema,path.concat(['properties',key])));
						return;
					}

					if(schema.properties[key].hasOwnProperty('$ref')){

						if (!schema.properties[key].$ref.match(/^#(\/([a-zA-Z_][a-zA-Z_0-9]*|[0-9]+))*$/)) {
							return error.push({
								message :'reference '+schema.properties[key].$ref+' has unsupported format',
								path    :path.concat(['properties',key])
							})
					    }else{
							resolvedSchema = toolBox.resolver(schema.properties[key],context);
					    }
					}

					if(resolvedSchema.hasOwnProperty('oneOf')){
						error = error.concat(type.oneOf(type,context,resolvedSchema.oneOf,path.concat(['properties',key,'oneOf'])));

					}else if (resolvedSchema.hasOwnProperty('type')) {

						if(type[resolvedSchema.type]){
							error = error.concat(type[resolvedSchema.type](type,context,resolvedSchema,path.concat(['properties',key])));
						}else{
							error.push({
								message :key+" in properties should have a matching type.",
								path    :path.concat(['properties',key])
							})
						}
					}else{
						error.push({
							message :key+" in properties should have type key.",
							path    :path.concat(['properties',key])
						})
					}
				}else{
					error.push({
						message :key+" in properties should be an object.",
						path    :path.concat(['properties',key])
					})
				}
			})

		}else{
			error.push({
				message :"properties key, in type object should be an object.",
				path    :path
			})	
		}

	}else{
		error.push({
			message :"type object should have properties key.",
			path    :path
		})
	}

	if(!schema.hasOwnProperty('title')){
		error.push({
			message :"type object should have title key.",
			path    :path
		})
	}

	return error;
}

module.exports = object;