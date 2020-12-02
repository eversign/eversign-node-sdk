'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var CheckboxGroupField = require('../lib/CheckboxGroupField');
var path = require('path');
var config = require('../examples/config');

var key = config.accessKey;
var businessId = config.businessId;

describe("CheckboxGroupField", function () {

  it('should get added as 2 checkboxes belonging to same checkboxGroup to a Document without a problem', function(done){

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

    var checkbox1 = new CheckboxGroupField();
    checkbox1.setName("Checkbox 1");
    checkbox1.setValue("1");
    checkbox1.setX(30);
    checkbox1.setY(30);
    checkbox1.setPage(1);
    checkbox1.setSigner("1");
    checkbox1.setGroup(1);
    document.appendFormField(checkbox1);

    var checkbox2 = new CheckboxGroupField();
    checkbox2.setName("checkbox2 2");
    checkbox2.setValue("0");
    checkbox2.setX(30);
    checkbox2.setY(30);
    checkbox2.setPage(1);
    checkbox2.setSigner("1");
    checkbox2.setGroup(1);
    document.appendFormField(checkbox2);

    expect(document.toObject().fields[0]).to.have.length(2); // Success
    done();
  });

  it('should fail without a File', function(done){

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Title goes here");
    document.setRequesterEmail("tester@gmail.com");
    document.setIsDraft(false);

    var checkbox = new CheckboxGroupField();
    checkbox.setName("Checkbox 1");
    checkbox.setValue("1");
    checkbox.setX(30);
    checkbox.setY(30);
    checkbox.setGroup(1);

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

    var checkbox = new CheckboxGroupField();
    checkbox.setName("Checkbox 1");
    checkbox.setValue("1");
    checkbox.setGroup(1);

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

    var checkbox = new CheckboxGroupField();
    checkbox.setName("Checkbox 1");
    checkbox.setValue("1");
    checkbox.setX(30);
    checkbox.setY(30);
    checkbox.setSigner("1");
    checkbox.setPage(1);
    checkbox.setGroup(1);
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

