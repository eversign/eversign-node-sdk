'use strict';

var NoteField = require('./NoteField');

/**
 * Single Line Text Field. Counterpart to NoteField which has Multi-Line
 * support
 * @param       {Object} [TextField={}] [description]
 * @constructor
 */
function TextField(textField = {}) {

  NoteField.call(this, textField);

  this.setWidth(60);
  this.setHeight(17);

}

module.exports = TextField;
