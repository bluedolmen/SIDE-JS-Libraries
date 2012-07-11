// create some portlet tools using built in Ext tool ids
var tools = [{
    id:'gear',
    handler: function(){
        Ext.Msg.alert('Message', 'The Settings tool was clicked.');
    }
},{
    id:'close',
    handler: function(e, target, panel){
        panel.ownerCt.remove(panel, true);
    }
}];

var center = {
	columns: [{
        columnWidth:.25,
        style:'padding:2px 0 2px 2px',
        items:[{
            title: 'Grid in a Portlet',
            layout:'fit',
            tools: tools,
            items: new SampleGrid([0, 2, 3])
        },{
            title: 'Another Panel 1',
            tools: tools,
            html: Ext.example.shortBogusMarkup
        }]
    },{
        columnWidth:.49,
        style:'padding:2px 0 2px 2px',
        items:[{
            title: 'Panel 2',
            tools: tools,
            html: Ext.example.shortBogusMarkup
        },{
            title: 'Another Panel 2',
            tools: tools,
            html: Ext.example.shortBogusMarkup
        }]
    },{
        columnWidth:.25,
        style:'padding:2px',
        items:[{
            title: 'Panel 3',
            tools: tools,
            html: Ext.example.shortBogusMarkup
        },{
            title: 'Another Panel 3',
            tools: tools,
            html: Ext.example.shortBogusMarkup
        }]
    }]
}
var mainregions = {
		west: {
	        region:'west',
	        id:'west-panel',
	        title:'West',
	        split:true,
	        width: 200,
	        minSize: 175,
	        maxSize: 400,
	        collapsible: true,
	        margins:'35 0 5 5',
	        cmargins:'35 5 5 5',
	        layout:'accordion',
	        layoutConfig:{
	            animate:true
	        },
	        items: [{
	            html: Ext.example.shortBogusMarkup,
	            title:'Navigation',
	            autoScroll:true,
	            border:false,
	            iconCls:'nav'
	        },{
	            title:'Settings',
	            html: Ext.example.shortBogusMarkup,
	            border:false,
	            autoScroll:true,
	            iconCls:'settings'
	        }]
	    },
		center: {
	        xtype:'portal',
	        region:'center',
	        margins:'35 5 5 0',
	        items:[center.columns]
	        
	        /*
	         * Uncomment this block to test handling of the drop event. You could use this
	         * to save portlet position state for example. The event arg e is the custom 
	         * event defined in Ext.ux.Portal.DropZone.
	         */
//	            ,listeners: {
//	                'drop': function(e){
//	                    Ext.Msg.alert('Portlet Dropped', e.panel.title + '<br />Column: ' + 
//	                        e.columnIndex + '<br />Position: ' + e.position);
//	                }
//	            }
	    }
}
var viewport = {
    layout:'border',
    items:[
           mainregions.west,
           mainregions.center
    ]
}
