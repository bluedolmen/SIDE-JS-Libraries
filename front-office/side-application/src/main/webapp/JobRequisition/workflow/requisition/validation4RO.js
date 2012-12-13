<root>
<jsp:include page="fileUtil.js"/>

logger.log('validation4RO.js');

logger.log('Target initialization');
//var target = '6 - 4RO';
var target = '6 - Approuve';

var file = Util.getMainFile(bpm_package, "Demande de recrutement.pdf");
file.properties["JobOffer:conclusion"] = ;
file.save();

</root>
