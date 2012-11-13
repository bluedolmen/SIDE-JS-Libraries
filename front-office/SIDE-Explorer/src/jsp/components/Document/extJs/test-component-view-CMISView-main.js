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
			var rootPath = '';
			SIDE.pattern.Observer.publish('/documents/list/main', [{value: ''}]);
		});
		
		// When an item is clicked, the corresponding node is published on this channel
		// which should be a param of the previous configuration
		// LISTENS: /instance/documents/list/main
		// PUBLISHES: /CMISStore/data
		// @param {string} _path encapsulated into a message
		// @returns
		//SIDE.pattern.Observer.subscribe('/document/attachments/list', SIDE.component.store.CMISStore);
		SIDE.pattern.Observer.subscribe('/documents/list/main', function(msg) {
			new (SIDE.component.store.CMISStore([msg], {channel: '/CMISStore/data'}));
		});

		// Once the previous query has been executed:
		// LISTENS: /CMISStore/data
		// PUBLISHES: /repository/uuid
		// Main view initialization
		SIDE.pattern.Observer.subscribe('/CMISStore/data', SIDE.component.view.CMISView);
				
		var guardian = new SIDE.security.Authenticator(SIDE.params.alfresco + "/service/api/login");
		ticket = guardian.getTicket("admin", "admin");
	});
		