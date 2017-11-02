'use strict';

function Business(newBusiness = {}) {

  var business = {
    /**
     * The associated Business ID
     *
     * @type {Number}
     */
    businessId: undefined,

    /**
     * The associated Business Identifier
     *
     * @type {String}
     */
    businessIdentifier: undefined,

    /**
     * The associated Business Name
     *
     * @type {String}
     */
    businessName: undefined,

    /**
     * The associated Business Connection Id
     *
     * @type {Number}
     */
    businessConnectionId: undefined,

    /**
     * Check if this business is the primary Business of the Client
     *
     * @type {Boolean}
     */
    isPrimary: undefined,

    /**
     * Creation Time of the Business, can't be set via Webservice (read-only)
     *
     * @type {Date}
     */
    creationTimeStamp: undefined,

  };

  Object.assign(business, newBusiness);

  this.getBusinessId = function () {
    return business.businessId;
  };

  this.setBusinessId = function (businessId) {
    return business.businessId;
  };

  this.getBusinessIdentifier = function() {
      return this.businessIdentifier;
  };

  this.setBusinessIdentifier = function(businessIdentifier) {
      this.businessIdentifier = businessIdentifier;
  };

  this.getBusinessConnectionId = function () {
    return business.businessConnectionId;
  };

  this.setBusinessConnectionId = function (businessConnectionId) {
    business.businessConnectionId = businessConnectionId;
  };

  this.isPrimary = function () {
    return business.isPrimary;
  };

  this.setIsPrimary = function (isPrimary) {
    business.isPrimary = isPrimary;
  };

  this.getCreationTimestamp = function () {
    return business.creationTimeStamp;
  };

  this.setCreationTimestamp = function (creationTimeStamp) {
    business.creationTimeStamp = creationTimeStamp;
  }

  this.toObject = function () {
    return Object.assign(this, business);
  };

}

module.exports = Business;
