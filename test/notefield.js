'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var NoteField = require('../lib/NoteField');
var path = require('path');
var config = require('../examples/config');

var key = config.accessKey;
var businessId = config.businessId;


describe("NoteField", function () {

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

    var noteField = new NoteField();
    noteField.setX(30);
    noteField.setY(30);
    noteField.setTextStyle("UI");
    noteField.setTextSize(20);
    noteField.setWidth(200);
    noteField.setHeight(50);
    noteField.setTextColor("#FFBB00");
    noteField.setRequired(true);
    noteField.setReadOnly(true);
    noteField.setPage("1");
    noteField.setValue("Value 1");
    noteField.setSigner("1");
    document.appendFormField(noteField);

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

    var noteField = new NoteField();
    noteField.setIdentifier("text_field");
    noteField.setY(30);

    expect(function () { document.appendFormField(noteField); }).to.throw();
    done();
  });


  it('should get uploaded without an error', function(done){
    this.timeout(20000);

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("NoteField Test");
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

    var noteField = new NoteField();
    noteField.setX(30);
    noteField.setY(30);
    noteField.setTextStyle("I");
    noteField.setTextSize(20);
    noteField.setTextFont("helvetica");
    noteField.setWidth(200);
    noteField.setHeight(50);
    noteField.setTextColor("#FFBB00");
    noteField.setRequired(true);
    noteField.setReadOnly(true);
    noteField.setPage("1");
    noteField.setValidationType("letters_only");
    noteField.setSigner("1");
    document.appendFormField(noteField);

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

