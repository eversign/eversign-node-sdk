'use strict';

/**
 *
 *
 * @constructor
 */
function Signable(newSignable = {}) {
  this.signer = newSignable && newSignable.signer ? newSignable.signer: undefined;

  this.setSigner = function (signer) {
    this.signer = signer;
  };

  this.getSigner = function () {
    return this.signer;
  };

}

module.exports = Signable;
