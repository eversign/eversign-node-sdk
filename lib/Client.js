'use strict';

var async = require('async');
var ApiRequest = require("./Request");
var config = require('./config');
var _ = require('lodash');


/**
 *
 * Intialise the client
 * @param  {String} accessKey     API key from eversign dashboard
 * @param  {Number} businessId Business ID from eversign dashboard
 * @return {Client}            Client object
 */
function Client(accessKey, businessId){
  var accessKey = accessKey;
  var businessId = businessId;
  var businesses = [];
  var selectedBusiness = undefined;

  /**
   *
   * Retrieves the documents from eversign API
   * @return {Promise} Which resolves to An array of documents
   */
  this.getAllDocuments = function () {
    return getDocuments();
  };

  /**
   *
   * Retrieves all canceled documents from eversign API
   * @return {Promise} Which resolves to An array of documents
   */
  this.getCancelledDocuments = function () {
    return getDocuments("cancelled");
  };

  /**
   *
   * Returns all Documents for the Client which require Actions
   * @return {Promise} Which resolves to An array of documents
   */
  this.getActionRequiredDocuments = function () {
    return getDocuments("my_action_required");
  };

  /**
   *
   * Returns all Documents for the Client which are waiting on responses
   * @return {Promise} Which resolves to An array of documents
   */
  this.getWaitingForOthersDocuments = function () {
    return getDocuments("waiting_for_others");
  };

  /**
   *
   * Returns a list of Documents which are set to be Templates
   * @return {Promise} Which resolves to An array of documents
   */
  this.getTemplates = function () {
    return getDocuments("templates", 'Template');
  };

  /**
   *
   * Returns a list of Documents which are set to be Templates
   * @return {Promise} Which resolves to An array of documents
   */
  this.getArchivedTemplates = function () {
    return getDocuments("templates_archived", 'Template');
  };

  /**
   *
   * Returns a list of Documents which are set to be Templates
   * @return {Promise} Which resolves to An array of documents
   */
  this.getDraftTemplates = function () {
    return getDocuments("template_drafts", 'Template');
  };

  function getDocuments(type, dataType) {
    if(!type) type = "all"
    var parameters = {
      "business_id" : selectedBusiness ? selectedBusiness.getBusinessId(): businessId,
      "type" : type
    };
    var request = new ApiRequest("GET", accessKey, config.DOCUMENT_URL, dataType ? dataType : 'Document', parameters);
    return request.startRequest();
  }

  this.createDocument = function (document) {
    var self = this;
    document = document.toObject();
    if(!document.getSigners() && !document.getSigners().length )
      throw new Error('Document needs at least 1 Signer to be created');

    var parameters = {
      "business_id" : selectedBusiness ? selectedBusiness.getBusinessId(): businessId,
    };

    async.forEachOf(document.getFiles(), function (file, index, callback) {
      if(file.getFilePath() || file.getFileBase64()) {
        self.uploadFile(file)
        .then(function (response) {
          
          var changedFile = document.files[index];
          changedFile.filePath = '';
          changedFile.fileUrl = '';
          changedFile.fileId = '';
          changedFile.fileBase64 = '';

          changedFile.fileId = response.file_id;
          callback();
        })
        .catch(function (error) {
          callback(error);
        });
      }
      else {
        callback();
      }
    }, function(err){
      // All files saved. Now save the document
      console.log(JSON.stringify(document));

      _.forEach(document.files, function(file, index) {    
        var sendFile = _.mapKeys(file, function(value, key) {
          return _.snakeCase(key);
        });
        document.files[index] = sendFile;
      });

      _.forEach(document.fields, function(field, index) {   
         _.forEach(document.fields[index], function(innerField, innerIndex) { 
            var sendField = _.mapKeys(innerField, function(value, key) {
              return _.snakeCase(key);
            });
            document.fields[index][innerIndex] = sendField;
         });
      });

      var request = new ApiRequest("POST", accessKey, config.DOCUMENT_URL, undefined, parameters, document);
      return request.startRequest();
    });



  };

  this.uploadFile = function (file) {
    if(!file.getFilePath())
      throw new Error('File needs a local file Path to be uploaded');

    var parameters = {
      "business_id" : selectedBusiness ? selectedBusiness.getBusinessId(): businessId,
    };

    var request = new ApiRequest("POST", accessKey, config.FILE_URL, undefined, parameters, file.getFilePath());
    return request.startMultipartUpload();
  }

  /**
   * Retrieves all available Business for the current Client
   *
   * @return {Promise} A promise that resolves to Businesses
   */
  this.fetchBusinesses = function (setDefault = true) {
    return new Promise(function (resolve, reject) {
      var request = new ApiRequest("GET", accessKey, config.BUSINESS_URL, 'Business');
      request.startRequest().then(function (response) {
        businesses = response;
        if(setDefault && businesses.length){
          if(!businessId){
              selectedBusiness = businesses.filter(function functionName(business) { return business.isPrimary(); })[0];
              resolve(businesses);
          }else{
            var filteredBbusinesses = businesses.filter(function (business) {
              return business.getBusinessId() === businessId;
            });

            if(!filteredBbusinesses || !filteredBbusinesses.length){
              reject('No Business found with the specified Business Id');
            }else{
              selectedBusiness = filteredBbusinesses[0];
              resolve(businesses);
            }
          }
        }else{
          resolve(businesses);
        }
      }).catch(function (err) {
        reject(err);
      })
    });
  };

  this.setSelectedBusiness = function (business) {
    if(business instanceof Business){
      selectedBusiness = business;
    }else{
      throw new Error('Provide a valid business');
    }
  };

  this.getBusinesses = function () {
    return businesses;
  };

  /**
   * Sending a Reminder to a specific Signer inside a Document
   * Both properties are required in order to send the request.
   * Returns true or false whether the reminder has been sent
   * @param  {Document} document [description]
   * @param  {Signer} signer   [description]
   * @return {Promise}          [description]
   */
  this.sendReminderForDocument = function (document, signer) {
    if(!document.getDocumentHash() || !document.getSigners() )
      throw new Error('Sending Reminders requires the Document Hash and an approriate Signer');
    var parameters = {
      business_id: selectedBusiness ? selectedBusiness.getBusinessId(): businessId
    };
    var payload =  {
      document_hash: document.getDocumentHash(),
      signer_id: signer.getId()
    };
    var request = new ApiRequest("POST", accessKey, config.REMINDER_URL, undefined, parameters, payload);
    return request.startRequest();
  };

  /**
   * Fetches the Document with the specified Hash from the API
   *
   * @param  {String} documentHash [description]
   * @return {Promise}              [description]
   */
  this.getDocumentByHash = function (documentHash) {
    var parameters = {
      business_id : selectedBusiness ? selectedBusiness.getBusinessId(): businessId,
      document_hash : documentHash
    };
    var request = new ApiRequest("GET", accessKey, config.DOCUMENT_URL, 'Document', parameters);
    return request.startRequest();
  };

  /**
   *
   *
   * @param  {[type]} template [description]
   * @return {[type]}          [description]
   */
  this.createDocumentFromTemplate = function (template) {
    template = template.toObject();

    if(!template.getTemplateId()){
      throw new Error("Template needs a Template Id to create a document from it");
    }
    if( !template.getSigners() || !template.getSigners().length ){
      throw new Error("Template needs at least 1 Signer to create a Document");
    }
    parameters = {
      business_id: selectedBusiness ? selectedBusiness.getBusinessId(): businessId
    };

    var request = new ApiRequest("POST", accessKey, config.DOCUMENT_URL, 'Document', parameters, template);
    return request.startRequest();

  };

  /**
   * Deletes the specified Document. Only works on Drafts and canceled Documents
   *
   * @param  {Document} document [description]
   * @param  {String} type     [description]
   * @return {Promise}          [description]
   */
  this.deleteDocument = function (document, type) {
    if (!document.getDocumentHash()) {
      throw new Error('Deleting the Document requires the Document Hash');
    }
    if (!document.getIsDraft() && !document.getIsCanceled()) {
      throw new Error('Only Drafts and cancelled Documents can be deleted');
    }
    if (document.getIsDeleted()) {
      throw new Error('The Document has been deleted already');
    }
    var parameters = {
      "business_id" : selectedBusiness ? selectedBusiness.getBusinessId(): businessId,
      "document_hash":  document.getDocumentHash()
    };
    if(type) {
      parameters[type] = 1;
    }
    var request = new ApiRequest("DELETE", accessKey, config.DOCUMENT_URL, undefined, $parameters);
    return request.startRequest();
  };

  this.cancelDocument = function (document) {
     return this.deleteDocument(document, "cancel");
  };

  /**
   * Downloads the completed Document. Only works on Documents that have
   * been completed. If you want the Audit Trail on the downloaded File
   * as well, set the auditTrail Parameter to true
   * @param  {Document}  document           [description]
   * @param  {String}  path               [description]
   * @param  {Boolean} [auditTrail=false] [description]
   * @return {Promise}                     [description]
   */
  this.downloadFinalDocumentToPath = function (document, path, auditTrail = false) {
    if(!document.getIsCompleted())
      throw new Error('To Download the final File the Document needs to be completed first');
    return downloadDocumentToPath(document, path, auditTrail);
  };

  /**
   * Downloads the raw Document to the specified Path.
   * Returns true if saving was successful, otherwise false
   * @param  {Document} Document [description]
   * @param  {String} path    [description]
   * @return {Promise}          [description]
   */
  this.downloadRawDocumentToPath = function(document, path) {
    return downloadDocumentToPath(document, path, 0, config.DOCUMENT_RAW_URL);
  };

  function downloadDocumentToPath(document, path, auditTrail = 0, type = config.DOCUMENT_FINAL_URL) {
    if (!path || !document) {
      throw new Error('To Download the Document you need to set a path and the document');
    }
    var parameters = {
      "business_id" : selectedBusiness ? selectedBusiness.getBusinessId(): businessId,
      "document_hash" : document.getDocumentHash(),
      "audit_trail" : auditTrail
    };

    var payload = {
      sink: path
    };

    var request = new ApiRequest("GET", accessKey, type, "Document", parameters, payload);
    return request.startDownload();
  };
  /**
   * INIT
   */
  this.fetchBusinesses();
}

module.exports = Client;
