'use strict';

var http = require('http');
var fs = require('fs');

var Client = require('../index').Client;
var Template = require('../index').Template;
var Signer = require('../index').Signer;
var Field = require('../index').Field;

var config = require('./config');

var client = new Client(config.accessKey, config.businessId);

http.createServer(function(request, response) {
    if(request.url !== '/') {
        response.writeHead(200);
        response.write('ok');
        return response.end();
    }

    console.log('run');

    var documentTemplate = new Template();
    documentTemplate.setTemplateId(config.templateId);
    documentTemplate.setTitle('Form Test');
    documentTemplate.setMessage('Test Message');
    documentTemplate.setCustomRequesterName('Joe Requester');
    documentTemplate.setCustomRequesterName('joe@test.com');
    documentTemplate.setRedirect('https://eversign.com/?success');
    documentTemplate.setRedirectDecline('https://eversign.com/?declined');

    // Enable embedded signing
    documentTemplate.setEmbeddedSigningEnabled(true);

    // Create a signer for the document via the role specified in the template
    var signer = new Signer();
    signer.setRole('Client');
    signer.setName('John Doe');
    signer.setEmail(config.signerEmail);
    documentTemplate.appendSigner(signer);

    //Fill out custom fields
    var field = new Field();
    field.setIdentifier(config.fieldIdentifier);
    field.setValue('value 1');
    documentTemplate.appendField(field);

    client.createDocumentFromTemplate(documentTemplate).then(function(doc) {

        var signingUrl = doc.getSigners()[0].getEmbeddedSigningUrl();
        console.log('signingUrl generated: ' + signingUrl);

        fs.readFile(__dirname + '/iframe.html', 'utf8', function(err, file) {
            file = '<script>var signingUrl = "' + signingUrl + '";</script>' + file;
            response.writeHead(200);
            response.write(file);
            response.end();
        });

    })
    .catch(function(err) {
        console.log(err);
        response.writeHead(500);
        response.write(err);
        response.end();
    });



}).listen(8080, function() {
    console.log('server running at\n  => http://localhost:8080/\nCTRL + C to shutdown');
});
