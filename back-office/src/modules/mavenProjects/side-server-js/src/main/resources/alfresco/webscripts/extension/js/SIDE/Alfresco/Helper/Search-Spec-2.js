<import resource="classpath:alfresco/webscripts/extension/js/external/env.rhino.1.2.13.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/pavlov.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit-cli.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Search.js">

QUnit.specify.globalApi = true;

pavlov.specify("Data List Test Set", function() {
  describe("Data List Helper", function() {

    it("should be able to look for documents named .*, ._*, .DS_Store", function() {
        var nodes = SIDE.Alfresco.Search.Helper.byQuery(
          'TYPE:content AND @cm\\:name:._1',
          function(n) {
//            logger.debug("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef);
        	  if (n.name.startsWith("._1")) {
        		  print(n.name);
        	  }
          }
        );
        assert(nodes.length > 0).equals(true);
      });

  });
});

QUnit.load();
QUnit.start();