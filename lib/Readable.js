'use strict';

/**
 *
 * @param       {Object} newReadable new object with properties of readable
 * @constructor
 */
function Readable(newReadable = {}) {

  /**
   * Main readable object
   * @type {Boolean}
   */
  this.readAble = newReadable && newReadable.readOnly ? newReadable.readOnly: undefined;

  this.setReadOnly = function (readOnly) {
    this.readAble = readOnly;
  }

  this.getreadOnly = function () {
    return readAble.readOnly;
  };

}

module.exports = Readable;
