'use strict';

var Client = require('../index').Client;

var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

client.fetchBusinesses().then(function (businesses) {
  console.log(businesses[0].getBusinessId());
});
