'use strict';

var http = require('http');
var url = require('url');
var Client = require('../index').Client;
var OAuthTokenRequest = require('../index').OAuthTokenRequest;

var config = require('./config');


http.createServer(function(request, response) {
    if(request.url === '/') {
        var client = new Client();

        // STEP 1: generate URL for the user to authorize the app
        var authorizationUrl = client.generateOAuthAuthorizationUrl({
            client_id: config.oauth_client_id,
            state: '1338',
        });

        response.writeHead(200);
        response.write('<a href="' + authorizationUrl + '">' + authorizationUrl + '</a>');
        return response.end();
    } else if(request.url.startsWith('/callback')) {
        var parts = url.parse(request.url, true);
        var query = parts.query;
        var code = query.code;
        if(!code) {
            response.writeHead(400);
            response.write('please specify code');
            return response.end();
        }

        var client = new Client();

        // STEP 2: Get a token
        var token_request = new OAuthTokenRequest({
            client_id: config.oauth_client_id,
            client_secret: config.oauth_client_secret,
            code: code,
            state: '1338',
        });

        client.requestOAuthToken(token_request)
        .then(function(access_token) {
            client.setOAuthAccessToken(access_token);
            client.setSelectedBusinessById(6);

            client.getAllDocuments().then(function(documents){
                console.log('found ' + documents.length + ' documents');

                response.writeHead(200);
                response.write('oauth_access_token=' + access_token + '\nfound ' + documents.length + ' documents');
                return response.end();
            });

        })
        .catch(function(err){
            console.log(err);
            response.writeHead(500);
            response.write(err && err.message || 'error');
            return response.end();
        })
    } else {
        response.writeHead(404);
        response.write('not found.');
        return response.end();
    }

}).listen(8080, function() {
    console.log('server running at\n  => http://localhost:8080/\nCTRL + C to shutdown');
});
