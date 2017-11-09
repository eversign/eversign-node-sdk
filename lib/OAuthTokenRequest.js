'use strict';
/**
 *
 * Initialize a OAuthTokenRequest
 * @constructor
 */
function OAuthTokenRequest(newOAuthTokenRequest = {}) {

    var oAuthTokenRequest = {
        clientId: '',
        clientSecret: '',
        code: '',
        state: '',
    };

    Object.assign(oAuthTokenRequest, newOAuthTokenRequest);

    this.setClientId = function(clientId) {
        oAuthTokenRequest.clientId = clientId;
    };

    this.getClientId = function() {
        return oAuthTokenRequest.clientId;
    };

    this.setClientSecret = function(clientSecret) {
        oAuthTokenRequest.clientSecret = clientSecret;
    };

    this.getClientSecret = function() {
        return oAuthTokenRequest.clientSecret;
    };

    this.setCode = function(code) {
        oAuthTokenRequest.code = code;
    };

    this.getCode = function() {
        return oAuthTokenRequest.code;
    };

    this.setState = function(state) {
        oAuthTokenRequest.state = state;
    };

    this.getState = function() {
        return oAuthTokenRequest.state;
    };

    this.toObject = function() {
        return oAuthTokenRequest;
    };
}

module.exports = OAuthTokenRequest;
