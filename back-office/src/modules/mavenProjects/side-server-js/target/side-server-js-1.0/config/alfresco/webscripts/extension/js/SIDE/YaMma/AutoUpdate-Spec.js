<import resource="classpath:alfresco/webscripts/extension/js/external/env.rhino.1.2.13.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/pavlov.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit-cli.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/log4javascript-rhino.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/base.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Search.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/YaMma/AutoUpdate.js">

/**
 * BlueXML Copyright
 * @author Jean-Christophe Kermagoret (jck@bluexml.com)
 **/

QUnit.specify.globalApi = true;

pavlov.specify("Data List Test Set", function() {
  describe("Attribute Updater", function() {

	var p = "SIDECommonCRM\\:org_sidelabs_is_common_crm_";

    before(function() {});

    it("should be able to build documents names according their type and corresponding rules", function() {
/*    	  var nodes = SIDE.Alfresco.Helper.Search.byQuery('TYPE:p + "Contact', function(n) {
    		  SIDE.YaMma.AutoUpdate.update(nodes[0]);
    	  });
*/
    	  var nodes = SIDE.Alfresco.Helper.Search.byQuery('TYPE:' + p + 'Contact', function(n) {
    		  SIDE.YaMma.AutoUpdate.update(n);
    	  });

    	  var nodes = SIDE.Alfresco.Helper.Search.byQuery('TYPE:' + p + 'Entity', function(n) {
    		  SIDE.YaMma.AutoUpdate.update(n);
    	  });

    	  var nodes = SIDE.Alfresco.Helper.Search.byQuery('TYPE:' + p + 'Person', function(n) {
    		  SIDE.YaMma.AutoUpdate.update(n);
    	  });

    	  var nodes = SIDE.Alfresco.Helper.Search.byQuery('TYPE:' + p + 'Service', function(n) {
    		  SIDE.YaMma.AutoUpdate.update(n);
    	  });

    	assert("Test").equals("Test");
    });
  });
});

QUnit.load();
QUnit.start();

