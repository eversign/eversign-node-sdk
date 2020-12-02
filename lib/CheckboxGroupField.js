'use strict';

var Readable = require('./Readable');
var Signable = require('./Signable');
var FormField = require('./FormField');

/**
 *
 *
 * @param       {Object} [checkboxGroupField={}] Default values for checkboxGroup
 * @constructor
 */
function CheckboxGroupField(checkboxGroupField = {}) {
  Readable.call(this);
  Signable.call(this);
  FormField.call(this, checkboxGroupField);

  checkboxGroupField = {

    width: 14,

    height: 14,

    /**
     * The label of the Field
     * @type {String}
     */
    name: checkboxGroupField.name ? checkboxGroupField.name : undefined,

    /**
     * Set to 0 or leave empty to mark unchecked; Set to 1 to mark checked
     * @type {String}
     */
    value: checkboxGroupField.value ? checkboxGroupField.value : "0"
  };


  this.getWidth = function () {
    return 14;
  };

  this.getHeight = function () {
    return 14;
  };

  this.getName = function () {
    return checkboxGroupField.name;
  };

  this.getValue = function () {
    return checkboxGroupField.value;
  };

  this.setName = function (name) {
    checkboxGroupField.name = name;
  };

  this.setValue = function (value) {
    checkboxGroupField.value = value;
  };

  this.setWidth = function (width) {
    throw new Error('CheckboxGroupFields have a fixed width and height of 14 that cannot be changed');
  };

  this.setHeight = function (height) {
    throw new Error('CheckboxGroupFields have a fixed width and height of 14 that cannot be changed');
  };

  this.getGroup = function () {
    return checkboxGroupField.group;
  };

  this.setGroup = function (group) {
    checkboxGroupField.group = group;
  };

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, checkboxGroupField, parentObject.call(this));
  };

  this.setReadOnly(false);
  this.setValue("0")
}

module.exports = CheckboxGroupField;
