'use strict';

var Signer = require('./Signer');
var _ = require('lodash');

/**
 * An existing template can be used by making an HTTP POST request to the
 * document containing some key parameters.
 * All optional and required parameters are listed in the table below.
 *
 * @param       {String} templateId [description]
 * @constructor
 */
function Template(templateId) {

  var template = {
    /**
     * Set to the Template ID of the template you would like to use
     *
     * @type {String}
     */
    templateId: templateId ? templateId : undefined,

    /**
     * Sets the title of the Document.
     *
     * @type {String}
     */
    title: undefined,

    /**
     * Sandboxmode
     * @property {Boolean} $sandbox
     * @type {Boolean}
     */
    sandbox : false,

    /**
     * Used in order to specify a document message.
     *
     * @type {String}
     */
    message: undefined,

    /**
     * Used to specify a custom requester name for this document.
     * If used, all email communication related to this document and signing-related
     * notifications will carry this name as the requester (sender) name.
     * @type {String}
     */
    custom_requester_name: undefined,

    /**
     * Used to specify a custom requester email address for this document.
     * If used, all email communication related to this document and signing-related
     * notifications will carry this email address as the requester (sender) email address.
     * @type {String}
     */
    custom_requester_email: undefined,

    /**
     * This parameter is used to specify a custom completion redirect URL.
     * If empty the default Post-Sign Completion URL of the current Business will be used
     * @type {String}
     */
    redirect: undefined,


    /**
     * This parameter is used to specify a custom decline redirect URL.
     * If empty the default Post-Sign Decline URL of the current Business will be used
     * @type {String}
     */
    redirect_decline: undefined,

    /**
     * This parameter is used to specify an internal reference for your application,
     * such as an identification string of the server or client making the API request.
     * @type {String}
     */
    client: undefined,

    /**
     * Expiration Time of the Document, default expiration time will be used if unset
     *
     * @type {Date}
     */
    expires: undefined,

    /**
     * Array of Signer Objects which are associated with the Document
     *
     * @var {Array<Signer>} signers
     * @type {Array<Signer>} signers
     */
    signers: [],

    /**
     * Array of Recipient Objects which are associated with the Document
     *
     * @var {Array<Recipient>} recipients
     * @type {Array<Recipient>} recipients
     */
    recipients: [],

    /**
     * This object must contain a sub array for each Merge Field of this template.
     *
     * @var {Array<Field>} fields
     * @type {Array<Field>} fields
     */
    fields: [],

    /**
     * Wheter the document has embedded/iframe signing enabled
     *
     * @var {Boolean} embeddedSigningEnabled
     * @type {Boolean}
     */
    embeddedSigningEnabled: undefined,

  };

  /**
   * Appends a \lib\Signer instance to the document.
   * Will set a default Signer Id if it was not set previously on the Signer.
   * @param  {Signer} signer An instance of \lib\Signer
   * @return {[type]}        [description]
   */
  this.appendSigner = function (signer) {
    signer = signer.toObject();
    if( !signer.getName() || !signer.getEmail() )
      throw new Error("Signer needs at least a Name and an E-Mail address");

    if( !signer.getId() )
      signer.id = template.signers.length + 1;

    template.signers.push(signer);
  };

  this.appendRecipient = function (recipient) {
    recipient = recipient.toObject();
    if(!recipient.getRole() || !recipient.getName() || !recipient.getEmail()){
      throw new Error('Recipient needs at least a Name, a Role and an E-Mail address');
    }

    template.recipients.push(recipient);

  };

  this.setSandbox = function (sandbox) {
    template.sandbox = sandbox;
  };

  this.getSandbox = function () {
    return template.sandbox;
  };

  this.getTemplateId = function () {
    return template.templateId;
  };

  this.getTitle = function () {
    return template.title;
  };

  this.getMessage = function () {
    return template.message;
  };

  this.getCustomRequesterName = function () {
    return template.custom_requester_name;
  };

  this.getCustomRequesterEmail = function () {
    return template.custom_requester_email;
  };

  this.getRedirect = function () {
    return template.redirect;
  };

  this.getRedirectDecline = function () {
    return template.redirect_decline;
  };

  this.getClient = function () {
    return template.client;
  };

  this.getExpires = function () {
    return template.expires;
  };

  this.getSigners = function () {
    return template.signers.map(function (signer) {
      signer = _.mapKeys(signer, function(v, k ){ return _.camelCase(k); });
      return signer instanceof Signer ? signer : new Signer(signer);
    });
  };

  this.getRecipients = function () {
    return template.recipients;
  };

  this.getFields = function () {
    return template.fields;
  };

  this.appendField = function (field) {
    field = field.toObject();
    template.fields.push(field);
  };

  this.setTemplateId = function (templateId) {
    template.templateId = templateId;
  };

  this.setTitle = function (title) {
    template.title = title;
  };

  this.setMessage = function (message) {
    template.message = message
  };

  this.setCustomRequesterName = function (name) {
    template.custom_requester_name = name;
  };

  this.setCustomRequesterEmail = function (email) {
    template.custom_requester_email = email;
  };

  this.setRedirect = function (redirect) {
    template.redirect = redirect;
  };

  this.setRedirectDecline = function (redirect_decline) {
    template.redirect_decline = redirect_decline;
  };

  this.setClient = function (client) {
    template.client = client;
  };

  this.setExpires = function (expires) {
    template.expires = expires;
  };

  this.setSigners = function (signers) {
    template.signers = signers;
  };

  this.setRecipients = function (recipients) {
    template.recipients = recipients;
  };

  this.setFields = function (fields) {
    template.fields = fields;
  };

  this.toObject = function () {
    return Object.assign(this, template);
  }

  this.setEmbeddedSigningEnabled = function (newEmbeddedSigningEnabled) {
    template.embeddedSigningEnabled = newEmbeddedSigningEnabled;
  };

  this.getEmbeddedSigningEnabled = function () {
    return template.embeddedSigningEnabled;
  };
}


module.exports = Template;
