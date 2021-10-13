'use strict';

var Client = require('../index').Client;
var Document = require('../index').Document;

var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

client.getAllDocuments().then(function (documents) {
    console.log(documents.length, ' documents found');
    documents.forEach(document => {
        var files = document.getFiles();

        files.forEach(file => {
            // do something with files
            console.log(file.getName());
        })
    })
}).catch(function(err) {
    console.log(err)
});
