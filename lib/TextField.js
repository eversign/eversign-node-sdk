'use strict';

var FormField = require('./NoteField');

/**
 * Single Line Text Field. Counterpart to NoteField which has Multi-Line
 * support
 * @param       {Object} [TextField={}] [description]
 * @constructor
 */
function TextField(TextField = {}) {

  NoteField.call(this, textField);

}

module.exports = TextField;
