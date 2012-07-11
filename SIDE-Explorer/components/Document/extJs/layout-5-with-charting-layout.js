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
	    'id': 			'tab-panel',
	    'border': 		false,
	    'items': 		[start]
	});
    
	var regions = {
	 	north: {
			'region':		'north'
			//,id': '		component'
			//,html': 		'<div id="component"></div><div id="preview"></div>'
			,'height':		100
			,'border':		false
			,'bodyStyle':	'background-color:#f8f8f8;'
			,'title':		'North'
			,'collapsible':	true
			,'collapseMode':'mini'
			,'split': 		true
		},
		west: {
			'region':		'west'
//			,'id': 			'repository-explorer'
			,'width': 		'45%'
			,'border':		false
			,'autoScroll':	true
			,'title':		'West'
			,'bodyStyle':	'padding:5px;font-size:11px;background-color:#f4f4f4;'
			//,'html': 		'<div id="grid"></div><div id="grid-chart-target"></div>'
			,'contentEl': 	'west'
			//,'html': 		'<div id="grid"></div><div id="grid-chart-target"></div><div id="repository-explorer"></div>'
			,'collapsible':	true
			,'split':		true
			,'collapseMode':'mini'
		},
		south: {
			 'region':		'south'
			,'height':		100
			,'html':		'South'
			,'border':		false
			,'title':		'South'
			,'collapsible':	true
			,'collapseMode':'mini'
			,'split': 		true 
		},
		east: {
			 'region':		'east'
			//,'id': 		'preview'
			,'width':		200
			//,'html':		'East'
			,'border':		true
			,'bodyStyle':	'background-color:#f4f4f4;'
			,'title':		'East'
			,'collapsible':	true
			,'collapseMode':'mini'
			,'split': 		true
		},
		center: {
			'region':		'center'
//			,'html': 		'<div id="grid"></div><div id="grid-attachments"></div><div id="start-div"><div id="preview"></div><div id="previewPDF"></div></div>'
			,'border':		false
			,'bodyStyle':	'background-color:#f0f0f0;'
			,'title':		'Center'
			,'split':		true
			,'items': [{
	                //'title': 'A Panel',
    	            'html': '<div id="grid"></div><div id="grid-attachments"></div>'
	            },
	            tabs
	        ]
		}
	}
		
    var viewport = new Ext.Viewport({
         'id':		'viewport'
        ,'layout':	'border'
		,'border':	false
		,'items':	[
			//regions.north,
			regions.west
			//,regions.south
			//,regions.east
			,regions.center
		]
    });
});
 