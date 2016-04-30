var string = require('../string');
var stub   = require('./stub/string');
var chai   = require('chai');
var should = chai.should();

describe('string',function(){

	it('should pass a valid json',function(){
		string({},{},stub.json.input,[]).should.deep.equal(stub.json.output);
	})

	it('should return error object for json without "Title" key.',function(){
		string({},{},stub.jsonWithoutTitle.input,[]).should.deep.equal(stub.jsonWithoutTitle.output);
	})

	it('should return error object for json with wrong "default" value.',function(){
		string({},{},stub.jsonWithWrongDefault.input,[]).should.deep.equal(stub.jsonWithWrongDefault.output);
	})

	it('should return error object for json with wrong "enum type".',function(){
		string({},{},stub.jsonWithWrongEnumType.input,[]).should.deep.equal(stub.jsonWithWrongEnumType.output);
	})	

	it('should return error object for json with wrong "enum value".',function(){
		string({},{},stub.jsonWithWrongEnumValue.input,[]).should.deep.equal(stub.jsonWithWrongEnumValue.output);
	})
})