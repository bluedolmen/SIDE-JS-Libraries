
logger.log("fileUtil.js");

var Util = {};

Util.dump = function (file) {
	logger.log("Filename = " + file.name);
	logger.log("Parent directory = " + file.parent.name);
	for (var p in file.properties) {
		logger.log("file[" + p + "] = " + file.properties[p]);
	}
}

Util.move = function (bpm_package, target, sig) {
	for (var i = 0; i &lt; bpm_package.children.length; i++) {
		var file = bpm_package.children[i];

		var info = person.properties["firstName"]
		+ " " + person.properties["lastName"]
		+ " (" + person.properties["userName"] + ")"
		+ " - " + new Date();

		logger.log("Set " + sig + " to " + info);
		file.properties[sig] = info;
		file.save();
		logger.log("=> The stored value is " + file.properties[sig]);

		var parent = file.parent.parent;
		logger.log(parent.childByNamePath(parent.name));
		try {
			file.move(parent.childByNamePath(target));
		} catch (e) {
			logger.log("File " + file.name + " has not been moved into " + target + ".");
		}
	}
}
