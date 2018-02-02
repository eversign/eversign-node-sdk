'use strict';
var TextFormField = require('./TextFormField');
var Readable = require('./Readable');
var Signable = require('./Signable');
var Requireable = require('./Requireable');

function DropdownField(newDropdownField = {}) {
  
  Readable.call(this);
  Signable.call(this);
  Requireable.call(this);
  TextFormField.call(this);


  var dropdownField = {

    /**
     * Set to an existing option in order to pre-select it. 
     * @type {String}
     */
    value: newDropdownField.value ? newDropdownField.value : "0",


    /**
     * This parameter must contain a simple string Array containing
     * all available options of a Dropdown field. Pre-Select an option
     *
     * @type {Array}
     */
    options: newDropdownField.options ? newDropdownField.options : []
  };

  this.setWidth(63);
  this.setHeight(19);
  this.setReadOnly(false);
  this.setRequired(false);

  this.getOptions = function () {
    return dropdownField.options;
  };

  this.setOptions = function (options) {
    dropdownField.options = options;
  };

  this.setValue = function (value) {
    dropdownField.value = value;
  };

  this.getValue = function () {
    return dropdownField.value;
  };

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, dropdownField, parentObject.call(this));
  };
}

module.exports = DropdownField;
