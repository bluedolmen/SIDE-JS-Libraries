<root>

logger.log("approve.js");

var target = "6 - Approved";

var Util = {};
Util.move = function (bpm_package, target) {
	for (var i = 0; i &lt; bpm_package.children.length; i++) {
		var file = bpm_package.children[i];

		var info = person.properties["firstName"]
		+ " " + person.properties["lastName"]
		+ " (" + person.properties["userName"] + ")"
		+ " - " + new Date();

		logger.log("Set Requisition:ch_unog_dcm_oime_its_Order_eo to " + info);
		file.properties["Requisition:ch_unog_dcm_oime_its_Order_eo"] = info;
		file.save();
		logger.log("=> The stored value is " + file.properties["Requisition:ch_unog_dcm_oime_its_Order_eo"]);

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
crash();
</root>
