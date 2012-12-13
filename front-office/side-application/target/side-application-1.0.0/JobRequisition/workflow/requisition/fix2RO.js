<root>
<jsp:include page="fileUtil.js"/>

logger.log('fix2RO.js');

logger.log('Target initialization');
var target = '2 - Correction';

Util.move(bpm_package, target, 'JobOffer:JobRequisition_history');

</root>
