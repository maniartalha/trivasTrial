var utils = require('../../../utils');
var toolBox = require('./toolBox');

var oneOf = function(type,context,schema,path){

	var error = []
	if(utils.is.array(schema)){

		schema.map(function(obj,i){
			if(utils.is.object(obj)){

				var resolvedSchema = obj;

				if(obj.hasOwnProperty('$ref')){
					if (!obj.$ref.match(/^#(\/([a-zA-Z_][a-zA-Z_0-9]*|[0-9]+))*$/)) {
						return error.push({
							message :'reference '+obj.$ref+' has unsupported format',
							path    : path.concat([i])
						})
				    }else{
						resolvedSchema = toolBox.resolver(obj,context);
					}
				}

				if(resolvedSchema.oneOf){

					error = error.concat(oneOf(type,context,resolvedSchema.oneOf,path.concat([i,'oneOf'])));
				}else if (resolvedSchema.type) {

					if(type[resolvedSchema.type]){
						error = error.concat(type[resolvedSchema.type](type,context,resolvedSchema,path.concat([i,resolvedSchema.type])));
					}else{
						error.push({
							message :i+" Object of oneOf don't have a matching type.",
							path    :path.concat([i])
						})
					}
				}else{
					error.push({
						message :i+" Object of oneOf don't have a type.",
						path    :path.concat([i])
					})
				}
			}else{
				error.push({
					message :i+" key of oneOf should be an objects.",
					path    :path.concat([i])
				})
			}
		})

	}else{
		error.push({
			message :"oneOf key should be of type array.",
			path    :path
		})
	}

	return error;
}

module.exports = oneOf;