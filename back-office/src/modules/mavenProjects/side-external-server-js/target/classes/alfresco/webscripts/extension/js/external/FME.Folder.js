var FME = FME || {};
FME.Folder = FME.Folder || {};

FME.Folder.usage = function () {
  print("createFolderPaths(companyhome, [\n"
  	+ "\"test1/somefolder/Test\"\n"
  	+ "\"test2/anotherFolder\"\n"
  	+ "\"test1\"\n"
  	+ "\"test2/andYetAnotherFolder\"\n"
	+ "]);");
}

FME.Folder.createFolderPaths = function(node, paths) {
  for each(var path in paths) {
    FME.Folder.createFolderPath(node, path);
  }
}

FME.Folder.createFolderPath = function(node, path) {
  var elements = path.split("/"), base=node;
  for each(element in elements) {
    var found = base.childByNamePath(element);

    if (!found) {
        found = base.createFolder(element);
        logger.log("created folder: " + found.displayPath + "/" + found.name);
    }
    base = found;
  }
}
