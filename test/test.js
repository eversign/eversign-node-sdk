'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../index');
var Recipient = require('../lib/Recipient');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');

describe("Client.getAllDocuments", function () {

  it('should give an array of documents', function(done){
    var client = new Client("MY_HASH", 1234567);
    client.getAllDocuments().then(function (data) {
      data.should.be.an('array');
      done();
    }).catch(function (error) {
      done(error);
    });
  });

  it('should not resolve with wrong crerdentials', function(done){
    var client = new Client("MY_HASH", 1234567);
    client.getAllDocuments().then(function (data) {
      done(data);
    }).catch(function (error) {
      error.should.not.be.a('null');
      done();
    });
  });

});

describe('Recipient.toObject()' , function functionName() {

  it("should return an instance of Recipient with property 'name' having value 'Tester Test'", function () {
    var recipient = new Recipient();
    recipient.setName("Tester Test");
    recipient.setEmail("tester@gmail.com");
    recipient.setRole(null);
    expect( recipient.toObject() ).to.be.an.instanceof(Recipient)
      .and.to.have.property("name", "Tester Test");
  });

});

describe('Signer.toObject()' , function functionName() {

  it("should return an instance of Signer with property 'pin' having value '1231'", function () {
    var signer = new Signer();
    signer.setId(1);
    signer.setOrder(2);
    signer.setPin("1231");
    signer.setSigned(false);
    expect( signer.toObject() ).to.be.an.instanceof(Signer)
      .and.to.have.property("pin", "1231");
  });

});

describe('Document' , function functionName() {

  it("should get created without a problem", function () {
    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Tile goes here");
    document.setRequesterEmail("tester@gmail.com");
    document.setIsDraft(false);

    var recipient = new Recipient();
    recipient.setName("Tester Test");
    recipient.setEmail("tester@gmail.com");
    recipient.setRole(null);
    document.appendRecipient(recipient.toObject());

    var signer = new Signer();
    signer.setName('Tester Test');
    signer.setEmail('tester@gmail.com')
    document.appendSigner(signer.toObject());

    var client = new Client("MY_HASH", 1234567);
    client.createDocument(document)
      .then(function (response) {
        done();
      })
      .catch(function (error) {
        done(error)
      });
  
  });

});
