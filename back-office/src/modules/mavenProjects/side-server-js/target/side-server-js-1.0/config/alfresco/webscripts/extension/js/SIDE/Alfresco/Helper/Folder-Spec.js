<import resource="classpath:alfresco/webscripts/extension/js/external/env.rhino.1.2.13.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/pavlov.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit-cli.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Folder.js">

QUnit.specify.globalApi = true;

pavlov.specify("Folder Test Set", function() {
  describe("Folder Helper", function() {
    
    it("should be able to create a folder in companyhome", function() {
      var folder = SIDE.Alfresco.Helper.Folder.createPath(companyhome,"Sites/test/documentLibrary/test/test1");
      assert(folder.name).equals("test1");
    });
    
    it("should be able to create a folder in Sites", function() {
      var site = companyhome.childByNamePath("Sites");
      var folder = SIDE.Alfresco.Helper.Folder.createPath(site,"test/documentLibrary/test/test2");
      assert(folder.name).equals("test2");
    });
    
    it("should be able to create a set of folders in Sites", function() {
      var site = companyhome.childByNamePath("Sites");
      var pathes = SIDE.Alfresco.Helper.Folder.createPathes(site, [
        "test/documentLibrary/test/test3/test31",
        "test/documentLibrary/test/test3/test32"
        ]);
      assert(site.childByNamePath("test/documentLibrary/test/test3/test31").name).equals("test31");
      assert(site.childByNamePath("test/documentLibrary/test/test3/test32").name).equals("test32");
    });

    it("should be able to remove a test folders in Sites", function() {
      var site = companyhome.childByNamePath("Sites");
      assert(site.childByNamePath("test/documentLibrary/test").remove()).equals(true);
    });
    
  });
});

QUnit.load();
QUnit.start();