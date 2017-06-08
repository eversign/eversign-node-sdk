'use strict';

var Client = require('../index').Client;
var Document = require('../index').Document;

var client = new Client("MY_HASH", 123456);

client.getAllDocuments().then(function (documents) {
  client.downloadRawDocumentToPath(completed[0], "./doc.pdf").then(function (res) {
    console.log(res);
  });
});