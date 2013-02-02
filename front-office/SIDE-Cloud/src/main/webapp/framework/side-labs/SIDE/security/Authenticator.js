/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.security.Authenticator");

goog.require("SIDE.Util");
goog.require("SIDE.pattern.Observer");

/**
 * @namespace SIDE.security.Authenticator
 * @param {*} config
 * @constructor
 */
SIDE.security.Authenticator = function(config) {
	this.debug("SIDE.security.Authenticator()");
	
	if (typeof config == 'object') {
		this.url = config.url;
		this.callbackParamName = config.callbackParamName || null;
		this.callbackParamValue = config.callbackParamValue || 'SIDE.security.Authenticator.id';
		this.type = config.type || 'jsonp';
	} else {
		this.url = config;
		this.callbackParamName = null;
		this.callbackParamValue = null;
		this.type = 'normal';
	}
	
/*	if (url) {
		this.url = url;
	} else {
		this.url = "";
	}	
*/};

/**
 * @param {string} message 
 * @returns
 */
SIDE.security.Authenticator.prototype.debug = function(message) {
//	if (SIDE.security.Authenticator.log.isDebugEnabled()) {
	try {
		SIDE.security.Authenticator.log.debug(message);
//		SIDE.security.Authenticator.log.debug("=> Url : ", this.url);
	} catch (e) {}
};

/**
 * TODO Add more flexibility to the connector so other systems
 * than Alfresco may be added
 * @param {string} _user 
 * @param {string} _passwd
 * @returns
 */
SIDE.security.Authenticator.prototype.getTicket = function(_user, _passwd) {

	SIDE.security.Authenticator.log.debug("Authenticate : ", _user, "/", _passwd);

	var ticket = "";
	var user = "";
	var passwd = "";
	
	if (_user == undefined || _user == "") {
		user = "admin";
		passwd = "admin";
	} else {
		user = _user;
		passwd = _passwd;
	}

//	SIDE.security.Authenticator.log.debug("Authenticate : ", user, "/", passwd);
	SIDE.security.Authenticator.log.info("Authenticate : ", user, "/", "********");

	var xhrArgs = null;
	if (this.type == 'normal') {
		xhrArgs = {
				'url': this.getAlfrescoConnectionWebService(user, passwd),
				'success': function(result, request) {
					ticket = result.responseXML.getElementsByTagName("ticket")[0].childNodes[0].nodeValue;
		   			SIDE.pattern.Observer.publish("/authenticate/ticket", [{"value": ticket}]);
		   			SIDE.security.Authenticator.log.info("Authenticate : success => ticket = ", ticket);
				},
			   	'failure': function (params) {
		   			SIDE.security.Authenticator.log.error("Authenticate : failure");
			   	},
			   	'mimeType': "text/xml",
			   	'async': false
			}		
			SIDE.Util.request(xhrArgs);
	} else {
		// type == jsonp || cors ?
		xhrArgs = {
			'url': this.getAlfrescoConnectionWebService(user, passwd),
		   	'callbackParamName': this.callbackParamName,
		   	'timeout': 5000
		}

		SIDE.Util.getJsonP(xhrArgs)
			.then(function(result) {
				ticket = result['data']['ticket'];
				SIDE.pattern.Observer.publish("/authenticate/ticket", [{"value": ticket}]);
				SIDE.security.Authenticator.log.info("Authenticate : success => ticket = ", ticket);
			}, function (error) {
				alert('The connection was unsuccessful. Please check the information you entered before and try again');
			})
	}

	return ticket;	
};

/**
 * @param {string} _user 
 * @param {string} _passwd
 * @returns {string}
 */
SIDE.security.Authenticator.prototype.getAlfrescoConnectionWebService = function (_user, _passwd) {
	var connector = this.url + "?"
			+ "u=" + _user
			+ "&pw=" + _passwd;
	/*
	if (this.callbackParamName) {
		connector += '&' + this.callbackParamName + '=' + this.callbackParamValue;
	}
	*/
	return connector;
};

/**
 * @type {*}
 * @static
 */
SIDE.security.Authenticator.log = new log4javascript.getLogger("SIDE.security.Authenticate");