<import resource="classpath:alfresco/webscripts/extension/js/SIDE/base.js">

SIDE.define("SIDE.Alfresco.Helper.Folder");

/**
 * 2006-2012 BlueXML Copyright
 *
 * This class provides helpers to manage folders. It of course uses
 * Alfresco folder implementation. To augment it should be a good idea.
 *
 * @author Jean-Christophe Kermagoret (jck@bluexml.com)
 *
 * @class Folder
 * @static
 * @module SIDE.Alfresco
 * @submodule SIDE.Alfresco.Helper
 *
 */

/**
 * Creates a folder from provided name and description in the parent serving
 * as root
 *
 * @method create
 * @param {nodeRef} node Root to create path
 * @param {String} path Directory to create
 * @param {String} description String description
 * @returns {Array} nodes Array of created nodes, corresponding to each
 * created path
 *
 * @BUG: Should limit search to direct children or try and catch exception
 */
SIDE.Alfresco.Helper.Folder.create = function (parent, path, description) {
  var folder = parent.childByNamePath(path);
	if (folder == null && parent.hasPermission("CreateChildren")) {
	   folder = parent.createFolder(path);
	   folder.properties["cm:description"] = description || "";
	   folder.save();
	}
	return folder;
}

/**
 * Creates a set of string paths in the provided node, serving as root.
 *
 * @method createPathes
 * @param {nodeRef} node Root to create path
 * @param {Array} pathes Array of string pathes
 * @returns {Array} nodes Array of created nodes, corresponding to each
 * created path
 */
SIDE.Alfresco.Helper.Folder.createPathes = function(node, pathes) {
  var result = [];
  for each(var path in pathes) {
    var folder = SIDE.Alfresco.Helper.Folder.createPath(node, path);
    Array.push(result, folder);
  }
  return result;
}

/**
 * Creates a folder from provided path and description in the parent serving
 * as root. Intermediate directories will be created.
 *
 * This works like the unix command: "mkdir -p ..."
 *
 * @method createPath
 * @param {nodeRef} node Root to create path
 * @param {String} path Path to create
 * @param {String} description String description
 * @returns {Array} nodes Array of created nodes, corresponding to each
 * created path
 */
SIDE.Alfresco.Helper.Folder.createPath = function(node, path) {
  var elements = path.split("/");
  var base = node;
  for each(element in elements) {
    logger.debug("* element = " + element + ".");
    var found = base.childByNamePath(element);

    if (!found) {
        found = base.createFolder(element);
        logger.debug("created folder: " + found.displayPath + "/" + found.name);
    }
    base = found;
  }
  return base;
}

/**
 * Returns an array of results if rootPath exists or creates it and
 * returns it when the rootPath is created, still an array!
 *
 * @method findOrCreateIfNotExists
 * @param {String} rootPath
 * @return {Array} nodes corresponding to the rootPath query or the
 * just created one
 */
SIDE.Alfresco.Helper.Folder.findOrCreateIfNotExists = function(rootPath) {
    logger.log("Looking for -" + rootPath + "- first.");
    var nodes = SIDE.Alfresco.Helper.Search.find(rootPath);
    if (nodes.length > 0) {
      logger.log(rootPath + " already exist.");
      return nodes;
    } else {
      /* rootPath = /cm:a/cm:b/cm:c
       * parentPath /cm:a/cm:b
       * childName = cm:c
       */
      logger.log(rootPath + " doesn't seem to exist. Let's create it.");
      var matches = rootPath.match(/(\/.*)\/cm:([^\/]*)$/);
      var parentPath = matches[1];
      var childName = matches[2];
      logger.log("rootPath = -" + rootPath + ".");
      logger.log("* parentPath = -" + parentPath + ".");
      logger.log("* childName = -" + childName + ".");

      logger.log("But first, let's look for parentPath: " + parentPath);
      var parentNodes = SIDE.Alfresco.Helper.Search.find(parentPath);
      if (parentNodes.length > 0) {
        logger.log(parentPath + " parentPath has been found.");
        // We found it. We only take one but there is normally only one :-)
        var root = parentNodes[0].createNode(childName, "cm:folder");
        logger.log(root);
        if (root == null || root == undefined ) {
          logger.log(parentPath + "/cm:" + childName + " can't be created. What's the problem?");
        } else {
          logger.log(parentPath + "/cm:" + childName + " has been created. The show can go on.");
          return [root];
        }
      } else {
          logger.log(rootPath + " can neither be created nor found. Well... I think there is a problem.");
      }
      return null;
    }
};