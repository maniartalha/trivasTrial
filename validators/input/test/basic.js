var basic  = require('../basic');
var stub   = require('./stub/basic');
var chai   = require('chai');
var should = chai.should();

describe('Basic',function(){
	it('should pass a valid json (Smart sheet)',function(){
		basic(stub.jsonSmartSheet.input).should.deep.equal(stub.jsonSmartSheet.output);
	})

	it('should pass a valid json (HTTP)',function(){
		basic(stub.jsonHTTP.input).should.deep.equal(stub.jsonHTTP.output);
	})

	it('should pass a valid json (Okta)',function(){
		basic(stub.jsonOkta.input).should.deep.equal(stub.jsonOkta.output);
	})
})