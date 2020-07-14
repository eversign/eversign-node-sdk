'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var InitialsField = require('../lib/InitialsField');
var path = require('path');
var config = require('../examples/config');

var key = config.accessKey;
var businessId = config.businessId;


describe("InitialsField", function () {

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

    var initialsField = new InitialsField();
    initialsField.setX(30);
    initialsField.setY(30);
    initialsField.setWidth(200);
    initialsField.setHeight(50);
    initialsField.setRequired(true);
    initialsField.setPage("1");
    initialsField.setSigner("1");
    document.appendFormField(initialsField);

    expect(document.toObject()).to.have.property('fields').and.have.length(1); // Success
    done();
  });


  it('should get uploaded without an error', function(done){
    this.timeout(20000);

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("InitialsField Test");
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

    var initialsField = new InitialsField();
    initialsField.setX(30);
    initialsField.setY(30);
    initialsField.setWidth(200);
    initialsField.setHeight(50);
    initialsField.setRequired(true);
    initialsField.setPage("1");
    initialsField.setSigner("1");
    document.appendFormField(initialsField);

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

