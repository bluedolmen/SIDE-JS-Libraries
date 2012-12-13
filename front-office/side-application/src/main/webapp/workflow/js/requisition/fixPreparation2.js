<root>

logger.log("fixPreparation2.js");

logger.log("Target initialization");
var target = "2 - Correction";

var Util = {};
Util.move = function (bpm_package, target) {
	for (var i = 0; i &lt; bpm_package.children.length; i++) {
		var file = bpm_package.children[i];
		var parent = file.parent.parent;
		logger.log(parent.childByNamePath(parent.name));
		try {
			file.move(parent.childByNamePath(target));
		} catch (e) {
			logger.log("File " + file.name + " has not been moved into " + target + ".");
		}
	}
}

Util.move(bpm_package, target);

</root>
