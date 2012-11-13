<import resource="classpath:alfresco/webscripts/extension/js/external/env.rhino.1.2.13.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/pavlov.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit-cli.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Search.js">

QUnit.specify.globalApi = true;

pavlov.specify("Data List Test Set", function() {
  describe("Data List Helper", function() {

    it("should be able to look for all content (not objects - and so folders) type prefixed by 'cm'", function() {
      var nodes = SIDE.Alfresco.Helper.Search.byNS("cm", function(n) {
        logger.debug("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef);
      });
      assert(nodes.length > 0).equals(true);
    });

    it("should be able to remove all content prefixed by HCM-Agent", function() {
      var nodes = SIDE.Alfresco.Helper.Search.byNS("HCM-Agent", function (n) { n.remove(); });
      assert(SIDE.Alfresco.Helper.Search.byNS("HCM-Agent").length).equals(0);
    });

    it("should be able to look for cm type in /Company Home/Sites/test/INBOX"
        + " and convert it in yamma:Document", function() {
      var nodes = SIDE.Alfresco.Helper.Search.byQuery(
        "TYPE:content AND PATH:/Company Home/Sites/test/INBOX",
        function(n) {
          logger.debug("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef);
          n.specializeType("yamma:org_sidelabs_is_operational_yamma_Document");
        }
      );
    });

    it("should be able to look for content and specific @name", function() {
    	var nodes = SIDE.Alfresco.Helper.Search.byQuery(
        "TYPE:content AND @name:ENVELOPPEJ2.pdf",
        function(n) {
          logger.debug("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef);
        }
      );
    });

    it("should be able to look for content, specific @name and specific PATH", function() {
    	var nodes = SIDE.Alfresco.Helper.Search.byQuery(
          'TYPE:content AND @cm\\:name:("Conseil Municipal") ("2 fevrier 2012") AND PATH://cm\\:dircab/cm\\:documentLibrary//\\*',
          function(n) {
            logger.debug("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef);
          }
        );
        assert(nodes.length > 0).equals(true);
      });

    it("should be able to look for documents named .*, ._*, .DS_Store", function() {
        var nodes = SIDE.Alfresco.Helper.Search.byQuery(
          'TYPE:content AND @cm\\:name:(("._") OR (.) OR (".DS_Store"))',
          function(n) {
            logger.debug("(" + n.typeShort + ")\t\t" + n.name + " - " + n.nodeRef);
          }
        );
        assert(nodes.length > 0).equals(true);
      });

  });
});

QUnit.load();
QUnit.start();