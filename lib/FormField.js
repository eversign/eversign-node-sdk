'use strict';

/**
 * Each Document can have multiple FormFields that the user is able to fill in
 * The following types are available: signature, initials, date_signed,
 * note, text, checkbox, radio, dropdown, attachment
 *
 * @param       {Object} formField An object to Initialize FormFiled without using getters setters
 * @constructor
 */
function FormField(newFormField) {

  /**
   * Main formField object
   * @type {Object}
   */
  var formField = {
    /**
     * A unique alphanumeric identifier which distinguishes the different form
     * fields from another
     * @type {String}
     */
    identifier: undefined,
    /**
     * The number of the page where the FormField should be displayed
     * @type {Number}
     */
    page: 1,

    /**
     * The height of the FormField in pixels.
     * @type {Number}
     */
    width: undefined,

    /**
     * The height of the FormField in pixels.
     * @type {Number}
     */
    height: undefined,

    /**
     * The FormField's horizontal margin from the left
     * side of the document in pixels.
     * @type {Number}
     */
    x: 0,

    /**
     * The FormField's vertical margin from the top of the document in pixels
     * @type {Number}
     */
    y: 0,

    /**
     * The FormField's file index on which it will be placed
     * @type {Number}
     */
    fileIndex: 0
  };

  Object.assign(formField, newFormField);

  this.validate = function () {
    if(!this.getHeight() || !this.getWidth() || !this.getX() || !this.getY() || !this.getPage()){
      return false;
    }
    return true;
  };

  this.getIdentifier = function () {
    return formField.identifier;
  };

  this.getPage = function () {
    return formField.page;
  };

  this.getWidth = function () {
    return formField.width;
  };

  this.getHeight = function () {
    return formField.height;
  };

  this.getX = function () {
    return formField.x;
  };

  this.getY = function () {
    return formField.y;
  };

  this.getFileIndex= function () {
    return formField.fileIndex;
  };

  this.setIdentifier = function (identifier) {
    formField.identifier = identifier;
  };

  this.setPage = function (page) {
    formField.page = page;
  };

  this.setWidth = function (width) {
    formField.width = width;
  };

  this.setHeight = function (height) {
    formField.height = height;
  };

  this.setX = function (x) {
    formField.x = x;
  };

  this.setY = function (y) {
    formField.y = y;
  };

  this.setFileIndex = function (fileIndex) {
    formField.fileIndex = fileIndex;
  };

  this.toObject = function () {
    return Object.assign(this, formField);
  };

}

module.exports = FormField;
