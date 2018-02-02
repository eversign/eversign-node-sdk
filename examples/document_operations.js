'use strict';

var Client = require('../index').Client;
var Document = require('../index').Document;

var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

client.getAllDocuments().then(function (documents) {
    console.log(documents.length, ' documents found');
}).catch(function(err) {
    console.log(err)
});


// get a document and do some stuff with it
client.getDocumentByHash(config.documentHash).then(function(doc) {
    console.log(doc.getDocumentHash());

    // download said document
    client.downloadFinalDocumentToPath(doc, __dirname + '/final.pdf', true);
    client.downloadRawDocumentToPath(doc, __dirname + '/raw.pdf');

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
    client.cancelDocument(doc).catch(function(err) {
        console.log(err)
    });

    // delete a doc
    client.deleteDocument(doc).catch(function(err) {
        console.log(err)
    });

}).catch(function(err) {
    console.log(err)
});
