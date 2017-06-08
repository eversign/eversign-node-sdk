'use strict';

var FormField = require('./FormField');

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
    value: undefined
  };

  FormField.call( this, Object.assign(noteObject) );
  /**
   * INIT
   */
  this.setWidth(55);
  this.setHeight(17);
  this.setName("");
  this.setValue("");

  this.getName = function () {
    return note.name;
  };

  this.getValue = function () {
    return note.value;
  };

  this.setName = function (name) {
    note.name = name;
  };

  this.setValue = function (value) {
    note.value = value;
  };
var parentObject = this.toObject;
  this.toObject = function () {
    return Object.assign(this, note, parentObject.call(this));
  };

};

module.exports = NoteField;
