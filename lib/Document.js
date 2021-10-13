'use strict';

var path = require('path');
var Signer = require('./Signer');
var Recipient = require('./Recipient');
var FormField = require('./FormField');
var File = require('./File');
var _ = require('lodash');
var LogEntry = require('./LogEntry');
/**
 *
 * Initialize a document
 * @constructor
 */
function Document(newDocument = {}) {

  var document = {
    /**
     * Document Hash to identify its authenticity
     * @property {String} $documentHash
     * @type {String}
     */
    documentHash : "",

    /**
     * Sandboxmode
     * @property {Boolean} $sandbox
     * @type {Boolean}
     */
    sandbox : false,

    /**
     * E-Mail address of the requester
     * @var string requesterEmail
     * @type {String}
     */
    requesterEmail: "",
    /**
     * Set to true in order to save this document as a draft.
     * @var {Boolean} isDraf
     * @type {Boolean}
     */
    isDraft : false,
    /**
     * Check if the document is completed.
     * @var {Boolean} isCompleted
     * @type {Boolean}
     */
    isCompleted: undefined,

    /**
     * Check if the document is archived.
     * @var {Boolean} isArchived
     * @type {Boolean}
     */
    isArchived: undefined,

    /**
     * Check if the document is deleted.
     * @var {Boolean} isDeleted
     * @type {Boolean}
     */
    isDeleted: undefined,

    /**
     * Check if the document is in the trash.
     * @var {Boolean} isTrashed
     * @type {Boolean}
     */
    isTrashed: undefined,

    /**
     * Check if the document has been cancelled.
     * @var {Boolean} isCancelled
     * @type {Boolean}
     */
    isCancelled: undefined,

    /**
     *
     * @var {Boolean} embedded
     * @type {Boolean}
     */
    embedded: undefined,

    /**
     * Sets the title of the Document.
     * @var {String} title
     * @type {String}
     */
    title: undefined,

    /**
     * Used in order to specify a document message.
     * @var {String} message
     * @type {String}
     */
    message: undefined,

    /**
     * Set to true to define a specific order of the Signers
     * @var {Boolean} useSignerOrder
     * @type {Boolean}
     */
    useSignerOrder: undefined,

    /**
     * Whether the Document is a Template or not
     * @var {Boolean} isTemplate
     * @type {Boolean}
     */
    isTemplate: undefined,

      /**
       * Whether the Document parses hidden tag fields
       * @var {Boolean} useHiddenTags
       * @type {Boolean}
       */
      useHiddenTags: false,

    /**
     * Set to true to enable Auto Reminders for this Document
     * @var {Boolean} reminders
     * @type {Boolean}
     */
    reminders: undefined,

    /**
     * Set to true requires all signers to sign the document to complete it
     * @var {Boolean} requireAllSigners
     * @type {Boolean}
     */
    requireAllSigners: undefined,

    /**
     * Used to specify a custom requester name for this document.
     * If used, all email communication related to this document and signing-related
     * notifications will carry this name as the requester (sender) name.
     * @var {String} custom_requester_name
     * @type {String}
     */
    custom_requester_name: undefined,

    /**
     * Used to specify a custom requester email address for this document.
     * If used, all email communication related to this document and signing-related
     * notifications will carry this email address as the requester (sender) email address.
     * @var {String} custom_requester_email
     * @type {String}
     */
    custom_requester_email: undefined,

    /**
     * This parameter is used to specify a custom completion redirect URL.
     * If empty the default Post-Sign Completion URL of the current Business will be used
     * @var {String} redirect
     * @type {String}
     */
    redirect: undefined,


    /**
     * This parameter is used to specify a custom completion redirect_decline URL.
     * If empty the default Post-Sign Decline URL of the current Business will be used
     * @var {String} redirect_decline
     * @type {String}
     */
    redirect_decline: undefined,

    /**
     * This parameter is used to specify an internal reference for your application,
     * such as an identification string of the server or client making the API request.
     * @var {String} client
     * @type {String}
     */
    client: 'node-sdk',

    /**
     * Expiration Time of the Document, default expiration time will be used if unset
     *
     * @var {Date} expires
     * @type {Date}
     */
    expires: undefined,

    /**
     * Array of Signer Objects which are associated with the Document
     *
     * @var {Array<Signer>} signers
     * @type {Array<Signer>}
     */
    signers: [],

    /**
     * Array of Recipient Objects which are associated with the Document
     *
     * @var {Array<Recepient>} recipients
     * @type {Array<Recepient>}
     */
    recipients: [],

    /**
     * Array of LogEntry Objects which are associated with the Document
     *
     * @var {Array<LogEntry>} log
     * @type {Array<LogEntry>}
     */
    log : [],

    /**
     * Array of FormField Objects and there respective Subclass
     * @var {Array<FormField>} fields
     * @type {Array<FormField>} fields
     */
    fields: [],

    /**
     * Array of File Objects which are associated with the Document
     * @var {Array<File>} files
     * @type {Array<File>} files
     */
    files: [],

    /**
     * Array of Custom Meta Tags which are associated with the Document
     * @var {Array<String, String>} meta
     * @type {Array<String, String>} meta
     */
    meta: [],

    /**
     * Wheter the document has embedded/iframe signing enabled
     *
     * @var {Boolean} embeddedSigningEnabled
     * @type {Boolean}
     */
    embeddedSigningEnabled: undefined,

  };

  Object.assign(document, newDocument);

  /**
   * Appends a \lib\Signer instance to the document.
   * Will set a default Signer Id if it was not set previously on the Signer.
   *
   * Note: `appendSigner` depends on `isTemplate`. Please set `isTemplate` first,
   * otherwise the behaviour is not defined. TODO: better checks.
   *
   * @param  {Signer} signer An instance of \lib\Signer
   */
  this.appendSigner = function (signer) {
    signer = signer.toObject();
    if(document.isTemplate) {
      if( !signer.getRole() ) throw new Error("Signer needs at least a Role");
    } else {
      if( !signer.getName() || !signer.getEmail() )
        throw new Error("Signer needs at least a Name and an E-Mail address");
    }

    if( !signer.getId() )
      signer.id = document.signers.length + 1;

    document.signers.push(signer);
  };

  /**
   * Appends a \lib\File instance to the document
   * @param  {File} file An instance of \lib\File
   * @throws {Error}
   */
  this.appendFile = function (file) {
    file = file.toObject();
    if( !file.getFilePath() && !file.getFileId() && !file.getFileUrl() && !file.getFileBase64() )
      throw new Error('File object needs a real File to be associated');

    if( !file.getName() )
      if( file.getFilePath() )
        file.setName( path.win32.basename(file.getFilePath) );
      else throw new Error('File object needs a name');

    document.files.push(file);
  };

  /**
   * Appends a \lib\Recipient instance to the document
   * @param  {Recipient} recipient
   * @throws {Error}
   */
  this.appendRecipient = function (recipient) {
    recipient = recipient.toObject();
    if( !recipient.getName() || !recipient.getEmail() )
      throw new Error('Recipient needs at least a Name and an E-Mail address');

    document.recipients.push(recipient);
  };

  this.toObject = function () {
    return Object.assign(this, document);
  };

  this.getFiles = function () {
    return document.files.map(function (file) {
      file = _.mapKeys(file, function(v, k ){ return _.camelCase(k); });
      return file instanceof File ? file : new File(file);
    });
  };

  this.getRecipients = function () {
    return document.recipients.map(function (recip) {
      recip = _.mapKeys(recip, function(v, k ){ return _.camelCase(k); });
      return recip instanceof Recipient ? recip : new Recipient(recip);
    });
  };

  this.getSigners = function () {
    return document.signers.map(function (signer) {
      signer = _.mapKeys(signer, function(v, k ){ return _.camelCase(k); });
      return signer instanceof Signer ? signer : new Signer(signer);
    });
  };

  this.appendMeta = function (key, value) {
    document.meta[key] = value;
  };

  this.removeMeta = function (key) {
    delete document.meta[key];
  };


  this.setDocumentHash = function (hash) {
    document.documentHash = hash;
  };

  this.getDocumentHash = function () {
    return document.documentHash;
  };

  this.setSandbox = function (sandbox) {
    document.sandbox = sandbox;
  };

  this.getSandbox = function () {
    return document.sandbox;
  };

  this.setRequesterEmail = function (email) {
    document.requesterEmail = email;
  };

  this.getRequesterEmail = function () {
    return document.requesterEmail;
  };

  this.setIsDraft = function (isDraftNew) {
    document.isDraft = isDraftNew;
  };

  this.getIsDraft = function () {
    return document.isDraft;
  };


  this.setUseHiddenTags = function (useHiddenTags) {
      document.useHiddenTags = useHiddenTags;
  };

  this.getUseHiddenTags = function () {
      return document.useHiddenTags;
  };

  this.setTitle = function (newTitle) {
    document.title = newTitle;
  };

  this.getTitle = function () {
    return document.title;
  };

  this.setMessage = function (newMessage) {
    document.message = newMessage;
  };

  this.getMessage = function () {
    return document.message;
  };

  this.setUseSignerOrder = function (newUseSignerOrder) {
    document.useSignerOrder = newUseSignerOrder;
  };

  this.getUseSignerOrder = function () {
    return document.useSignerOrder;
  };

  this.setReminders = function (newReminders) {
    document.reminders = newReminders;
  };

  this.getReminders = function () {
    return document.reminders;
  };

  this.getIsCompleted = function () {
    return document.isCompleted;
  };

  // UK Spelling. Check ApiDoc: https://eversign.com/api/documentation/methods#get-document-template
  this.getIsCancelled = function () {
    return document.isCancelled;
  };

  this.getIsDeleted = function () {
    return document.isDeleted;
  };

  this.setRequireAllSigners = function (newRequireAllSigners) {
    document.requireAllSigners = newRequireAllSigners;
  };

  this.getRequireAllSigners = function () {
    return document.requireAllSigners;
  };

  this.setCustomRequesterName = function (name) {
    document.custom_requester_name = name;
  };

  this.getCustomRequesterName = function () {
    return document.custom_requester_name;
  };

  this.setCustomRequesterEmail = function (email) {
    document.custom_requester_email = email;
  };

  this.getCustomRequesterEmail = function () {
    return document.custom_requester_email;
  };

  this.setRedirect = function (newRedirect) {
    document.redirect = newRedirect;
  };

  this.getRedirect = function () {
    return document.redirect;
  };

  this.setRedirectDecline = function (redirect_decline) {
    document.redirect_decline = redirect_decline;
  };

  this.getRedirectDecline = function () {
    return document.redirect_decline;
  };

  this.setClient = function (newClient) {
    document.client = newClient;
  };

  this.getClient = function () {
    return document.client;
  };

  this.setExpires = function (newExpires) {
    document.expires = newExpires;
  };

  this.getExpires = function () {
    return document.expires;
  };

  this.setMeta = function (newMeta) {
    document.meta = newMeta;
  };

  this.getLog = function () {
    return document.log.map(function (log) {
      log = _.mapKeys(log, function(v, k ){ return _.camelCase(k); });
      return log instanceof LogEntry ? log : new LogEntry(log);
    });
  };

  this.getMeta = function () {
    return document.meta;
  };

  this.setEmbeddedSigningEnabled = function (newEmbeddedSigningEnabled) {
    document.embeddedSigningEnabled = newEmbeddedSigningEnabled;
  };

  this.getEmbeddedSigningEnabled = function () {
    return document.embeddedSigningEnabled;
  };

  this.getFields = function () {
    return document.fields.map(function (fieldsPerFile) {
      return fieldsPerFile.map(function (field) {
        field = _.mapKeys(field, function(v, k ){ return _.camelCase(k); });
        return field instanceof FormField ? field : new FormField(field);
      });
      //return field instanceof FormField ? field : new FormField(field);
    });
  };

  this.appendFormField = function (formField) {
    formField = formField.toObject();
    if( !this.getFiles().length || formField.getFileIndex() > this.getFiles().length )
      throw new Error('Please check that at least 1 File was added and the fileIndex isn´t higher than the Amount of files');

    if(!formField.validate()){
      throw new Error('Please check that all required FormField Properties are set');
    }

    if(!formField.getIdentifier())
        formField.identifier = formField.constructor.name + "_" + (this.getFields().length + 1);

    if(!document.fields[formField.getFileIndex()])
      document.fields[formField.getFileIndex()] = [];

    document.fields[formField.getFileIndex()].push(formField);
  };

}

module.exports = Document;
