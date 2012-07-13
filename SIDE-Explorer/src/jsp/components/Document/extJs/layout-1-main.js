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

		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
			SIDE.pattern.Observer.log.debug("Authenticate/ticket : Data = ", data);
			tree = new SIDE.component.view.Tree(data);
		});
		
		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
			new SIDE.component.view.MainView(null, {
				url: SIDE.Util.getParam("viewWebService"),
				ticket: data.value,
				channel: '/repository/uuid'
			});
		});
		
		SIDE.pattern.Observer.subscribe("/repository/uuid", function(data) {
			SIDE.params.flashPreview.update(document.getElementById('preview'), data.value)
		});

		SIDE.pattern.Observer.subscribe("/repository/uuid", function(data) {
			SIDE.params.PDFPreview.update(document.getElementById('previewPDF'), data.value)
		});

    	SIDE.pattern.Observer.subscribe("/side-win/size", function(data) {
    		SIDE.pattern.Observer.publish("/repository/uuid", [{"value": data.value}]);
    	});

    	SIDE.params.authenticate();
	});
