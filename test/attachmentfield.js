'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var AttachmentField = require('../lib/AttachmentField');
var path = require('path');
var config = require('../examples/config');

var key = config.accessKey;
var businessId = config.businessId;


describe("AttachmentField", function () {

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

    var attachmentField = new AttachmentField();
    attachmentField.setX(30);
    attachmentField.setY(30);
    attachmentField.setWidth(200);
    attachmentField.setHeight(50);
    attachmentField.setRequired(true);
    attachmentField.setPage("1");
    attachmentField.setSigner("1");
    document.appendFormField(attachmentField);

    expect(document.toObject()).to.have.property('fields').and.have.length(1); // Success
    done();
  });


  it('should get uploaded without an error', function(done){
    this.timeout(20000);

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Test");
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

    var fileTwo = new File({
      name: 'File number 2',
      filePath: path.join(__dirname, 'raw.pdf'),
    });

    document.appendFile(file);
    document.appendFile(fileTwo);

    var attachmentField = new AttachmentField();
    attachmentField.setX(30);
    attachmentField.setY(30);
    attachmentField.setWidth(200);
    attachmentField.setHeight(50);
    attachmentField.setRequired(true);
    attachmentField.setPage("1");
    attachmentField.setSigner("1");
    document.appendFormField(attachmentField);

    var client = new Client(key, businessId);

    client.createDocument(document).then(function(doc) {
      expect( doc.toObject() ).to.be.an.instanceof(Document);
      done();
    })
    .catch(function(error) {
        console.error(error)
        done(error)
    });
  });
});

