'use strict';

function DropdownField(newDropdownField = {}) {

  var dropdownField = {
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

  this.getOptions = function () {
    return dropdownField.options;
  };

  this.setOptions = function (options) {
    dropdownField.options = options;
  };

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, dropdownField, parentObject.call(this));
  };
}

module.exports = DropdownField;
