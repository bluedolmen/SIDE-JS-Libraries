/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */

/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */


	Ext.onReady(function() {
		
		// Initialization just after authentication
		// The ticket is stored to be reused later
		SIDE.pattern.Observer.subscribe('/authenticate/ticket', function(data) {
			ticket = data.value;
			SIDE.pattern.Observer.publish('/menu/tree', [data]);
		});
		
		// Accordion and tree initialization
		SIDE.pattern.Observer.subscribe('/menu/tree', SIDE.component.view.MenuTree);
		SIDE.pattern.Observer.subscribe('/repository/uuid', function(msg) {
			var value = msg.value;
			alert('A file')
		});
		SIDE.pattern.Observer.subscribe('/repository/uuid/folder', function(msg) {
			var value = msg.value;
			alert('A folder')
		});
		
		var guardian = new SIDE.security.Authenticator(SIDE.params.alfresco + "/service/api/login");
		ticket = guardian.getTicket("admin", "admin");
	});
		