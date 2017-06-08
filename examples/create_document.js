'use strict';

var Client = require('../index').Client;
var Recipient = require('../index').Recipient;
var Signer = require('../index').Signer;
var Document = require('../index').Document;
var File = require('../index').File;
var SignatureField = require('../index').SignatureField;

var client = new Client("MY_HASH", 12345678);

var document = new Document();
document.setTitle("Tile goes here");
document.setRequesterEmail("tester@gmail.com");
document.setIsDraft(false);

var recipient = new Recipient();
recipient.setName("Tester Test");
recipient.setEmail("tester@gmail.com");
recipient.setRole(null);
document.appendRecipient(recipient);

var signer = new Signer();
signer.setName('Tester Test');
signer.setEmail('tester@gmail.com')
document.appendSigner(signer);

var file = new File({
  name: 'My File',
  filePath: './placeholder.pdf',
});
document.appendFile(file);

var signatureField = new SignatureField();
signatureField.setFileIndex(0);
signatureField.setPage(1);
signatureField.setX(30);
signatureField.setY(150);
signatureField.setRequired(true);
signatureField.setSigner("1");
document.appendFormField(signatureField);

client.createDocument(document);
