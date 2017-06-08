'use strict';

/**
 * Each Document has a Logs Array which keeps an Overview of all the event
 * that occurred during its lifespan.
 * @constructor
 */
function LogEntry(newLogEntry) {

  var logEntry = {
  /**
   * The event that occurred
   *
   * @type {String}
   */
    event: undefined,

    /**
     * The id of the Signer, that triggered the event
     * Can be set to 0 if there was no signer involved i.e. document_create
     * @type {Number}
     */
    signer: undefined,

    /**
     * The Date when the event occurred
     *
     * @type {Date}
     */
    timestamp: undefined,
  };

  Object.assign(logEntry, newLogEntry);

  this.getEvent = function () {
    return logEntry.event;
  };

  this.getSigner = function () {
    return LogEntry.signer;
  };

  this.getTimestamp = function () {
    return LogEntry.timestamp;
  };

}

module.exports = LogEntry;
