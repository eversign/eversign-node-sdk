'use strict';

var Client = require('../index').Client;

var client = new Client("MY_HASH", 123456);

client.fetchBusinesses().then(function (businesses) {
  console.log(businesses[0].getBusinessId());
});