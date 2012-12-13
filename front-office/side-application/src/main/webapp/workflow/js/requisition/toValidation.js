<root>

logger.log("toValidation.js");

var target = "3 - FRO";

var Util = {};
Util.move = function (bpm_package, target) {
	for (var i = 0; i &lt; bpm_package.children.length; i++) {
		var file = bpm_package.children[i];
		var parent = file.parent.parent;
		logger.log("Moving -" + file.name + "- to ../" + target);
		//logger.log(parent.childByNamePath(parent.name));
		try {
			file.move(parent.childByNamePath(target));
		} catch (e) {
			logger.log("File " + file.name + " has not been moved into " + target + ".");
		}
	}
}

Util.move(bpm_package, target);

</root>
