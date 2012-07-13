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
 * @constructor
 */
SIDE.security.Authenticator = function(url) {
	this.debug("SIDE.security.Authenticator()");
	
	if (url) {
		this.url = url;
	} else {
		this.url = "";
	}	
};

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

	var xhrArgs = {
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
	return connector;
};

/**
 * @type {*}
 * @static
 */
SIDE.security.Authenticator.log = new log4javascript.getLogger("SIDE.security.Authenticate");
