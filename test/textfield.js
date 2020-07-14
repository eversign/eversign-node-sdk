'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var TextField = require('../lib/TextField');
var path = require('path');
var config = require('../examples/config');

var key = config.accessKey;
var businessId = config.businessId;


describe("TextField", function () {

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

    var textField = new TextField();
    textField.setX(30);
    textField.setY(30);
    textField.setTextStyle("UI");
    textField.setTextSize(20);
    textField.setWidth(200);
    textField.setHeight(50);
    textField.setTextColor("#FFBB00");
    textField.setRequired(true);
    textField.setReadOnly(true);
    textField.setPage("1");
    textField.setValue("Value 1");
    textField.setSigner("1");
    document.appendFormField(textField);

    expect(document.toObject()).to.have.property('fields').and.have.length(1); // Success
    done();
  });


  it('should fail without setting all required fields', function(done){

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

    var textField = new TextField();
    textField.setIdentifier("text_field");
    textField.setY(30);

    expect(function () { document.appendFormField(textField); }).to.throw();
    done();
  });


  it('should get uploaded without an error', function(done){
    this.timeout(20000);

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("TextField Test");
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

    var textField = new TextField();
    textField.setX(30);
    textField.setY(30);
    textField.setTextStyle("I");
    textField.setTextSize(20);
    textField.setTextFont("helvetica");
    textField.setWidth(200);
    textField.setHeight(50);
    textField.setTextColor("#FFBB00");
    textField.setRequired(true);
    textField.setReadOnly(true);
    textField.setPage("1");
    textField.setValidationType("letters_only");
    textField.setSigner("1");
    document.appendFormField(textField);

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

