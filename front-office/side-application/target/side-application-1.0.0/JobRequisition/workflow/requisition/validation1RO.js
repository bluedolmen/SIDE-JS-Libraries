<root>
<jsp:include page="fileUtil.js"/>

logger.log('validation1RO.js');

logger.log('Target initialization');
var target = '4 - Validation par le Directeur de cabinet';

Util.move(bpm_package, target, 'JobOffer:JobRequisition_history');

</root>
