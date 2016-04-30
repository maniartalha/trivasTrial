var getCurrentTimeStamp = function(){
	var utcTimeStamp = new Date(new Date().toUTCString());
	return utcTimeStamp.toISOString();
}

var is = {
	object: function(instance){
		return (typeof(instance) === 'object' && !Array.isArray(instance))
	},

	array: function(instance){
		return (typeof(instance) === 'object' && Array.isArray(instance))
	},

	string: function(instance){
		return (typeof(instance) === 'string')
	},

	boolean: function(instance){
		return (instance === true || instance === false);
	},

	number: function(instance){
		return (typeof(instance) === 'number');
	},

	integer: function(instance){
		return (is.number(instance) && (instance % 1 === 0));
	},

	undefinedOrNull: function(instance){
		return (instance === undefined || instance === null)
	}
}

parseStringToObject = function(jsonString){
	var json = jsonString;
	try {
		json = JSON.parse(jsonString);
	} catch(e) {
		// statements
	}

	return json;
}

module.exports = {
	getCurrentTimeStamp : getCurrentTimeStamp,
	is                  : is,
	parseStringToObject : parseStringToObject
}