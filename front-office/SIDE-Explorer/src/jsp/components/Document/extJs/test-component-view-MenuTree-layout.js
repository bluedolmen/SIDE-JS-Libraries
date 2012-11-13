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

	var forrestPanel = new Ext.Panel({
		'layout': 'accordion',
		'layoutConfig': {
			'animate': true
		},
		'id': 'forrest-panel',
		'items': []
	})

	var regions = {
		west: {
			'region':		'west'
			,'id': 			'forrest-panels'
			,'width': 		'20%'
			,'border':		false
			,'autoScroll':	true
			,'title':		'West'
			,'bodyStyle':	'padding:5px;font-size:11px;background-color:#f4f4f4;'
			,'html': 		'<div id="forrest-container"></div>'
			,'collapsible':	true
			,'split':		true
			,'collapseMode':'mini'
			,'layout': 'fit'
			,items: [
		    	forrestPanel
	    	]
		}
	}
		
    var viewport = new Ext.Viewport({
         'id':		'viewport'
        ,'layout':	'fit'
		,'border':	false
		,'items':	[
			regions.west
		]
    });
});
 