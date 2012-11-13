<import resource="classpath:alfresco/webscripts/extension/js/SIDE/base.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Search.js">

/**
 * 2006-2012 BlueXML Copyright
 *
 * This class just touches content so it appears 'fresh'
 *
 * @author Jean-Christophe Kermagoret (jck@bluexml.com)
 * @namespace SIDE.Alfresco.Helper.Util
 *
 **/

SIDE.define("SIDE.Alfresco.Helper.Util");

//goog.provide("SIDE.Alfresco.Helper.Util");
/*
var SIDE = SIDE || {};
SIDE.Alfresco = SIDE.Alfresco || {};
SIDE.Alfresco.Helper = SIDE.Alfresco.Helper || {};
SIDE.Alfresco.Helper.Util = SIDE.Alfresco.Helper.Util || {};
*/

SIDE.Alfresco.Helper.Util.touchByNS = function(ns) {
  return SIDE.Alfresco.Helper.Search.byNS(ns, function(n) {
	 n.save();
  });
}

SIDE.Alfresco.Helper.Util.touchByQuery = function(query) {
  return SIDE.Alfresco.Helper.Search.byQuery(query, function(n) {
	 n.save();
  });
}
