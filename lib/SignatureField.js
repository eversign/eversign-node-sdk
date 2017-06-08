'use strict';

var Signable = require('./Signable');
var Requireable = require('./Requireable');
var FormField = require('./FormField');
/**
 *
 *
 * @constructor
 */
function SignatureField(signatureField) {
  Signable.call(this, signatureField);
  Requireable.call(this, signatureField);
  FormField.call(this, signatureField);

  this.setWidth(120);
  this.setHeight(35);
  this.setRequired(false);

  var validateParent = this.validate;
  this.validate = function () {
    var success = true;
    if(this.getSigner() == "") {
        success = false;
    }
    return (success & validateParent.call(this));
  };

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, parentObject.call(this));
  };

}

module.exports = SignatureField;
