'use strict';

var Readable = require('./Readable');
var Signable = require('./Signable');
var FormField = require('./FormField');

/**
 *
 *
 * @param       {Object} [checkboxField={}] Default values for checkbox
 * @constructor
 */
function CheckboxField(checkboxField = {}) {
  Readable.call(this);
  Signable.call(this);
  FormField.call(this, checkboxField);

  checkboxField = {

    width: 14,

    height: 14,

    /**
     * The label of the Field
     * @type {String}
     */
    name: checkboxField.name ? checkboxField.name : undefined,

    /**
     * Set to 0 or leave empty to mark unchecked; Set to 1 to mark checked
     * @type {String}
     */
    value: checkboxField.value ? checkboxField.value : "0"
  };


  this.getWidth = function () {
    return 14;
  };

  this.getHeight = function () {
    return 14;
  };

  this.getName = function () {
    return checkboxField.name;
  };

  this.getValue = function () {
    return checkboxField.value;
  };

  this.setName = function (name) {
    checkboxField.name = name;
  };

  this.setValue = function (value) {
    checkboxField.value = value;
  };

  this.setWidth = function (width) {
    throw new Error('CheckboxFields have a fixed width and height of 14 that cannot be changed');
  };

  this.setHeight = function (height) {
    throw new Error('CheckboxFields have a fixed width and height of 14 that cannot be changed');
  };

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, checkboxField, parentObject.call(this));
  };

  this.setReadOnly(false);
  this.setValue("0")
}

module.exports = CheckboxField;
