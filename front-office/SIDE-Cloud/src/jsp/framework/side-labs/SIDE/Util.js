/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */
 
goog.provide("SIDE.Util");
dojo.require("dojo.io.script");

/**
 * @namespace
 */
SIDE.Util = {
};

/**
 * @type {*}
 * @static
 */
SIDE.Util.log = new log4javascript.getLogger("SIDE.Util");

/**
 * @param {string} param name of the parameter you want to extract from the query string
 * provided in the window href of the user agent
 * @return {string}
 */
SIDE.Util.getParam = function(param) {
	var qs = window.location.search.substring(1);
    var params = SIDE.Util.getQueryParams(qs)

    return params[param];
}

/**
 * @param {string} qs query string
 * @returns {Object}
 */
SIDE.Util.getQueryParams = function(qs) {
    qs = qs.split("+").join(" ");
    var params = {};
    var tokens;
    var pattern = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = pattern.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

/**
 * Returns the protocol + host + port string
 * @param {string} location window.location.href
 * @returns {Object}
 */
SIDE.Util.getHost = function(location) {
	return location.replace(/^(https?:\/\/[^\/]*)\/.*/,'$1');
}

/**
 * Encodes an url in a very simple way, transforming ? in %3F and & in %26
 * @param {string} url url to encode
 * @returns {string}
 */
SIDE.Util.encodeUrl = function(url) {
	SIDE.Util.log.trace("encodeUrl - before processing : ", url);

	var tmpUrl = url;
	tmpUrl = tmpUrl.replace(/\?/g, "%3F");
	SIDE.Util.log.trace("encodeUrl - after processing 1 : ", tmpUrl);

	tmpUrl = tmpUrl.replace(/&/g, "%26");
	SIDE.Util.log.trace("encodeUrl - after processing 2 : ", tmpUrl);

	return tmpUrl;
}

/**
 * Adds proxy to make ajax request to bypass browser limitations.
 * The proxy is only added if the url doesn't contain the window.location.origin
 * 
 * @param {string} url url to call
 * @param {string} mimeType mimeType of the resulted content type
 * @returns {string}
 */
SIDE.Util.addProxyService = function(url, mimeType) {
	if (url.indexOf(window.location.origin) == -1) {
		return "proxy.jsp?"
			+ "url=" + SIDE.Util.encodeUrl(url)
			+ "&mimeType=" + mimeType;		
	} else {
		return url;
	}
}

/**
 * Makes actually ajax request based on ExtJS ($). Returns nothing.
 * @param {*} _xhrArgs object configuring the request to make 
 * @returns
 */
SIDE.Util.request = function(_xhrArgs) {
	var xhrArgs = _xhrArgs;
	if (xhrArgs['noProxy'] !== true) {
		xhrArgs['url'] = SIDE.Util.addProxyService(xhrArgs['url'], xhrArgs['mimeType']);
		SIDE.Util.log.info("SIDE.Util.request : xhrArgs.url", xhrArgs['url']);
	}
	return Ext.Ajax.request(xhrArgs);
}
/**
 * Makes actually ajax request based on jQuery ($). Returns nothing.
 * @param {*} _xhrArgs object configuring the request to make. 
 * @returns
 */
SIDE.Util.get = function(_xhrArgs) {
	var xhrArgs = _xhrArgs;
	if (xhrArgs['noProxy'] !== true) {
		xhrArgs['url'] = SIDE.Util.addProxyService(xhrArgs['url'], xhrArgs['mimeType']);
		SIDE.Util.log.info("SIDE.Util.get : xhrArgs.url", xhrArgs['url']);
	}
	$.ajax({
	  'url': xhrArgs['url'],
	  'cache': xhrArgs['cache'] || false,
	  'success': xhrArgs['success'],
	  'failure': xhrArgs['failure'] || function () {},
	  'async': xhrArgs['async'] || false,
	  'dataType': 'json'
//	  'dataType': xhrArgs['mimeType']
	});
}

/**
 * Makes POST ajax request based on jQuery ($). Returns nothing.
 * @param {*} _xhrArgs object configuring the request to make. 
 * @returns
 */
SIDE.Util.post = function(_xhrArgs) {
	var xhrArgs = _xhrArgs;
	if (xhrArgs['useProxy'] === true) {
		xhrArgs['url'] = SIDE.Util.addProxyService(xhrArgs['url'], xhrArgs['mimeType']);
		SIDE.Util.log.info("SIDE.Util.get : xhrArgs.url", xhrArgs['url']);
	}

	$.ajax({
	  'type': 'POST',
	  'url': xhrArgs['url'],
	  'data': xhrArgs['data'],
	  'cache': xhrArgs['cache'] || false,
	  'success': xhrArgs['success'],
	  'failure': xhrArgs['failure'] || function () {},
	  'async': xhrArgs['async'] || false,
	  'dataType': xhrArgs['mimeType']
	});
}

/**
 * Makes actually JSONP ajax request based on dojo. Returns the content.
 * @param {*} _xhrArgs object configuring the JSONP request to make.
 * @returns {*}
 */
SIDE.Util.getJsonP = function(_xhrArgs) {
	var result = null;
	var xhrArgs = _xhrArgs;
	var query = dojo.io.script.get(xhrArgs);
	
	return query;
}

/**
 * Gets current script tag
 * @returns {string}
 */
SIDE.Util.getScriptParameter = function() {
	var scripts = document.getElementsByTagName('script');
	return scripts[scripts.length - 1].src;
}

/**
 * Gets hash code corresponding to the input string
 * Other algorithms may be used (SHA-1 is default) like SHA-256, SHA-512, ...
 * cf http://jssha.sourceforge.net/
 * @param {string} input string to hash
 * @returns {string}
 */
SIDE.Util.getHash = function(input) {
	var shaObj = new jsSHA(input, "ASCII");
	return shaObj.getHash("HEX");
}

/**
 * @type {*}
 * @static
 */
SIDE.Util.log = new log4javascript.getLogger("SIDE.Util");
