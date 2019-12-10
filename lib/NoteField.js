'use strict';

var FormField = require('./FormField');
var Readable = require('./Readable');
var Signable = require('./Signable');
var TextFormField = require('./TextFormField');
var Requireable = require('./Requireable');

/**
 * Note fields are used to place multi-line inputs/textareas or text paragraphs.
 * @param       {Object} noteObject An object with app the properties of a note
 * @constructor
 */
function NoteField(noteObject = {}) {

  /**
   * Main note object
   * @type {Object}
   */
  var note = {
    /**
     * The label of the Field
     * @type {String}
     */
    name: undefined,

    /**
     * Specify text content to pre-fill field.
     * @type {String}
     */
    value: undefined,

    /**
     * Enable Field Validation for this field. Available validation types are email_address, letters_only and numbers_only.
     * @type {String}
     */
    validationType: undefined
  };
  Object.assign(note, noteObject);

  TextFormField.call(this);
  FormField.call(this, Object.assign(noteObject) );
  Readable.call(this);
  Requireable.call(this);
  Signable.call(this);
  /**
   * INIT
   */

  this.getName = function () {
    return note.name;
  };

  this.getValue = function () {
    return note.value;
  };

  this.getValidationType = function () {
    return note.validationType;
  };

  this.setName = function (name) {
    note.name = name;
  };

  this.setValue = function (value) {
    note.value = value;
  };

  this.setValidationType = function (value) {
    note.validationType = value;
  };

  var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, note, parentObject.call(this));
  };

  this.setWidth(55);
  this.setHeight(17);
  this.setName("");
  this.setValue("");

};

module.exports = NoteField;
