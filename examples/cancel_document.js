'use strict';

var Client = require('../index').Client;
var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

client.getDocumentByHash(config.documentHash).then(function(doc) {
    console.log(doc.getDocumentHash());

    client.cancelDocument(doc).catch(function(err) {
        console.log(err)
    });

}).catch(function(err) {
    console.log(err)
});
