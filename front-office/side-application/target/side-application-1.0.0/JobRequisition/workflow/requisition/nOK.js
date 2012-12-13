<root>
<jsp:include page="fileUtil.js"/>

logger.log('nOK.js');

logger.log('Target initialization');
var target = '9 - Rejected';

Util.move(bpm_package, target, 'JobOffer:JobRequisition_history');

</root>
