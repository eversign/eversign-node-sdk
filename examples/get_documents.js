'use strict';

var Client = require('../index').Client;

var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

client.getAllDocuments().then(function(documents){

  var signer = documents[0].getSigners()[0];
  var name = signer.getName();
  var field = documents[0].getFields()[0];

  console.log('signer 0:', signer);
  console.log('signer 0 name:', name);
  console.log('field 0:', field);

});
