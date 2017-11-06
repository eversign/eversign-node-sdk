'use strict';

var Client = require('../index').Client;
var Document = require('../index').Document;

var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

client.getAllDocuments().then(function (documents) {
    console.log(documents.length, ' documents found');
});


// get a document and do some stuff with it
client.getDocumentByHash(config.documentHash).then(function(doc) {
    console.log(doc.getDocumentHash());

    // download said document
    client.downloadFinalDocumentToPath(doc, './final.pdf', true);
    client.downloadRawDocumentToPath(doc, './raw.pdf');

    // send a reminder for a signer
    var signers = doc.getSigners();
    for (var i = 0; i < signers.length; i++) {
        client.sendReminderForDocument(doc, signers[i]).then(function(res){
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    // cancel a document
    client.cancelDocument(doc);

    // delete a doc
    client.deleteDocument(document);

}).catch(function(err) {
    console.log(err)
});
