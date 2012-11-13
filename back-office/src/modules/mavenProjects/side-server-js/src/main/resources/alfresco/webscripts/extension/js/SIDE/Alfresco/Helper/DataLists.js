<import resource="classpath:alfresco/webscripts/extension/js/SIDE/base.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Folder.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/csvjson.js">

SIDE.define("SIDE.Alfresco.Helper.DataLists");
/**
 * 2006-2012 BlueXML Copyright
 *
 * This class creates data lists from csv data
 *
 * @author Jean-Christophe Kermagoret (jck@bluexml.com)
 *
 * @class DataLists
 * @static
 * @module SIDE.Alfresco
 * @submodule SIDE.Alfresco.Helper
 **/

/**
 * Creates the "dataLists" directory if not present and the datalists
 * for the provided site.
 *
 * @method create
 *
 **/
SIDE.Alfresco.Helper.DataLists.create = function(config) {
  var siteName = config.siteName;
  var title = config.title;
  var description = config.description;
  var dlItemType = config.type;

  if (logger.isDebugEnabled()) { logger.debug(config); };

  // We check the site and data lists exist
  // Sites should always exist from Alfresco > 3
  var site = companyhome.childByNamePath("Sites/" + siteName);
  if (site != null) {
    // We check dataLists directory exists and creates it if not
    var dataListsNode = site.childByNamePath("dataLists")
                          || sah.Folder.create(site, "dataLists", "Data Lists");
    if (dataListsNode == null) {
  	    throw new Error("Main Data Lists directory doesn't exist and can't be created");
  	}

    // We create the data list
    var props = new Array(3);
    props["cm:title"] = title;
    props["cm:description"] = description;
    props["dl:dataListItemType"] = dlItemType;

    return dataListsNode.createNode(title, "dl:dataList", props);
  } else {
    // Sites doesn't exist. Big problem :-(
    throw new Error("DataListsError creation");
  }
}

/**
 * Adds an item into an existing data list
 *
 * @method addItem
 * @param {String} siteName Site short name
 * @param {NodeRef} dlInstance dataList object
 * @param {NodeRef} metaData item properties
 * @returns {NodeRef} The just created item
 */
SIDE.Alfresco.Helper.DataLists.addItem = function(siteName, dlInstance, metaData) {
  logger.debug("siteName = " + siteName + " / dlInstance = " + dlInstance + " / metadata = " + metaData);
  logger.log(metaData);
  var dl = companyhome.childByNamePath("Sites/" + siteName + "/dataLists/" + dlInstance);

  var props = {};
//  props["cm:title"] = metaData.cols["long"] + " (" + metaData.cols["short"] + ")";
  props["cm:title"] = metaData.cols["long"];

  var item = companyhome.childByNamePath("Sites/" + siteName + "/dataLists/" + dlInstance + "/" + props["cm:title"]);
  if (!item) {
    logger.debug("cm:title = " + props["cm:title"]);
    for (k in metaData.cols) {
      var key = metaData.qname + metaData.modelPrefix + "_" + k;
      props[key] = metaData.cols[k];
      logger.debug("* " + props[key]);
    }
    logger.debug(props);
    return dl.createNode(props["cm:title"], metaData.target, props);
  } else {
    return item;
  }

};

SIDE.Alfresco.Helper.DataLists.createFromCSVData = function(csvData) {
  var jData = csvjson.csv2json(csvData);
  for(var i = 1; i < jData.length; i++) {
    null;
  }
}

