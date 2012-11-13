/**
 * 2006-2012 BlueXML Copyright
 *
 * This class provides a function to manage namespaces in js.
 *
 * Adapted to rhino environment from:
 * * http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
 *
 * @author Jean-Christophe Kermagoret (jck@bluexml.com)
 *
 * @class SIDE
 *
 */

/*
<import resource="classpath:alfresco/webscripts/extension/js/external/env.rhino.1.2.13.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/log4javascript-rhino.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/google/base.js">
*/

var SIDE = SIDE || {};

SIDE.define =  function(namespaceString) {
    var parts = namespaceString.split('.'),
    parent = SIDE,
    currentPart = '';

	for(var i = 1, length = parts.length; i < length; i++) {
	    currentPart = parts[i];
	    parent[currentPart] = parent[currentPart] || {};
	    parent = parent[currentPart];
	}

	return parent;
}
