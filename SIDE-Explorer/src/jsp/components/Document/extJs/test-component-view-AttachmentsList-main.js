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
			SIDE.pattern.Observer.publish('/document/attachments/list', [data]);
		});

		//SIDE.pattern.Observer.subscribe('/document/attachments/list', SIDE.component.store.CMISStore);
		SIDE.pattern.Observer.subscribe('/document/attachments/list', function(msg) {
			new (SIDE.component.store.CMISStore([msg], {channel: '/CMISStore/data'}));
		});
		SIDE.pattern.Observer.subscribe('/CMISStore/data', SIDE.component.view.AttachmentsList);
		
		var guardian = new SIDE.security.Authenticator(SIDE.params.alfresco + "/service/api/login");
		ticket = guardian.getTicket("admin", "admin");
	});
		