'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var Recipient = require('../lib/Recipient');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var path = require('path');

var hash = "MYHASH";
var businessId = 1234;


describe("Client.getAllDocuments", function () {

  this.timeout(5000); 

  it('should give an array of documents', function(done){
    
    var client = new Client(hash, businessId);

    client.getAllDocuments().then(function (documents) {
      documents.should.be.an('array');
      done();
    }).catch(function (error) {
      done(error);
    });

  });

  it('should not resolve with wrong credentials', function(done){
    var client = new Client("wrongcredentialshere", 1234567);

    client.getAllDocuments().then(function (data) {
      done();
    }).catch(function (error) {
      error.should.have.property("code", 101);
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

  it("should return an instance of Signer with property 'pin' having value '1234'", function () {
    var signer = new Signer();
    signer.setId(1);
    signer.setOrder(2);
    signer.setPin("1234");
    signer.setSigned(false);
    expect( signer.toObject() ).to.be.an.instanceof(Signer)
      .and.to.have.property("pin", "1234");
  });

});

describe('Document' , function functionName() {

  it("should get created without a problem", function () {
    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Title goes here");
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

    var client = new Client(hash, businessId);
    client.createDocument(document)
      .then(function (response) {
        expect( document.toObject() ).to.be.an.instanceof(Document);
      })
      .catch(function (error) {
        done(error)
      });
  });

  it("should upload a file without a problem", function () {
      var document = new Document();
      document.setDocumentHash("My Document");
      document.setTitle("Title goes here");
      document.setRequesterEmail("tester@gmail.com");
      document.setIsDraft(false);

      var signer = new Signer();
      signer.setName('Tester Test');
      signer.setEmail('tester@gmail.com')
      document.appendSigner(signer.toObject());

      var file = new File({
        name: 'My File',
      filePath: path.join(__dirname, 'raw.pdf'),
      });
      document.appendFile(file);

      var client = new Client(hash, businessId);
      client.createDocument(document)
        .then(function (response) {
          expect( document.toObject() ).to.be.an.instanceof(Document);
          expect( document.toObject().files ).to.be.an('array')
        })
        .catch(function (error) {
          done(error)
        });
  });

});
