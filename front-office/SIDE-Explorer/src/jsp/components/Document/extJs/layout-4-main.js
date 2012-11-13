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

	/*
	function gridRefresh () {
	//alert('coucou');
	   aView.sg.getStore().load();
	   aView.show();
	}*/

	Ext.onReady(function() {
	    Ext.QuickTips.init();

		var cp = new Ext.state.CookieProvider({
			expires: new Date(new Date().getTime()+(1000*60*60*24*30)) //30 days
		});
		Ext.state.Manager.setProvider(cp);

		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
			var tree = new SIDE.component.view.Tree(data);
		});
		
		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
			new SIDE.component.view.MainView(null, {
				height: '300',
				width: '100%',
				enableGrouping: false,
				enablePaging: true
			});
		});		

		SIDE.pattern.Observer.subscribe("/repository/uuid", function(data) {
			new SIDE.component.view.Previewer(data);
		});

		SIDE.params.authenticate();
	});
		