'use strict';

var FormField = require('./FormField');

/**
 * Form Fields which contain text that is style-able.
 * @param       {Object} newTextFormField To Initialize with defaults
 * @constructor
 */
function TextFormField(newtextFormField) {

  /**
   * Main object
   * @type {Object}
   */
  var textFormField = {

    /**
     * Set to your preferred font size number
     * @type {Number}
     */
    textSize: 14,

    /**
     * Color of the Text as Hex color code, e.g. #003399
     * @type {String}
     */
    textColor: "#000000",

    /**
     * Font of the TextFormField
     * Supported fonts are: arial, calibri, courier_new, helvetica, georgia
     * and times_new_roman
     * @type {String}
     */
    textFont: "arial",

    /**
     * Text Style of the TextFormField
     * The letters B for bold, U for underlined and I for italic,
     * in an order of your choice. Example: BUI
     * @type {String}
     */
    textStyle: " "
  };

  Object.assign(textFormField , newtextFormField);

  FormField.call(this, textFormField);

  var parentValidate = this.validate;
  this.validate = function () {
    var success = true;
    if(!this.getTextSize() || !this.getTextFont() || !this.getTextColor() || !this.getTextStyle()){
        success = false;
    }
    return success && parentValidate.call(this);
  }

  this.getTextStyle = function () {
    return textFormField.textStyle;
  };

  this.getTextColor = function () {
    return textFormField.textColor;
  };

  this.getTextFont = function () {
    return textFormField.textFont;
  };


  this.getTextSize = function () {
    return textFormField.textSize;
  };

  this.setTextFont = function (textFont) {
    if(textFont != "arial" && textFont != "calibri" && textFont != "courier_new"
                && textFont != "helvetica" && textFont != "georgia" && textFont != "times_new_roman")
                  throw new Error("The selected Font is not available for this Property")
    textFormField.textFont = textFont;
  }

  this.setTextStyle = function (textStyle) {
    textFormField.textStyle = textStyle;
  };

  this.setTextSize = function (textSize) {
    textFormField.textSize = textSize;
  };

  this.setTextColor = function (textColor) {
    textFormField.textColor = textColor;
  };

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, textFormField, parentObject.call(this));
  };

}

module.exports = TextFormField;
