'use strict';

var Signable = require('./Signable');
var Requireable = require('./Requireable');
var FormField = require('./FormField');

function AttachmentField() {

  var attachmentField = {

    /**
     * The label of the Field
     * @type {String}
     */
    name: undefined
  };

  Signable.call(this);
  Requireable.call(this);
  FormField.call(this);



  this.setName(" ");
  this.setWidth(28);
  this.setHeight(28);
  this.setRequired(false);

  this.getName = function () {
    return attachmentField.name;
  };

  this.setName = function (name) {
    attachmentField.name = name;
  };

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, attachmentField, parentObject.call(this));
  };

}

module.exports = AttachmentField;
