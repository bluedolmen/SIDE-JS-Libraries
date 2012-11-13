<import resource="classpath:alfresco/webscripts/extension/js/SIDE/base.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Folder.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/csvjson.js">

/**
 * 2006-2012 BlueXML Copyright
 *
 * This class cleans content in an Alfresco repository
 *
 * @author Jean-Christophe Kermagoret (jck@bluexml.com)
 * @namespace SIDE.Alfresco.Admin.Clean
 *
 **/

SIDE.define("SIDE.Alfresco.Admin.Clean");
/*
var SIDE = SIDE || {};
SIDE.Admin = SIDE.Admin || {};
SIDE.Admin.Clean = SIDE.Admin.Clean || {};
*/

SIDE.Alfresco.Admin.Clean.showDocumentFromNS = function(ns) {
  print("Show document from namespace: " + ns +"\r\n");
  var nodes = search.luceneSearch("TYPE:content");
  if (n.typeShort.indexOf(ns + ":") != -1) {
    print("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef);
  }

  print("End");

}

/*
 * Removes the documents whose name space is the provided parameter
 */
SIDE.Alfresco.Admin.Clean.removeDocumentFromNS = function(ns) {
  print("Search by namespace: " + ns +"\r\n");
  var nodes = search.luceneSearch("TYPE:content");

  for each(n in nodes) {
    if (n.typeShort.indexOf(ns + ":") != -1) {
      print("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef);
      n.remove();
    }
  };

  SIDE.Alfresco.Admin.Clean.showDocumentFromNS(ns);
}

SIDE.Alfresco.Admin.Clean.removeMacOSXArtefacts = function() {
  print("Search by name: .DS_Store\r\n");
//  var nodes = search.luceneSearch("@name:.DS_Store");
  var nodes = search.luceneSearch("TYPE:content");

  for each(n in nodes) {
      print("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef);
//      n.remove();
  };
}

SIDE.Alfresco.Admin.Clean.removeMacOSXArtefacts();