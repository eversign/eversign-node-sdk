'use strict';

var FormField = require('./FormField');
var Signable = require('./Signable');
var Requireable = require('./Requireable');


function InitialsField() {
  Signable.call(this);
  Requireable.call(this);

  var intialsField = {
    type: "intials"
  };

  FormField.call(this, intialsField);

  this.setWidth(43);
  this.setHeight(43);
  this.setRequired(false);

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, intialsField, parentObject.call(this));
  };

}

module.exports = InitialsField;
