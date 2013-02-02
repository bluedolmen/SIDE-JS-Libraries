/*
    * menu portlet publishes events
*/

// Create new YUI instance, and populate it with the required modules
YUI().use('event', function(Y) {
 
    // Event available, and ready for use.
 
});

//the function we'll use to handle the event:
function handleClick(e) {
    //Pass the event facade to the logger or console for
    //inspection:
    Y.log(e);
}
 
//assuming we have an element on the page with an ID
//attribute "foo":
YUI().use('node-base', function(Y) {
    Y.on("click", handleClick, "#foo");
});

var callback = {
	success: function() {
		alert("Success...");
	},
	failure: function() {
		alert("Failure...");
	}
}

var mainPortlet = function(args) {
	alert(args);
	YAHOO.util.Connect.asyncRequest('GET', args, {
		success: callback.success, 
		failure: callback.failure, 
		scope  : this}
	); 
}

var Transform = {
	menuLinks: function() {
		var links = YAHOO.util.Selector.query('a','menu');
		YAHOO.util.Event.addListener(links, 'click', process);
	}
}

function process(e, el) {
	e.preventDefault();
	alert("test");
	YAHOO.util.EventProvider.fireEvent("/menu/info", [{href: this.href}]);
}

YAHOO.util.Event.onDOMReady(function() {
	Transform.menuLinks();
	YAHOO.util.EventProvider.subscribe("/menu/info", mainPortlet);
});
