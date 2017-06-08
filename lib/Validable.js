'use strict';

/**
 * Adds the Validable Trait to the FormFields which support it
 *
 * @constructor
 */
function Validable() {
  /**
   * Set if the Validation Type - allowed options are
   * letters_only, numbers_only, email_address
   * @type {[type]}
   */
  this.fieldValidation = undefined;

  this.getFieldValidation = function () {
    return this.fieldValidation;
  };

  this.setFieldValidation = function functionName(fieldValidation) {
    this.fieldValidation = fieldValidation;
  };
}

module.exports = Validable;
