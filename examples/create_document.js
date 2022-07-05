'use strict';

var Client = require('../index').Client;
var Recipient = require('../index').Recipient;
var Signer = require('../index').Signer;
var Document = require('../index').Document;
var File = require('../index').File;
var SignatureField = require('../index').SignatureField;

var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

var document = new Document();
// document.setSandbox(true);
document.setTitle("Title goes here");
document.setRequesterEmail("tester@gmail.com");
document.setIsDraft(false);
document.setRedirect('https://eversign.com/?success');
document.setRedirectDecline('https://eversign.com/?declined');
document.setCustomRequesterName('Joe Requester');
document.setCustomRequesterName('joe@test.com');
document.setUseHiddenTags(true);

var recipient = new Recipient();
recipient.setName("Tester Test");
recipient.setEmail("tester@gmail.com");
recipient.setRole(null);
document.appendRecipient(recipient);

var signer = new Signer();
signer.setName('Tester Test');
signer.setEmail(config.signerEmail)
document.appendSigner(signer);

var file = new File({
  name: 'My File',
  filePath: __dirname + '/raw.pdf',
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

client.createDocument(document).then(function(doc) {
    console.log(doc.getDocumentHash());
})
.catch(function(err) {
    console.log(err);
})
