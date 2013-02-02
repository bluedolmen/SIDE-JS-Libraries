goog.require('SIDE.component.store.CMISStore');
goog.require('SIDE.component.view.AttachmentsList');
goog.require('SIDE.component.view.Chart');
goog.require('SIDE.component.view.MainView');
goog.require('SIDE.component.view.MenuTree');
goog.require('SIDE.component.view.Previewer');

	Ext.onReady(function() {
	    Ext.QuickTips.init();

		var cp = new Ext.state.CookieProvider({
			expires: new Date(new Date().getTime()+(1000*60*60*24*30)) //30 days
		});
		Ext.state.Manager.setProvider(cp);
		initApp();
		
		SIDE.pattern.Observer.subscribe('/authenticate/ticket', function(data) {
			ticket = data.value;
			SIDE.pattern.Observer.publish('/menu/tree', [data]);
		});
		
		/* 
		 * Accordion and tree initialization
		 * PUBLISHES: /repository/uuid
		 * PUBLISHES: /repository/uuid/folder
		 */
		SIDE.pattern.Observer.subscribe('/menu/tree', SIDE.component.view.MenuTree);
/*
		SIDE.pattern.Observer.subscribe('/repository/uuid', function(msg) {
			var value = msg.value;
		});
		SIDE.pattern.Observer.subscribe('/repository/uuid/folder', function(msg) {
			var value = msg.value;
		});
*/
		/* 
		 * Transition to mainview execution
		 * LISTENS: /repository/uuid/folder
		 * PUBLISHES: /CMISStore/data
		 */
		SIDE.pattern.Observer.subscribe('/repository/uuid/folder', function(msg) {
			new SIDE.component.store.CMISStore({value: msg.value.attributes.id}, {channel: '/CMISStore/data'});
		});

		/* 
		 * MainView initialization
		 * LISTENS: /CMISStore/data
		 * PUBLISHES: /document/attachments/list
		 */
		SIDE.pattern.Observer.subscribe('/CMISStore/data', function(msg) {
			new SIDE.component.view.MainView(msg, {channel: '/document/attachments/list'});
		});

		/* 
		 * Transition to AttachmentsList Execution
		 * LISTENS: /document/attachments/list
		 * PUBLISHES: /document/attachments/data
		 */
		SIDE.pattern.Observer.subscribe('/document/attachments/list', function(msg) {
			new SIDE.component.store.CMISStore({value: msg.value.data.id}, {channel: '/document/attachments/data'});
		});

		/* 
		 * AttachmentsList initialization
		 * LISTENS: /document/attachments/data
		 * PUBLISHES: /document/attachment/preview
		 */
		SIDE.pattern.Observer.subscribe('/document/attachments/data', function(msg) {
			new SIDE.component.view.AttachmentsList(msg, {channel: '/document/attachment/preview'});
		});

		/* 
		 * Preview initialization and form initialization
		 * LISTENS: /document/attachments/data
		 * PUBLISHES: /document/attachment/preview
		 */
		SIDE.pattern.Observer.subscribe('/document/attachment/preview', function(msg) {
			new SIDE.component.view.Previewer(msg);
		});

		var guardian = new SIDE.security.Authenticator(alfresco + "/service/api/login");
		ticket = guardian.getTicket("admin", "admin");

	});
		