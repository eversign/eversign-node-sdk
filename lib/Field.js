'use strict';

/**
 * Field Object with identifier and value for the Template
 * @param       {Object} [newfield={}] [description]
 * @constructor
 */
function Field(newfield = {}) {
  var field = {
    /**
     * The field's Field Identifier.
     * @type {String}
     */
    identifier: newfield.identifier ? newfield.identifier : undefined,

    /**
     * The field's value.
     * @type {String}
     */
    value: newfield.value ? newfield.value : undefined
  };

  this.getIdentifier = function () {
    return field.identifier;
  };

  this.getValue = function () {
    return field.value;
  };

  this.setIdentifier = function (identifier) {
    field.identifier = identifier;
  };

  this.setValue = function (value) {
    field.value = value;
  };

  this.toObject = function () {
    return Object.assign(this, field);
  };

}

module.exports = Field;
