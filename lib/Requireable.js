'use strict';

/**
 *
 *
 * @param       {Object} requireable Object containing requireable properties
 * @constructor
 */
function Requireable(requireable) {
  /**
   * Set if the SignatureField is required or not.
   * @type {Boolean}
   */
  this.required = requireable && requireable.required ? requireable.required: false;

  this.getRequired = function () {
    return this.required;
  };

  this.setRequired = function (required) {
    this.required = required;
  };
}

module.exports = Requireable;
