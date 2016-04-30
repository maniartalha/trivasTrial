var oneOf  = require('../oneOf');
var stub   = require('./stub/oneOf');
var type   = require('../type');
var chai   = require('chai');
var should = chai.should();

describe('OneOf',function(){
	it('should pass a valid json',function(){
		oneOf(type,stub.json.input,stub.json.input,[]).should.deep.equal(stub.json.output);
	})

	it('should return an error object for json with wrong "oneOf type".',function(){
		oneOf(type,stub.jsonWithWrongOneOfType.input,stub.jsonWithWrongOneOfType.input,[]).should.deep.equal(stub.jsonWithWrongOneOfType.output);
	})

	it('should return an error object for json with wrong "oneOf values".',function(){
		oneOf(type,stub.jsonWithWrongOneOfValues.input,stub.jsonWithWrongOneOfValues.input,[]).should.deep.equal(stub.jsonWithWrongOneOfValues.output);
	})

	it('should return an error object for json without "type" in oneOf "options".',function(){
		oneOf(type,stub.jsonWithoutTypeInOneOfOptions.input,stub.jsonWithoutTypeInOneOfOptions.input,[]).should.deep.equal(stub.jsonWithoutTypeInOneOfOptions.output);
	})

	it('should return an error object for json with wrong "type" in oneOf "options".',function(){
		oneOf(type,stub.jsonWithWrongTypeInOneOfOptions.input,stub.jsonWithWrongTypeInOneOfOptions.input,[]).should.deep.equal(stub.jsonWithWrongTypeInOneOfOptions.output);
	})

	it('should pass for json with "Reference".',function(){
		oneOf(type,stub.jsonWithReferenceField.context,stub.jsonWithReferenceField.input,[]).should.deep.equal(stub.jsonWithReferenceField.output);
	})

	it('should return an error object for json with wrong "Reference".',function(){
		oneOf(type,stub.jsonWithReferenceField.context,stub.jsonWithReferenceField.input,[]).should.deep.equal(stub.jsonWithReferenceField.output);
	})
})