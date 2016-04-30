var object  = require('../object');
var stub   = require('./stub/object');
var type   = require('../type');
var chai   = require('chai');
var should = chai.should();

describe('Object',function(){
	it('should pass a valid json',function(){
		object(type,stub.json.input,stub.json.input,[]).should.deep.equal(stub.json.output);
	})

	it('should return an error object for json without "title".',function(){
		object(type,stub.jsonWithoutTitle.input,stub.jsonWithoutTitle.input,[]).should.deep.equal(stub.jsonWithoutTitle.output);
	})

	it('should return an error object for json without "properties".',function(){
		object(type,stub.jsonWithoutProperties.input,stub.jsonWithoutProperties.input,[]).should.deep.equal(stub.jsonWithoutProperties.output);
	})

	it('should return an error object for json with wrong "properties type".',function(){
		object(type,stub.jsonWithWrongPropertiesType.input,stub.jsonWithWrongPropertiesType.input,[]).should.deep.equal(stub.jsonWithWrongPropertiesType.output);
	})

	it('should return an error object for json with wrong  type in "key in properties".',function(){
		object(type,stub.jsonWithWrongTypeInKeyInProperties.input,stub.jsonWithWrongTypeInKeyInProperties.input,[]).should.deep.equal(stub.jsonWithWrongTypeInKeyInProperties.output);
	})

	it('should return an error object for json without "type" in properties key".',function(){
		object(type,stub.jsonWithoutTypeKeyInPropertiesKey.input,stub.jsonWithoutTypeKeyInPropertiesKey.input,[]).should.deep.equal(stub.jsonWithoutTypeKeyInPropertiesKey.output);
	})

	it('should return an error object for json with wrong "type" in properties key".',function(){
		object(type,stub.jsonWithWrongTypeInPropertiesKey.input,stub.jsonWithWrongTypeInPropertiesKey.input,[]).should.deep.equal(stub.jsonWithWrongTypeInPropertiesKey.output);
	})

	it('should pass for json with valid reference field.',function(){
		object(type,stub.jsonWithReferenceField.context,stub.jsonWithReferenceField.input,[]).should.deep.equal(stub.jsonWithReferenceField.output);
	})

	it('should return an error object for json with reference field but wrong reference".',function(){
		object(type,stub.jsonWithReferenceFieldWithWrongReference.context,stub.jsonWithReferenceFieldWithWrongReference.input,[]).should.deep.equal(stub.jsonWithReferenceFieldWithWrongReference.output);
	})

	it('should pass for json with valid reference field and oneOf.',function(){
		object(type,stub.jsonWithReferenceFieldAndOneOf.context,stub.jsonWithReferenceFieldAndOneOf.input,[]).should.deep.equal(stub.jsonWithReferenceFieldAndOneOf.output);
	})
})