'use strict';

/**
 *
 * @param       {Object} newReadable new object with properties of readable
 * @constructor
 */
function Readable(newReadable = {}) {

  /**
   * Main readable object
   * @type {Object}
   */
  this.readOnly= newReadable && newReadable.readOnly ? newReadable.readOnly: undefined;

  this.setReadOnly = function (readOnly) {
    readable.readOnly = readOnly;
  }

  this.getreadOnly = function () {
    return readOnly;
  };

}

module.exports = Readable;
