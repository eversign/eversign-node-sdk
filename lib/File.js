'use strict';

function File(newFile = {}) {

  /**
   * File Object
   * @type {Object}
   */
  var file = {
    /**
     * Unique ID of the uploaded file
     * @type {String}
     */
    fileId: undefined,

    /**
     * A URL leading to the file you would like to upload as your document file.
     * @type {String}
     */
    fileUrl: undefined,

    /**
     * Specify a base64 string of the file you would like to upload.
     * @type {String}
     */
    fileBase64: undefined,

    /**
     * Name of the file
     * @type {String}
     */
    name: undefined,

    /**
     * The number of pages of the File
     * @type {Number}
     */
    pages: undefined,

    /**
     * The number of pages of the converted File
     * @type {Number}
     */
    totalPages: undefined,

    /**
     * Setting this Property will upload the File as soon as createDocument
     * or uploadFile on the Client is called. Cannot be used in conjuction with other
     * File Links or Ids. After the Upload the fileId will be set automatically
     * @type {String}
     */
    filePath: undefined,
  };

  Object.assign(file, newFile);

  this.getFileId = function () {
    return file.fileId;
  };

  this.getName = function () {
    return file.name;
  };

  this.getPages = function () {
    return file.pages;
  };

  this.getTotalPages = function () {
    return file.totalPages;
  };

  this.getFileUrl = function () {
    return file.fileUrl;
  };

  this.getFileBase64 = function () {
    return file.fileBase64;
  };

  this.getFilePath = function () {
    return file.filePath;
  };

  this.clearFileFields = function () {
    file.filePath = '';
    file.fileUrl = '';
    file.fileId = '';
    file.fileBase64 = '';
  };

  this.setFileId = function (id) {
    file.fileId = id;
  };

  this.setFilePath = function (path) {
    if (!fs.existsSync(path)) {
        throw new Error('The file on the specified path cannot be found.');
    }
    file.clearFileFields();
    file.filePath = path;
  };

  this.setName = function (name) {
    file.name = name;
  };

  this.toObject = function () {
    return Object.assign(this, file);
  };

}


module.exports = File;
