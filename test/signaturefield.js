'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var SignatureField = require('../lib/SignatureField');
var path = require('path');
var config = require('../examples/config');

var key = config.accessKey;
var businessId = config.businessId;


describe("SignatureField", function () {

  it('should get added to a Document without a problem', function(done){

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Title goes here");
    document.setRequesterEmail("tester@gmail.com");
    document.setIsDraft(false);

    var file = new File({
      name: 'My File',
      filePath: path.join(__dirname, 'raw.pdf'),
    });
    document.appendFile(file);

    var signatureField = new SignatureField();
    signatureField.setX(30);
    signatureField.setY(30);
    signatureField.setWidth(200);
    signatureField.setHeight(50);
    signatureField.setRequired(true);
    signatureField.setPage("1");
    signatureField.setSigner("1");
    document.appendFormField(signatureField);

    expect(document.toObject()).to.have.property('fields').and.have.length(1); // Success
    done();
  });


  it('should get uploaded without an error', function(done){
    this.timeout(30000);

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("SignatureField Test");
    document.setRequesterEmail("tester@gmail.com");
    document.setIsDraft(true);

    var signer = new Signer();
    signer.setName('Tester Test');
    signer.setEmail('tester@gmail.com')
    document.appendSigner(signer);

    var file = new File({
      name: 'My File',
      filePath: path.join(__dirname, 'raw.pdf'),
    });
    document.appendFile(file);

    var signatureField = new SignatureField();
    signatureField.setX(30);
    signatureField.setY(30);
    signatureField.setWidth(200);
    signatureField.setHeight(50);
    signatureField.setRequired(true);
    signatureField.setPage("1");
    signatureField.setSigner("1");
    document.appendFormField(signatureField);

    var client = new Client(key, businessId);

    client.createDocument(document).then(function(doc) {
      expect( doc.toObject() ).to.be.an.instanceof(Document);
      done();
    })
    .catch(function(error) {
      done(error)
    });

  });


});

