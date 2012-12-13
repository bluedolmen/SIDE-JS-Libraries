
logger.log("fileUtil.js");

var Util = {};

Util.dump = function (file) {
	logger.log("Filename = " + file.name);
	logger.log("Parent directory = " + file.parent.name);
	for (var p in file.properties) {
		logger.log("file[" + p + "] = " + file.properties[p]);
	}
}

Util.reset = function (file) {
	logger.log(file.name + " is going to be reset.");
	try {
		var signatures = ["1RO", "2RO", "3RO", "4RO", "5RO"];
		for (var s in signatures) {
			var signature = "JobOffer:Signature" + signatures[s];
			logger.log(signature + " is going to be reset.")
			file.properties[signature + "_name"] = ""
			file.properties[signature + "_signature"] = "";
			file.properties[signature + "_date"] = "";
		}
		file.save();
	} catch (e) {
		logger.log(file.name + " has not been reset.");
		logger.log(e);
		return null;
	}
	logger.log(file.name + " has been reset.");
	return file;
}

Util.validate = function (file, signature, role) {
	logger.log(file.name + " is going to be signed by " + signature + ".");
	try {
		file.properties["JobOffer:" + signature + "_name"] =
			person.properties["firstName"] + " " + person.properties["lastName"];
		if (role != null) {
			file.properties["JobOffer:" + signature + "_signature"] = role;
		} else {
			file.properties["JobOffer:" + signature + "_signature"] = person.properties["userName"];
		}
		file.properties["JobOffer:" + signature + "_date"] = new Date();
		file.save();
	} catch (e) {
		logger.log(file.name + " has not been signed by " + signature + ".");
		logger.log(e);
		return null;
	}
	return file;
};

Util.getMainFile = function (bpm_package, _mainFileName) {
	var mainFile = null;
	for (var i = 0; i &lt; bpm_package.children.length; i++) {
		var dir = bpm_package.children[i];
		logger.log("-" + dir.name + "- has been found");

		var file = dir.childByNamePath(_mainFileName);
		if (file != null) {
			mainFile = file;
		}
	}
	return mainFile;
}

/**
 * Moves the directory contained into bpm_package to the target directory.
 * Please note file is usually a directory for this application, not a file.
 * @param bpm_package
 * @param target
 * @param sig
 */
Util.move = function (bpm_package, target, sig) {

	var info = person.properties["firstName"]
	+ " " + person.properties["lastName"]
	+ " (" + person.properties["userName"] + ")"
	+ " - " + new Date();

	logger.log("Set " + sig + " to " + info);

	var file = Util.getMainFile(bpm_package, "Demande de recrutement.pdf");
	file.properties[sig] += info + "\n";
	file.save();
	logger.log("=> The stored value is " + file.properties[sig]);

	var dir = null;
	var parent = null;
	try {
		dir = bpm_package.children[0];
		logger.log("-" + dir.name + "- has been found");

		parent = dir.parent.parent;
		logger.log(parent.childByNamePath(parent.name));

		dir.move(parent.childByNamePath(target));
	} catch (e) {
		logger.log("Directory " + dir.name + " has not been moved into " + target + ". parent = " + parent.name);
		logger.log(e);
	}

}
