<root>
<jsp:include page="fileUtil.js"/>

logger.log('fix3RO.js');

logger.log('Target initialization');
var target = '2 - Correction';

Util.reset(Util.getMainFile(bpm_package, "Demande de recrutement.pdf"));
Util.move(bpm_package, target, 'JobOffer:JobRequisition_history');

</root>
