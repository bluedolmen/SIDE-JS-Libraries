<root>
<jsp:include page="fileUtil.js"/>

logger.log('toValidation1RO.js');

logger.log('Target initialization');
var target = '3 - 1RO';

Util.move(bpm_package, target, 'JobOffer:JobRequisition_history');

</root>
