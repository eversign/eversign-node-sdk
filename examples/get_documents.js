'use strict';

var Client = require('../index').Client;

var client = new Client("MY_HASH", 12345678);

client.getAllDocuments().then(function(documents){

  var signer = documents[0].getSigners()[0];
  var name = signer.getName();
  var field = documents[0].getFields()[0];

});
