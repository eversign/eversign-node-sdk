'use strict';

var Client = require('../index').Client;
var Document = require('../index').Document;

var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

client.getAllDocuments().then(function (documents) {
  client.downloadRawDocumentToPath(documents[0], "./raw.pdf").then(function (res) {
    console.log('done!');
  });
});
