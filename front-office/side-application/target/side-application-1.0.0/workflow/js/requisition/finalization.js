<root>

logger.log("finalization.js");

var target = "6 - Approved";

var Util = {};
Util.move = function (bpm_package, target) {
	for (var i = 0; i &lt; bpm_package.children.length; i++) {
		var file = bpm_package.children[i];

		logger.log("Set Requisition:ch_unog_dcm_oime_its_Order_eo to Emma PEEL");
		file.properties["Requisition:ch_unog_dcm_oime_its_Order_eo"] = "Emma PEEL - " + new Date();
		logger.log("=> Requisition:ch_unog_dcm_oime_its_Order_eo to Emma PEEL set");
		//file.properties["Requisition:ch_unog_dcm_oime_its_Order_eoSignatureDate"] = new Date();
		file.save();
		logger.log("=> Document saved");
		logger.log("=> The stored value is " + file.properties["Requisition:ch_unog_dcm_oime_its_Order_sro"]);

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
