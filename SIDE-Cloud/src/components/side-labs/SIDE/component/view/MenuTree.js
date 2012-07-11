/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.component.view.MenuTree');
goog.require("SIDE.view.ui.Tree");

/**
 * @namespace SIDE.component.view.MenuTree
 * @param {*} data
 * @constructor
 */
SIDE.component.view.MenuTree =  function(data) {
	SIDE.pattern.Observer.log.debug("Authenticate/ticket : Data = ", data);
	var ticket = data.value;

	var forrest = [];
	var instance = this;
	var xhrArgs = {
		'url': SIDE.params.alfresco + '/service/cmis/p/Sites/children?alf_ticket=' + ticket,
		'mimeType': "text/xml",
	   	'success': function (result, request ) {
			var json = xml2json.parser(result.responseText); //Please notice that we use responseXML here which is DOMDocument object
		    var jp = new JPath(json);

		    // @TODO http://bugs.bluexml.net/show_bug.cgi?id=1920
		    // Use of dojo.jsonPath.query or jsonselect
			var sites = jp.query('//cmis_propertystring[queryname = "cmis:name"]');
			// The following doesn't seem to work. Maybe a bug related to http://bugs.dojotoolkit.org/ticket/13254
			// But, beside this, it seems queries return unconsistent results
			//var sites = dojox.jsonPath.query('//cmis_propertystring[queryname = "cmis:name"]');
			var title = null;
			var id = null;

		    for (var i = 0; i < sites.length; i++){
		    	forrest[i] = {
		    		'id': 'repository-explorer-' + i,
		    		'targetId': 'repository-explorer-instance' + i,
		    		'title': sites[i]['cmis_value'][0].toUpperCase() + sites[i]['cmis_value'].substring(1,sites[i]['cmis_value'].length).toLowerCase(),
		    		'iconCls': 'site-icon site-icon-' + sites[i]['cmis_value'],
		    		'html': '<div id="repository-explorer-container-' + i +'"><div id="repository-explorer-instance' + i + '"></div></div>',
		    		'listeners': {
		    			'expand': {
		    				'fn': function(panel) {
		    					SIDE.component.view.MenuTree.initializeTab(panel, ticket);
		    				}
		    			}
		    		}
		    	}
/*
		    	if (i == 0) {
		    		forrest[i]['expand'] = true ;
		    	}
*/
			    var extension = new Ext.Panel(forrest[i]);
			    Ext.getCmp('forrest-panel').add(extension);
			}

		    Ext.getCmp('forrest-panel').doLayout();
		},
	   	'failure': function (params) {
   			SIDE.view.ui.Tree.log.error("Load Tree: failure");
	   	}
	};

	SIDE.Util.request(xhrArgs);
}

/**
 * @param {*} panel
 * @param {*} _ticket is also available as a global value
 * @static
 */
SIDE.component.view.MenuTree.initializeTab = function(panel, _ticket) {
	if (initializedTabs[panel.id] !== true) {
    	var prefix = SIDE.params.alfresco + '/service/cmis/p/Sites';
		var tree = new SIDE.view.ui.Tree({
			pUrl: 			prefix + '/' + panel.title + '/documentLibrary?alf_ticket=' + _ticket,
			iUrl: 			SIDE.params.alfresco + "/service/cmis",
			ticket: 		ticket,
			height: 		'200px',
			id: 			panel['targetId'],
			rootVisible:	false,
			useArrows: 		true,
			rootText: 		panel.title,
			channel: 	'/repository/uuid'
		});
		tree.load();
		initializedTabs[panel.id] = true;
	}
}