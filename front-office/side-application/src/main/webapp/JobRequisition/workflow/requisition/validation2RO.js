<root>
<jsp:include page="fileUtil.js"/>

logger.log('validation2RO.js');

logger.log('Target initialization');
var target = '5 - Validation par le Maire';

Util.validate(
		Util.getMainFile(bpm_package, "Demande de recrutement.pdf"),
		"Signature2RO",
		"2RO");
Util.move(bpm_package, target, 'JobOffer:JobRequisition_history');

</root>
