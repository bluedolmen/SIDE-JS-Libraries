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

dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojox.data.HtmlStore");
dojo.require("dojox.charting.widget.Legend");
dojo.require("dojox.charting.Chart2D");
dojo.require("dojox.charting.themes.ThreeD")
dojo.require("dojox.charting.action2d.Tooltip");
dojo.require('dojox.charting.action2d.Shake');
dojo.require("dojox.charting.action2d.Highlight");
dojo.require("dojox.charting.action2d.MoveSlice");
dojo.require("dojox.charting.action2d.Magnify");
dojo.require("dojox.charting.themes.Shrooms");
dojo.require("dijit.form.NumberSpinner");

	goog.require("SIDE.Util");
	goog.require("SIDE.pattern.Observer");
	goog.require("SIDE.view.ui.chart.dojo.Base");
	goog.require("SIDE.view.ui.chart.dojo.Bar");
	goog.require("SIDE.view.ui.chart.dojo.Line");
	goog.require("SIDE.view.ui.chart.dojo.Pie");
	goog.require("SIDE.view.ui.FlashPreview");
	goog.require("SIDE.view.ui.PDFPreview");
	goog.require("SIDE.view.ui.Tree");
	goog.require("SIDE.model.view.View");
	goog.require("SIDE.security.Authenticator");

	Ext.onReady(function() {
	    Ext.QuickTips.init();

		var cp = new Ext.state.CookieProvider({
			expires: new Date(new Date().getTime()+(1000*60*60*24*30)) //30 days
		});
		Ext.state.Manager.setProvider(cp);

		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
		});		

		SIDE.pattern.Observer.subscribe("/repository/uuid/folder", function(data) {
			var node = data.value;
			if(node.text=='test') {
				SIDE.pattern.Observer.publish("/documents/list/main");
			};
		});
		
		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
		});
		
		SIDE.pattern.Observer.subscribe("/repository/uuid", function(data) {
			new SIDE.component.view.Previewer(data);
		});

		SIDE.params.authenticate();
	});
		