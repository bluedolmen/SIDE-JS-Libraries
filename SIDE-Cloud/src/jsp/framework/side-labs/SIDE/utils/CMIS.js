/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.utils.CMIS");

/**
 * @namespace
 */
SIDE.utils.CMIS = {
};

/**
 * @param {Element} _el 
 * @param {string} name 
 * @returns {string}
 */
SIDE.utils.CMIS.getProperty = function(_el, name) {
	var props = _el.getElementsByTagName('propertyId');
	if (props.length == 0) {
		props = _el.getElementsByTagName('cmis:propertyId');
	}
	for (var i = 0; i < props.length; i++) {
	 	var el = props[i];
	 	if (el.getAttribute('propertyDefinitionId') == name) {
	 		var val = el.getElementsByTagName('value');
			if (val.length == 0) {
				val = el.getElementsByTagName('cmis:value');
			}
	 		if (val.length > 0) {
	 			return val[0].textContent;
	 		}
	 	}
	 }
	 return '';
}

/**
 * @type {*}
 * @static
 */
SIDE.utils.CMIS.log = new log4javascript.getLogger("SIDE.utils.CMIS");
