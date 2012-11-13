
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/Folder.js">

function test1() {
    var site = companyhome.childByNamePath("Sites/test");
    var folder = SIDE.Alfresco.Helper.Folder.create(site, "test");

    if (folder.name == "test") {
      print(folder.name);
      print("success");
    }
    folder.remove();
}

function test2() {
    SIDE.Alfresco.Helper.Folder.createPathes(site, [
      "test/test1/test11",
      "test/test1/test12",
      "test/test2/test21",
      "test/test2/test22",      
      ]);
}      

test2();    



