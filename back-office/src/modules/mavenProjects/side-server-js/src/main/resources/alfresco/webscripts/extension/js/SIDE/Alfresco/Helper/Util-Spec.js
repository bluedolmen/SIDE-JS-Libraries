<import resource="classpath:alfresco/webscripts/extension/js/external/env.rhino.1.2.13.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/pavlov.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit-cli.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Util.js">

QUnit.specify.globalApi = true;

pavlov.specify("Data List Test Set", function() {
  describe("Data List Helper", function() {

    it("should be able to touch all documents retrieved by name space", function() {
      var nodes = SIDE.Alfresco.Helper.touchByNS("cm");
      assert(nodes.length > 0).equals(true);
    });

    it("should be able to touch all documents retrieved by query", function() {
        var nodes = SIDE.Alfresco.Helper.touchByQuery('@cm\:name:"*.pdf"');
        assert(nodes.length > 0).equals(true);
    });

});

QUnit.load();
QUnit.start();