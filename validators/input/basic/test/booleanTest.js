var boolean = require('../boolean');
var stub   = require('./stub/boolean');
var chai   = require('chai');
var should = chai.should();

describe('Boolean',function(){
	it('should pass a valid json',function(){
		boolean({},{},stub.json.input,[]).should.deep.equal(stub.json.output);
	})

	it('should return error object for json without "Title" key.',function(){
		boolean({},{},stub.jsonWithoutTitle.input,[]).should.deep.equal(stub.jsonWithoutTitle.output);
	})

	it('should return error object for json with wrong "default" value.',function(){
		boolean({},{},stub.jsonWithWrongDefault.input,[]).should.deep.equal(stub.jsonWithWrongDefault.output);
	})

	it('should return error object for json with wrong "enum type".',function(){
		boolean({},{},stub.jsonWithWrongEnumType.input,[]).should.deep.equal(stub.jsonWithWrongEnumType.output);
	})	

	it('should return error object for json with wrong "enum value".',function(){
		boolean({},{},stub.jsonWithWrongEnumValue.input,[]).should.deep.equal(stub.jsonWithWrongEnumValue.output);
	})
})