'use strict';

var config = require('./config.js');
var request = require('request');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var qs = require('querystring');
var Promise = require('bluebird');
var Document = require('./Document.js');
var Business = require('./Business.js');
var File = require('./File.js');
var DocumentTemplate = require('./DocumentTemplate.js');
var utils = require('./utils');

module.exports = ApiRequest;

var TypeMap = {
  Document,
  DocumentTemplate,
  File,
  Business,
}

/**
 *
 * Create new request object
 * @param       {String} httpType       HTTP request type. GET, PUT, POST etc
 * @param       {String} accessKey      Access key from eversign dashboard
 * @param       {String} endPoint       Endpoint URI
 * @param       {Object} parameters     GET Parameters
 * @param       {Object} payload        Data payload
 * @constructor
 */
function ApiRequest(httpType, accessKey, endPoint, responseType, parameters, payload) {
    var headers = {
        'User-Agent': 'Eversign_NODE_SDK'
    };

    if(accessKey && accessKey.substr(0, 'Bearer '.length) === 'Bearer ') {
        headers.Authorization = accessKey;
        if(config.DEBUG_MODE) {
           console.log('authorization via oauth header: Authorization: ' + accessKey)
        }
    } else {
        this.accessKey = accessKey;
    }

  this.httpType = httpType;
  this.endPoint = endPoint;
  this.parameters = parameters;
  this.payload = payload;
  this.responseType = responseType;
  this.headers = headers;
}

/**
 *
 * Make a multipart request to eversign API
 * @return {Object} Response JSON
 */
ApiRequest.prototype.startMultipartUpload = function () {
  if(config.DEBUG_MODE) console.log(config.API_URL + this.endPoint);
  var self = this;

  return new Promise(function (resolve, reject) {
    request({
      method: self.httpType,
      uri: config.API_URL + self.endPoint + "?" + qs.stringify(createQuery(self)),
      headers: self.headers,
      formData: {
        upload: fs.createReadStream(path.resolve(self.payload))
      },
    },
    function (error, response, body) {
      try {
        var data = JSON.parse(body);
        if(error || data.success === false){
            reject(data);
        } else {
            resolve(data);
        }
      } catch (e) {
          reject(e);
      }
    }
  );
  });

}
ApiRequest.prototype.requestOAuthToken = function requestOAuthToken(token_request) {
    var self = this;

    token_request = token_request.toObject();
    token_request = utils.mapKeysDeep(token_request, _.snakeCase);

    var requestOptions = {
        method: 'POST',
        uri: config.OAUTH_URL + 'token',
        form: token_request
    };
    if (config.DEBUG_MODE) console.log(requestOptions);

    return new Promise(function(resolve, reject) {
        request(requestOptions, function(error, httpResponse, body) {
            var res = JSON.parse(body);
            if(res.success === true) {
                resolve(res.access_token);
            } else {
                reject(res);
            }
        });
    });
}

/**
 * Starts the configured API Request of the ApiRequest instance.
 * Returns different objects based on the request sent. Consult the Eversign API
 * documentation for more information.
 * @return {Promise} A promise that either resolves with array of documents or regects
 * with an error
 */
ApiRequest.prototype.startRequest = function(){
  var self = this;

  this.payload = utils.mapKeysDeep(this.payload, _.snakeCase)

  var requestOptions = {
    method: this.httpType,
    uri: config.API_URL + this.endPoint + "?" + qs.stringify(createQuery(this)),
    headers: self.headers,
    body: JSON.stringify(this.payload)
  };
  if(config.DEBUG_MODE) console.log(requestOptions);

  return new Promise(function (resolve, reject) {
    request(requestOptions, function (error, httpResponse, body) {
      var res = JSON.parse(body);
      if(config.DEBUG_MODE) console.log(res);
      if(error || res.success === false){
        var err = res.error ? res.error : error;
        reject(err);
      } else {
        if(self.responseType){
          var Type = TypeMap[self.responseType];
          if(res.length){
            //is an array
            var result = res.map(function (obj) {
              obj = utils.mapKeysDeep(obj, _.camelCase);
              return new Type(obj);
            })
            return resolve(result);
          }else{
            //Not an array, or empty
            res = utils.mapKeysDeep(res, _.camelCase);
            return resolve(new Type(res));
          }
        } else {
          return resolve(res);
        }
      }
    });
  });

};

ApiRequest.prototype.startDownload = function () {
  var self = this;
  if(!this.payload || !this.payload.hasOwnProperty('sink')) {
      throw new Error('Sink is required to download a file');
  }
  var requestOptions = {
    url: config.API_URL + self.endPoint + "?" + qs.stringify(createQuery(self)),
    headers: self.headers,
  };
  return new Promise(function (resolve, reject) {
    request(requestOptions)
      .on('response', function(response) {
        resolve(response);
      })
      .on('error', function(error) {
        reject(error);
      })
      .pipe(fs.createWriteStream(self.payload.sink));
  });

};

/**
 * Inserts API key into parameters
 * @return {Obejct} Query having parameters and api key
 */
function createQuery(context) {
  var query = {
    access_key: context.accessKey,
  };

  if(context.parameters) query = Object.assign(query, context.parameters);

  return query;
}
