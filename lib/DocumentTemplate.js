'use strict';

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
     * Used in order to specify a document message.
     *
     * @type {String}
     */
    message: undefined,

    /**
     * This parameter is used to specify a custom completion redirect URL.
     * If empty the default Post-Sign Completion URL of the current Business will be used
     * @type {String}
     */
    redirect: undefined,

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
     * @type {Array}
     */
    signers: [],

    /**
     * Array of Recipient Objects which are associated with the Document
     *
     * @type {Array}
     */
    recipients: [],

    /**
     * This object must contain a sub array for each Merge Field of this template.
     *
     * @type {Array}
     */
    fields: [],
  };

  this.appendSigner = function (signer) {
    if(!signer.getRole()){
      throw new Error('Signer needs a role to be added');
    }
    template.signers.push(signer);
  };

  this.appendRecipient = function (recipient) {
    if(!recipient.getRole() || !recipient.getName() || !recipient.getEmail()){
      throw new Error('Recipient needs at least a Name, a Role and an E-Mail address');
    }

    template.recipients.push(recipient);

  };

  /**
   * Appends a Field Object for Merge Fields.
   *
   * @param  {Field} field [description]
   */
  this.appendField = function (field) {
    template.fields.push(field);
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

  this.getRedirect = function () {
    return template.redirect;
  };

  this.getClient = function () {
    return template.client;
  };

  this.getExpires = function () {
    return template.expires;
  };

  this.getSigners = function () {
    return template.signers;
  };

  this.getRecipients = function () {
    return template.recipients;
  };

  this.getFields = function () {
    return template.fields;
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

  this.setRedirect = function (redirect) {
    template.redirect = redirect;
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
}


module.exports = Template;
