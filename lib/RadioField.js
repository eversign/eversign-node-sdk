'use strict';

var CheckboxField = require('./CheckboxField');

/**
 * Radio Button fields come with a fixed pixel width and height of 14x14.
 * The additional group parameter is used to identify radio button groups
 * @param       {Object} [RadioField={}] radiofield options
 * @constructor
 */
function RadioField(newRadioField = {}) {
  CheckboxField.call(this, radioField);

  var radioField = {
  /**
   * This parameter is used to identify radio button groups.
   * RadioFields belonging to the same group must carry the same group parameter.
   * @type {Number}
   */
    group: newRadioField.group ? newRadioField.group: 0
  };

  this.getGroup = function () {
    return radioField.group;
  };

  this.setGroup = function (group) {
    radioField.group = group;
  };

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, radioField, parentObject.call(this));
  };
}

module.exports = RadioField;
