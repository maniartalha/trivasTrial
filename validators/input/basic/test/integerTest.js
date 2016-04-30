var integer = require('../integer');
var stub   = require('./stub/integer');
var chai   = require('chai');
var should = chai.should();

describe('Integer',function(){
	it('should pass a valid json',function(){
		integer({},{},stub.json.input,[]).should.deep.equal(stub.json.output);
	})

	it('should return error object for json without "Title" key.',function(){
		integer({},{},stub.jsonWithoutTitle.input,[]).should.deep.equal(stub.jsonWithoutTitle.output);
	})

	it('should return error object for json with wrong "default" value.',function(){
		integer({},{},stub.jsonWithWrongDefault.input,[]).should.deep.equal(stub.jsonWithWrongDefault.output);
	})

	it('should return error object for json with wrong "enum type".',function(){
		integer({},{},stub.jsonWithWrongEnumType.input,[]).should.deep.equal(stub.jsonWithWrongEnumType.output);
	})	

	it('should return error object for json with wrong "enum value".',function(){
		integer({},{},stub.jsonWithWrongEnumValue.input,[]).should.deep.equal(stub.jsonWithWrongEnumValue.output);
	})
})