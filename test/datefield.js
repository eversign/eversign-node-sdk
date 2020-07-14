'use strict';

var chai = require('chai');
var Promise = require('bluebird');
var should = chai.should();
var expect = chai.expect;
var Client = require('../lib/Client');
var File = require('../lib/File');
var Signer = require('../lib/Signer');
var Document = require('../lib/Document');
var DateSignedField = require('../lib/DateSignedField');
var path = require('path');
var config = require('../examples/config');

var key = config.accessKey;
var businessId = config.businessId;

describe("DateSignedField", function () {

  it('should get added to a Document without a problem', function(done){

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Datefield Test");
    document.setRequesterEmail("tester@gmail.com");
    document.setIsDraft(false);

    var file = new File({
      name: 'My File',
      filePath: path.join(__dirname, 'raw.pdf'),
    });
    document.appendFile(file);

    var datefield = new DateSignedField();
    datefield.setIdentifier("date_sign_1");
    datefield.setX(30);
    datefield.setY(30);
    datefield.setTextStyle("BUI");
    datefield.setTextSize(20);
    datefield.setWidth(200);
    datefield.setHeight(50);
    datefield.setTextColor("#FFBB00");
    datefield.setPage(1);
    datefield.setSigner("1");
    document.appendFormField(datefield);

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

    var datefield = new DateSignedField();
    datefield.setIdentifier("date_sign_1");
    datefield.setPage(1);
    datefield.setSigner("1");

    expect(function () { document.appendFormField(datefield); }).to.throw();
    done();
  });


  it('should get uploaded without an error', function(done){
    this.timeout(20000);

    var document = new Document();
    document.setDocumentHash("My Document");
    document.setTitle("Title goes here");
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

    var datefield = new DateSignedField();
    datefield.setX(30);
    datefield.setY(30);
    datefield.setTextStyle("BUI");
    datefield.setTextSize(20);
    datefield.setWidth(200);
    datefield.setHeight(50);
    datefield.setTextColor("#FFBB00");
    datefield.setPage(1);
    datefield.setSigner("1");
    document.appendFormField(datefield);

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

