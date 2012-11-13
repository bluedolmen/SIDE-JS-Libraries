<import resource="classpath:alfresco/webscripts/extension/js/SIDE/base.js">

SIDE.define("SIDE.Alfresco.Helper.Search");

/**
 * 2006-2012 BlueXML Copyright
 *
 * This class provides methods to search data in a more consistent way
 *
 * @author Jean-Christophe Kermagoret (jck@bluexml.com)
 *
 * @class Search
 * @static
 * @module SIDE.Alfresco
 * @submodule SIDE.Alfresco.Helper
 *
 **/

/**
 * Searches documents by namespace
 *
 * @method byNS
 * @param {String} ns namespace to look for
 * @param {Object} f function to apply on the resulting nodes
 * @returns {Array} nodes verifiyg the provided namespace
 */
SIDE.Alfresco.Helper.Search.byNS = function(ns, f) {
  logger.debug("Show document from namespace: " + ns +"\r\n");
  var nodes = search.luceneSearch("TYPE:content");
  if (f) {
    for each (n in nodes) {
      if (n.typeShort.indexOf(ns) != -1) {
        f(n);
        if (logger.isDebugEnabled()) { logger.debug("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef); };
      }
    }
  };
  logger.debug("End");
  return nodes;
}

/**
 * Searches documents by query
 *
 * @method byQuery
 * @param {String} query lucene query to execute
 * @param {Object} f function to apply on the resulting nodes
 * @returns {Array} nodes verifiyg the provided namespace
 */
SIDE.Alfresco.Helper.Search.byQuery = function(query, f) {
  logger.debug("Show document from query: " + query +"\r\n");
  var nodes = search.luceneSearch(query);
  if (f) {
    for each (n in nodes) {
      if (logger.isDebugEnabled) { logger.debug("Before function - " + n); };
      f(n);
      if (logger.isDebugEnabled) { logger.debug("After function - " + n); };
    }
  }
  logger.debug("End");
  return nodes;
}

/**
 * Provides an unified way to find content.
 *
 * According query type, analyzed very quickly according its first chars,
 * the search is redirected on the corresponding search method
 *
 * @method find
 * @param {String} query Query to execute
 * @param {String} type ?
 * @returns {Array} nodes verifying the provided query
 */
SIDE.Alfresco.Helper.Search.find = function (query, type) {
  if (query.indexOf("+") == 0) {
      return SIDE.Alfresco.Helper.Search.findByLucene(query);
  } else if (query.indexOf("workspace://") == -1) {
      return SIDE.Alfresco.Helper.Search.findByNamePath(query);
  } else {
      return SIDE.Alfresco.Helper.Search.findByNodeRef(query);
  }
}

SIDE.Alfresco.Helper.Search.findByNamePath = function (query, root) {
  logger.log("Executing a childByNamePath query: " + query);
  if (root != null && root != undefined) {
    return root.childByNamePath(query);
  } else {
    return companyhome.childByNamePath(query);
  }
}

SIDE.Alfresco.Helper.Search.findByChildName = function (childName, node) {
  var found = null;
  for(n in node.children) {
    var child = node.children[n];
    //logger.log(child.name);
    if (child.name == childName) {
      found = child;
      break;
    }
  }

  return found;
}

SIDE.Alfresco.Helper.Search.findByNodeRef = function (query) {
  logger.log("Executing a childByNodeRef query: " + query);
  return companyhome.childByNodeRef(query);
}

SIDE.Alfresco.Helper.Search.findByLucene = function (query) {
  logger.log("Executing a lucene query: " + query);
  return search.luceneSearch(query);
}

/**
 * The find method is overridden, which should be done
 * in another file!!!
 *
 * Because of a bug in the indexing system on my system, I had
 * to make that workaround. Only raw lucene queries were working :-(

 * @method find
 * @param {String} query Query to execute
 * @param {Object} [root] The starting object for the search
 * @returns {Array} nodes verifying the provided query and root
 */
SIDE.Alfresco.Helper.Search.find = function (query, root) {
  logger.log("Modified find function:");
  logger.log("* query: " + query);
  logger.log("* root: " + root);
  if (query.indexOf("+") == 0) {
      return SIDE.Alfresco.Helper.Search.findByLucene(query, root);
  } else if (query.indexOf("workspace://") == -1) {
      return SIDE.Alfresco.Helper.Search.findByLucene("+PATH: \"" + query + "\"", root);
  } else {
      return SIDE.Alfresco.Helper.Search.findByNodeRef(query, root);
  }
}
