 
//Ext.BLANK_IMAGE_URL = './ext/resources/images/default/s.gif';
 
var initApp;

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
		'title': 'Content',
	    'activeTab': 	0,
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

	var regions = {
	 	north: {
			'region':		'north'
			//,'id': '		component'
			,'html': 		'<img border="0" src="share-header.png">'
			,'height':		115
			,'border':		false
			,'bodyStyle':	'background-color:#f8f8f8;'
			,'title':		'North'
			,'collapsible':	true
			,'collapseMode':'mini'
			,'split': 		true
		},
		west: {
			'region':		'west'
			,'id': 			'forrest-panels'
			,'width': 		'20%'
			,'border':		false
			,'autoScroll':	true
			,'title':		'West'
			,'bodyStyle':	'padding:5px;font-size:11px;background-color:#f4f4f4;'
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
			'xtype': 'portal',
			'region':		'center'
			//,'html': 		'<div id="grid"></div><div id="grid-attachments"></div><div id="start-div"><div id="preview"></div><div id="previewPDF"></div></div>'
			,'border':		false
			,'bodyStyle':	'background-color:#f0f0f0;'
			,'title':		'Center'
			,'split':		true
			,'autoscroll': 	true
			,'items': [{
		                'layout': 'column'
		                ,'width': '100%'
/*		                ,'split': true
		                ,'border': false
						,'collapsible':	true
						,'collapseMode':'mini'
*/
		                ,items: [{
		                		'layout': 'fit'
		                		,'region': 'center'
								,'title': 'Mails and Emails'
			    	            ,'html': '<div id="grid"></div>'
			    	            ,'split': true
			    	            ,'width': '80%'
//			    	            ,'columnWidth': '80%'
	    	            	}
	    	            	,{
		                		'layout': 'fit'
		                		,'region': 'east'
	    	            		,'title': 'Attachments'
			    	            ,'html': '<div id="grid-attachments"></div>'
			    	            ,'width': '20%'
//			    	            ,'columnWidth': '20%'
    	            	}]
	            },
	            tabs
	        ]
		}
	};
		
	initApp = function() {
	    new Ext.Viewport({
	         'id':		'viewport'
//	        ,'contentEl': 'mainregions'
	        ,'layout':	'border'
			,'border':	false
			,'defaults': {
	  			border: false
	  		}
			,'items':	[
				regions.north,
				regions.west
				//,regions.south
				//,regions.east
				,regions.center
			]
	    });
	}
});
 