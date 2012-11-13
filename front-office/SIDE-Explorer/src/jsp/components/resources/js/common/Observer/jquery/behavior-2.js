/*
    * menu portlet publishes events
*/
var mainPortlet = function(args) {		
	$.get(args, function(data) {
		$('#main').html(data);
	});
}

var o = new Observer;
o.subscribe(mainPortlet);

$(document).ready(function() {
	$("#menu a").click(function(e) {
		e.preventDefault();
        o.fire(this.href);
	});
});
