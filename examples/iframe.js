'use strict';

var http = require('http');
var fs = require('fs');

var Client = require('../index').Client;
var Document = require('../index').Document;
var Signer = require('../index').Signer;
var File = require('../index').File;
var SignatureField = require('../index').SignatureField;

var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

http.createServer(function(request, response) {
    if(request.url !== '/') {
        response.writeHead(200);
        response.write('ok');
        return response.end();
    }
    console.log('run');

    var document = new Document();
    document.setTitle("Title goes here");
    document.setRequesterEmail("tester@gmail.com");
    document.setIsDraft(false);
    document.setRedirect('https://eversign.com/?success');
    document.setRedirectDecline('https://eversign.com/?declined');
    document.setCustomRequesterName('Joe Requester');
    document.setCustomRequesterName('joe@test.com');

    // Enable embedded signing
    document.setEmbeddedSigningEnabled(true);

    var signer = new Signer();
    signer.setName('Tester Test');
    signer.setEmail(config.signerEmail)
    document.appendSigner(signer);

    var file = new File({
      name: 'My File',
      filePath: __dirname + '/raw.pdf',
    });
    document.appendFile(file);

    var signatureField = new SignatureField();
    signatureField.setFileIndex(0);
    signatureField.setPage(1);
    signatureField.setX(30);
    signatureField.setY(150);
    signatureField.setRequired(true);
    signatureField.setSigner("1");
    document.appendFormField(signatureField);

    client.createDocument(document).then(function(doc) {
        fs.readFile(__dirname + '/iframe.html', 'utf8', function(err, file) {

            var signingUrl = doc.getSigners()[0].getEmbeddedSigningUrl();
            console.log('signingUrl generated: ' + signingUrl);

            file = '<script>var signingUrl = "' + signingUrl + '";</script>' + file;
            response.writeHead(200);
            response.write(file);
            return response.end();

        });
    })
    .catch(function(err) {
        console.log('ERROR CREATING DOC', err);
    });
}).listen(8080, function() {
    console.log('server running at\n  => http://localhost:8080/\nCTRL + C to shutdown');
});
