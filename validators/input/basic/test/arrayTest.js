var array  = require('../array');
var stub   = require('./stub/array');
var type   = require('../type');
var chai   = require('chai');
var should = chai.should();

describe('Array',function(){
	it('should pass a valid json',function(){
		array(type,stub.json.input,stub.json.input,[]).should.deep.equal(stub.json.output);
	})

	it('should return error object for json without "items" key.',function(){
		array(type,stub.jsonWithoutItems.input,stub.jsonWithoutItems.input,[]).should.deep.equal(stub.jsonWithoutItems.output);
	})

	it('should return error object for json without "title" key.',function(){
		array(type,stub.jsonWithoutTitle.input,stub.jsonWithoutTitle.input,[]).should.deep.equal(stub.jsonWithoutTitle.output);
	})

	it('should return error object for json without "title" key in "items".',function(){
		array(type,stub.jsonWithoutTitleInItems.input,stub.jsonWithoutTitleInItems.input,[]).should.deep.equal(stub.jsonWithoutTitleInItems.output);
	})

	it('should return error object for json with wrong "items" key type.',function(){
		array(type,stub.jsonWithWrongItemsKeyType.input,stub.jsonWithWrongItemsKeyType.input,[]).should.deep.equal(stub.jsonWithWrongItemsKeyType.output);
	})

	it('should return error object for json with wrong "type" in items.',function(){
		array(type,stub.jsonWithWrongTypeInItems.input,stub.jsonWithWrongTypeInItems.input,[]).should.deep.equal(stub.jsonWithWrongTypeInItems.output);
	})

	it('should pass a valid json with type array inside items.',function(){
		array(type,stub.jsonWithTypeArrayInItems.input,stub.jsonWithTypeArrayInItems.input,[]).should.deep.equal(stub.jsonWithTypeArrayInItems.output);
	})
})