'use strict';

let Client = require('../index').Client;
let Document = require('../index').Document;

const config = require('./config');

let client = new Client(config.accessKey, config.businessId);

client.getAllDocuments().then(function (documents) {
    console.log(documents.length, ' documents found');
    documents.forEach(document => {
        let files = document.getFiles();

        files.forEach(file => {
            // do something with files
            console.log(file.getName());
        })
    })
}).catch(function(err) {
    console.log(err)
});
