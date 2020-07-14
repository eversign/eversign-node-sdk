'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var DropdownField = require('../lib/DropdownField');
var path = require('path');
var config = require('../examples/config');

var key = config.accessKey;
var businessId = config.businessId;

describe("DropdownField", function () {

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

    var dropdownField = new DropdownField();
    dropdownField.setX(30);
    dropdownField.setY(30);
    dropdownField.setTextStyle("BUI");
    dropdownField.setTextSize(20);
    dropdownField.setWidth(200);
    dropdownField.setHeight(50);
    dropdownField.setTextColor("#FFBB00");
    dropdownField.setRequired(true);
    dropdownField.setReadOnly(true);
    dropdownField.setPage("1");
    dropdownField.setValue("Value 1");
    dropdownField.setOptions(["Value 1", "Value 2", "Value 3"]);
    dropdownField.setSigner("1");
    document.appendFormField(dropdownField);

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

    var dropdownField = new DropdownField();
    dropdownField.setIdentifier("date_sign_1");
    dropdownField.setX(30);

    expect(function () { document.appendFormField(dropdownField); }).to.throw();
    done();
  });


  it('should get uploaded without an error', function(done){
    this.timeout(20000);

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Dropdown Test");
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

    var dropdownField = new DropdownField();
    dropdownField.setX(30);
    dropdownField.setY(30);
    dropdownField.setTextStyle("BUI");
    dropdownField.setTextSize(20);
    dropdownField.setWidth(200);
    dropdownField.setHeight(50);
    dropdownField.setTextColor("#FFBB00");
    dropdownField.setRequired(true);
    dropdownField.setReadOnly(true);
    dropdownField.setPage("1");
    dropdownField.setValue("Value 1");
    dropdownField.setOptions(["Value 1", "Value 2", "Value 3"]);
    dropdownField.setSigner("1");
    document.appendFormField(dropdownField);

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

