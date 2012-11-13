<import resource="classpath:alfresco/webscripts/extension/js/SIDE/base.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Search.js">

SIDE.define("SIDE.YaMma.AutoUpdate");

/**
 * 2006-2012 BlueXML Copyright
 *
 * This class provides a auto-update mechanisme to update metadata
 * based on other metadata's values.
 *
 * @author Jean-Christophe Kermagoret (jck@bluexml.com)
 *
 * @class AutoUpdate
 * @static
 * @module SIDE.YaMma
 *
 */
SIDE.YaMma.AutoUpdate.update = function(n) {
	var p = "SIDECommonCRM:org_sidelabs_is_common_crm_";
	logger.log("Type = " + n.typeShort);
	if (n.typeShort == p + "Contact") {
		n.name = n.properties[p + "Contact_denomination"] + "(" + n.properties[p + "Contact_siretn"] + ")";
	} else if (n.typeShort == p + "Entity") {
		n.name = n.properties[p + "Entity_denomination"] + "(" + n.properties[p + "Entity_siretn"] + ")";
	} else if (n.typeShort == p + "Person") {
		n.name = n.properties[p + "Person_denomination"] + "(" + n.properties[p + "Person_siretn"] + ")";
	} else if (n.typeShort == p + "Service") {
		n.name = n.properties[p + "Service_denomination"] + "(" + n.properties[p + "Service_siretn"] + ")";
	}

};
