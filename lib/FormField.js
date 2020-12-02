'use strict';

/**
 * Each Document can have multiple FormFields that the user is able to fill in
 * The following types are available: signature, initials, date_signed,
 * note, text, checkbox, radio, dropdown, attachment
 *
 * @param       {Object} formField An object to Initialize FormFiled without using getters setters
 * @constructor
 */
function FormField(newFormField) {

  /**
   * Main formField object
   * @type {Object}
   */
  var formField = {
    /**
     * A unique alphanumeric identifier which distinguishes the different form
     * fields from another
     * @type {String}
     */
    identifier: undefined,

    /**
     * The number of the page where the FormField should be displayed
     * @type {Number}
     */
    page: 1,

    /**
     * The height of the FormField in pixels.
     * @type {Number}
     */
    width: undefined,

    /**
     * The height of the FormField in pixels.
     * @type {Number}
     */
    height: undefined,

    /**
     * The FormField's horizontal margin from the left
     * side of the document in pixels.
     * @type {Number}
     */
    x: 0,

    /**
     * The FormField's vertical margin from the top of the document in pixels
     * @type {Number}
     */
    y: 0,

    /**
     * The FormField's file index on which it will be placed
     * @type {Number}
     */
    fileIndex: 0,

    /** 
     * @type {String}
     *
     */
     type: ""
  };

  Object.assign(formField, newFormField);

  this.validate = function () {
    if(!this.getHeight() || !this.getWidth() || !this.getX() || !this.getY() || !this.getPage()){
      return false;
    }
    this.generateType();
    return true;
  };

  /**
   * TODO: fix so consumers can use minifiers.
   *
   * > It's important to note that any techniques that inspect the object's constructor method (either with
   * > .toString() or .name) will fail to work if your Javascript has been minified with a tool like uglify,
   * > or the Rails asset pipeline. The minification renames the constructor, so you will end up with incorrect
   * > class names like n.
   * >
   * > ~ Gabe Martin-Dempesy (https://stackoverflow.com/a/332429/4817809)
   *
   */
  this.generateType = function () {
    if(this.constructor.name == "SignatureField") {
      this.type = "signature";
    }
    else if(this.constructor.name == "AttachmentField") {
      this.type = "attachment";
    }
    else if(this.constructor.name == "NoteField") {
      this.type = "note";
    }
    else if(this.constructor.name == "RadioField") {
      this.type = "radio";
    }
    else if(this.constructor.name == "TextField") {
      this.type = "text";
    }
    else if(this.constructor.name == "TextFormField") {
      this.type = "text";
    }
    else if(this.constructor.name == "DropdownField") {
      this.type = "dropdown";
    }
    else if(this.constructor.name == "DateSignedField") {
      this.type = "date_signed";
    }
    else if(this.constructor.name == "InitialsField") {
      this.type = "initials";
    }
    else if(this.constructor.name == "CheckboxField") {
      this.type = "checkbox";
    }
    else if(this.constructor.name == "CheckboxGroupField") {
      this.type = "checkboxGroup";
    }
    else {
      this.type = "";
    }
  }

  this.getIdentifier = function () {
    return formField.identifier;
  };

  this.getPage = function () {
    return formField.page;
  };

  this.getWidth = function () {
    return formField.width;
  };

  this.getHeight = function () {
    return formField.height;
  };

  this.getX = function () {
    return formField.x;
  };

  this.getY = function () {
    return formField.y;
  };

  this.getFileIndex= function () {
    return formField.fileIndex;
  };

  this.setIdentifier = function (identifier) {
    formField.identifier = identifier;
  };

  this.setPage = function (page) {
    formField.page = page;
  };

  this.setWidth = function (width) {
    formField.width = width;
  };

  this.setHeight = function (height) {
    formField.height = height;
  };

  this.setX = function (x) {
    formField.x = x;
  };

  this.setY = function (y) {
    formField.y = y;
  };

  this.setFileIndex = function (fileIndex) {
    formField.fileIndex = fileIndex;
  };

  this.toObject = function () {
    return Object.assign(this, formField);
  };

}

module.exports = FormField;
