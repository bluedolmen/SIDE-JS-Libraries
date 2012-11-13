
function convert2chart(data) {
	alert("It's " + (new Date()).getTime());

	records=data.records;
	
	document.writeln("<table class=\"graph_table chart_type_pie table_hidden\" id=\"Some_total\" summary=\"Some totals for this report\">");
	document.writeln("<caption>Some totals</caption>");
	document.writeln("<thead>");
	document.writeln("<tr>");
	document.writeln("<th class=\"graph_id\" title=\"org_sidelabs_is_marketing_Person_email\">" + "org_sidelabs_is_marketing_Person_email" + "</th>");
	document.writeln("<th class=\"graph_value\" title=\"org_sidelabs_is_marketing_Gis_altitude\">" + "org_sidelabs_is_marketing_Gis_altitude" + "</th>");
	document.writeln("</tr>");
	
	/*
	for (rec in records[0]) {
		document.writeln("<th>" + rec + "</th>");
	}
	*/
	
	document.writeln("</thead>");
	document.writeln("<tbody>");
	
	for(var i=0; i<records.length; i++) {
		document.writeln("<tr>");
		document.writeln("<td>" + records[i]["org_sidelabs_is_marketing_Person_email"] + "</td>");
		document.writeln("<td>" + records[i]["org_sidelabs_is_marketing_Gis_altitude"]  + "</td>");
		document.writeln("</tr>");
	}
	
	/*
	for(var i=0; i<records.length; i++) {
		document.writeln("<tr>");
		for (rec in records[i]) {
			document.writeln("<td>" + records[i][rec] + "</td>");
		}
		document.writeln("</tr>");
	}*/
	
	document.writeln("</tbody>");
	document.writeln("</table>");
}

//$.get("/alfresco/wcs/com/bluexml/side/contentType/SUBSCRIPTION/org_sidelabs_is_marketing_Person.json", function(data){
$.ajax({
//  url: "test.json",
  url: "/alfresco/wcs/com/bluexml/side/view/Subscription/Person_DataList2.json",
  cache: false,
  success: handleResponse,
  async: false,
  dataType: "json"
});

function handleResponse(data) {
    convert2chart(data);
}