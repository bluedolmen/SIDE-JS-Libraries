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

Ext.onReady(function(){

	function createPoint(lat,long) {
		var reg=new RegExp("(,)", "g");
		return new GLatLng(lat.replace(reg,"."), long.replace(reg,"."));
	}

	function load() {
	    var mapwin = new Ext.Panel({
	        title: 'GMap Window',
	        width: '100%',
	        height:600,
	        items: {
				xtype: 'gmappanel',
	            zoomLevel: 5,
	            gmapType: 'map',
	            id:'mygmap',
	            mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
	            mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
	            setCenter: {
	                geoCodeAddr: 'Kammerzell House, Strasbourg, France',
	                marker: {title: 'Paris',hide:true}
	            }
	        }
	    });
	    
	    mapwin.render('grid-example-gmap');
	
	    var defaultIcon = new GIcon(G_DEFAULT_ICON);
	    
	    var pictureIcon = new GIcon(G_DEFAULT_ICON);
		pictureIcon.image = "/library/css/images/picture.png";
		pictureIcon.iconSize = new GSize(32,32);
	
	    var videoIcon = new GIcon(G_DEFAULT_ICON);
		videoIcon.image = "/library/css/images/video.png";
		videoIcon.iconSize = new GSize(32,32);
	
	    var textIcon = new GIcon(G_DEFAULT_ICON);
		textIcon.image = "/library/css/images/text.png";
		textIcon.iconSize = new GSize(32,32);	
	    
		Ext.Ajax.request({
	    	url:getDataSource('json',_TICKET),
	    	success: function ( result, request ) {
	    		var jsonData = Ext.util.JSON.decode(result.responseText);
	    		for (var i = 0; i < jsonData.records.length; i++) {
	    			var doc = jsonData.records[i];
	    			var icon = defaultIcon;
	    			if (doc._typeOfDocument == 'Picture')
	    				icon = pictureIcon;
	    			else if (doc._typeOfDocument == 'Video')
	    				icon = videoIcon;
	    			else if (doc._typeOfDocument == 'Textual document')
	    				icon = textIcon;
	    			Ext.getCmp('mygmap').addMarker(createPoint(doc._latitude, doc._longitude),{title:doc._name, icon:icon});
	    		}
	    	}
	    });
	}
	    
    loadWithAuthentication(load);
 });