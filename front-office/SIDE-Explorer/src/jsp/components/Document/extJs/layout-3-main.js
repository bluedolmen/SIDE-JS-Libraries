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

	goog.require("SIDE.Util");
	goog.require("SIDE.pattern.Observer");
	goog.require("SIDE.view.ui.FlashPreview");
	goog.require("SIDE.view.ui.PDFPreview");
	goog.require("SIDE.view.ui.Tree");
	goog.require("SIDE.model.view.View");
	goog.require("SIDE.security.Authenticator");

	goog.require("SIDE.component.view.MainView");
	goog.require("SIDE.component.view.Previewer");
	goog.require("SIDE.component.view.Tree");

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
			new SIDE.component.view.Previewer(data);
		});

		SIDE.params.authenticate();
	});
