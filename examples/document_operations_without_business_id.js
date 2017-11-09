'use strict';

var Client = require('../index').Client;
var Document = require('../index').Document;

var config = require('./config');

var client = new Client(config.accessKey);

client.getAllDocuments().then(function (documents) {
    console.log(documents.length, ' documents found');
});
