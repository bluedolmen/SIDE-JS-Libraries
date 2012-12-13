<root>
<jsp:include page="fileUtil.js"/>

logger.log('validation3RO.js');

logger.log('Target initialization');
var target = '6 - Approuve';

Util.validate(
		Util.getMainFile(bpm_package, "Demande de recrutement.pdf"),
		"Signature3RO",
		"3RO");
Util.move(bpm_package, target, 'JobOffer:JobRequisition_history');

</root>
