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
	    Ext.QuickTips.init();

		var cp = new Ext.state.CookieProvider({
			expires: new Date(new Date().getTime()+(1000*60*60*24*30)) //30 days
		});
		Ext.state.Manager.setProvider(cp);

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
			var n = new SIDE.component.view.MainView(msg, {
				configuration: view,
				channel: '/document/attachments/list'});
		});

		/*
		 * Transition to AttachmentsList Execution
		 * LISTENS: /document/attachments/list
		 * PUBLISHES: /document/attachments/data
		 */
		SIDE.pattern.Observer.subscribe('/document/attachments/list', function(msg) {
			new SIDE.component.store.CMISStore({value: msg.value.data.id}, {channel: '/document/attachments/data'});

			// http://localhost:8080/alfresco/service/api/node/workspace/SpacesStore/6005feec-d292-407f-bf74-4ba989d68089/workflow-instances
			// We get the task id corresponding to the document or folder to display the workflow form
			var xhrArgs = {
				'url': SIDE.params.alfresco + '/service/org/sidelabs/is/requisition/workflow/getTaskId.json?'
						+ 'nodeRef=' + msg.value.data.id + '&alf_ticket=' + ticket,
				'mimeType': "text/json",
			   	'success': function (result, request ) {
					SIDE.pattern.Observer.publish('/document/workflow/task', [{
						'value': { 'data': { 'id': result.data }}
					}]);
				},
			   	'failure': function (params) {
			   		alert('Failure');
			   	}
			};

			SIDE.Util.get(xhrArgs);
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
		 * Transition to WorkflowForm execution
		 * LISTENS: /document/workflow/list
		 * PUBLISHES: /document/workflow/data
		 */
		//SIDE.pattern.Observer.subscribe('/document/workflow/data', function(msg) {
		//	new SIDE.component.view.AttachmentsList(msg, {channel: '/document/workflow/task'});
		//});

		/*
		 * WorkflowForm initialization
		 * LISTENS: /document/attachments/data
		 * PUBLISHES: /document/workflow/follow
		 */
		SIDE.pattern.Observer.subscribe('/document/workflow/task', function(msg) {
			new SIDE.component.view.WorkflowTaskFormPreviewer(msg, {channel: '/document/workflow/follow'});
		});

		/*
		 * WorkflowForm initialization
		 * LISTENS: /document/workflow/result
		 * PUBLISHES:
		 */
		SIDE.pattern.Observer.subscribe('/document/workflow/result', function(msg) {
			new SIDE.component.view.WebView(msg);
		});

		/*
		 * Preview initialization and form initialization
		 * LISTENS: /document/attachments/data
		 * PUBLISHES: /document/attachment/preview
		 */
		SIDE.pattern.Observer.subscribe('/document/attachment/preview', function(msg) {
			new SIDE.component.view.Previewer(msg);
		});

		SIDE.params.authenticate();
	});
