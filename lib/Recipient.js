'use strict';

function Recipient(newRecipient = {}) {
  var recipient = {
    /**
     * Sets the full name of the Recipient.
     * @type {String}
     */
    name: undefined,

    /**
     * Sets the email of the Recipient.
     * @type {String}
     */
    email: undefined,

    /**
     * Roles are used when creating a document from a template.
     * Please note that all required roles must be specified in order to use a template.
     * @type {String}
     */
    role: undefined
  };


  this.getName = function () {
    return recipient.name;
  };

  this.getEmail = function () {
    return recipient.email;
  };

  this.getRole = function () {
    return recipient.role;
  };

  this.setName = function (newName) {
    recipient.name = newName;
  };

  this.setEmail = function (newEmail) {
    recipient.email = newEmail;
  };

  this.setRole = function (newRole) {
    recipient.role = newRole;
  }

  this.toObject = function () {
    return Object.assign(this, recipient);
  }
}

module.exports = Recipient;
