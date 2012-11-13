function SIDE_Chart(data, config) {
	this.records = data.records;
	this.config = config;
}

SIDE_Chart.prototype.convertData2Chart = function() {

	document.writeln("<table"
		+ " width=\"" + this.config.width + "\""
		+ " class=\"" + this.config.cssClass + "\""
		+ " id=\"" + this.config.id + "\""
		+ " summary=\"" + this.config.summary + "\""
		+ ">");
	document.writeln("<caption>" + this.config.caption + "</caption>");

	document.writeln("<thead>");
	document.writeln("<tr>");
	document.writeln("<th class=\"graph_id\" title=\"" + this.config.filter[0] + "\">" + this.config.filter[0] + "</th>");
	document.writeln("<th class=\"graph_value\" title=\"" + this.config.filter[1] + "\">" + this.config.filter[1] + "</th>");
	document.writeln("</tr>");	
	document.writeln("</thead>");

	document.writeln("<tbody>");	
	for(var i=0; i < this.records.length; i++) {
		var name = this.records[i][this.config.filter[0]];
		var value = this.records[i][this.config.filter[1]];

		document.writeln("<tr>");
/*		document.writeln("<td>" + this.config.name(name) + "</td>");		*/
		document.writeln("<td>" + this.config.value(value) + "</td>");		
		document.writeln("<td>" + this.config.value(value)  + "</td>");
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
