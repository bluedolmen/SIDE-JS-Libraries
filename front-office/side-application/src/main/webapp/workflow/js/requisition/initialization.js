<root>

logger.log("initialization.js");

var target = "3 - FRO";

for (var i = 0; i &lt; bpm_package.children.length; i++) {
	var file = bpm_package.children[i];
	var parent = file.parent.parent;
	logger.log(parent.childByNamePath(parent.name));
	try {
		file.move(parent.childByNamePath(target));
	} catch (e) {
		logger.log("File " + file.name + " has not been moved into " + step + ".");
	}
}

</root>
