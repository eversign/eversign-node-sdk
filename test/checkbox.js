'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var CheckboxField = require('../lib/CheckboxField');
var path = require('path');
var config = require('../examples/config');

var key = config.accessKey;
var businessId = config.businessId;

describe("CheckboxField", function () {

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

    var checkbox = new CheckboxField();
    checkbox.setName("Checkbox 1");
    checkbox.setValue("1");
    checkbox.setX(30);
    checkbox.setY(30);
    checkbox.setPage(1);
    checkbox.setSigner("1");
    document.appendFormField(checkbox);

    expect(document.toObject()).to.have.property('fields').and.have.length(1); // Success
    done();
  });

  it('should fail without a File', function(done){

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Title goes here");
    document.setRequesterEmail("tester@gmail.com");
    document.setIsDraft(false);

    var checkbox = new CheckboxField();
    checkbox.setName("Checkbox 1");
    checkbox.setValue("1");
    checkbox.setX(30);
    checkbox.setY(30);

    expect(function () { document.appendFormField(checkbox); }).to.throw();
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

    var checkbox = new CheckboxField();
    checkbox.setName("Checkbox 1");
    checkbox.setValue("1");

    expect(function () { document.appendFormField(checkbox); }).to.throw();
    done();
  });

  it('should get uploaded without an error', function(done){
    this.timeout(20000);

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Checkbox Test");
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

    var checkbox = new CheckboxField();
    checkbox.setName("Checkbox 1");
    checkbox.setValue("1");
    checkbox.setX(30);
    checkbox.setY(30);
    checkbox.setSigner("1");
    checkbox.setPage(1);
    document.appendFormField(checkbox);

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

