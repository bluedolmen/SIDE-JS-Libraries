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


//Ext.BLANK_IMAGE_URL = './ext/resources/images/default/s.gif';

Ext.onReady(function() {

    Ext.QuickTips.init();

	var start = {
	    'id': 		'start-panel',
	    'title': 	'Start Page',
	    'layout': 	'fit',
	    //'bodyStyle': 'padding:25px',
	    //'height': '100%',
	    //'contentEl': 'start-div'  // pull existing content from the page
		'html': 	'<div id="start-div"></div>'
	};

	var tabs = new Ext.TabPanel({
	    'activeTab': 	0,
	    'tabPosition': 'bottom',
	    'id': 			'tab-panel',
	    'border': 		true,
	    'items': 		[start]
	});

	var forrestPanel = new Ext.Panel({
		'layout': 'accordion',
		'layoutConfig': {
			'animate': true
		},
		'id': 'forrest-panel',
		'items': []
	})

	var subregion = {
		main: {
        	'layout': 'border'
        	,'height': 750
//        	,'autoHeight': true
        	,'split': true
        	,'width': 600
        	,items: [{
        		'region': 'north'
//            		,'title': 'Mails and Emails'
        		,'title': 'Procurement Requisitions'
    			,'header': true
        		,'height': 200
    			,'layout': 'fit'
	            ,'html': '<div id="grid-main"></div>'
	            ,'split': true
//	            ,'width': '80%'
        	},{
        		'region': 'center'
        		,'layout': 'fit'
        		,'title': 'Attachments'
    			,'header': true
	            ,'html': '<div id="grid-attachments"></div>'
//	            ,'width': '20%'
	            ,'height': 160
            	,'split': true
    		},{
				'region': 'south'
        		,'title': 'Processus'
    			,'header': true
            	,'width': '100%'
            	,'split': true
            	,'html': '<div id="workflow-task"></div>'
            	,'height': 300
            }]
		}
	}

	var regions = {
	 	north: {
			'region':		'north'
			//,'id': '		component'
			,'html': 		'<div id="north-header">'
							+ '<div id="side-app-requisition">Procurement Requisition</div>'
							+ '<div id="side-app-leave">Leave Request</div>'
							+ '</div>'
			,'height':		30
			,'border':		false
			,'bodyStyle':	'background-color:#f8f8f8;'
			,'title':		'North'
			,'header':		false
			,'collapsible':	true
			,'collapseMode':'mini'
//			,'collapsed':   true
			,'split': 		true
		},
		west: {
			'region':		'west'
			,'id': 			'forrest-panels'
			,'width': 		'15%'
			,'border':		false
			,'autoScroll':	true
			,'title':		'Menu'
//			,'bodyStyle':	'padding:5px;font-size:11px;background-color:#f4f4f4;'
			,'html': 		'<div id="forrest-container"></div>'
			//,'contentEl': 	'west'
			//,'html': 		'<div id="grid"></div><div id="grid-chart-target"></div><div id="repository-explorer"></div>'
			,'collapsible':	true
			,'split':		true
			,'collapseMode':'mini'
			,'layout': 'fit'
			,items: [
			         forrestPanel
	    	]
		},
		south: {
			'region':		'south'
			,'title':		'South'
			,'header':		false
			,'height':		20
			,'html':		'<div>Status bar</div>'
			,'border':		false
			,'collapsible':	true
			,'collapseMode':'mini'
			,'split': 		true
		},
		center: {
			'region':		'center'
			,'border':		false
			,'bodyStyle':	'background-color:#f0f0f0;'
			//,'title':		'Center'
			//,'header':		true
			,'split':		true
			//,'autoscroll': 	true
			,'items': [subregion.main]
		},
		east: {
			'region': 'east'
    		,'layout': 'fit'
    		,'title': 'Fichiers'
			,'header': false
            ,'width': '50%'
        	,'split': true
        	,'collapsible':	true
        	,'collapseMode':'mini'
        	,items: [tabs]
		},
	}

    var viewport = new Ext.Viewport({
		'id':		'viewport'
        ,'layout':	'border'
		,'border':	false
		,'defaults': {
			border: false
		}
    	,'items':	[
			regions.north
			,regions.west
			,regions.center
			,regions.east
			,regions.south
		]
    });
});
