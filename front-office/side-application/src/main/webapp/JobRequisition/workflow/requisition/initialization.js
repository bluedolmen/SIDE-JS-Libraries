<root>
<jsp:include page="fileUtil.js"/>

logger.log('initialization.js');

logger.log('Target initialization');
var target = '3 - Validation par le Chef de service ou Directeur de p™le';

Util.move(bpm_package, target, 'JobOffer:JobRequisition_history');

</root>
