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
	goog.require("SIDE.security.Authenticator");
	
	var component = {};	
	var tree;
	
	Ext.onReady(function() {
	    Ext.QuickTips.init();
	
		var preview = new SIDE.view.ui.FlashPreview(
			SIDE.params.share + "/proxy/alfresco/api/node",
			SIDE.params.share + "/components/preview/WebPreviewer.swf"
		);
		
		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
			SIDE.pattern.Observer.log.debug("Authenticate/ticket : Data = ", data);
			var ticket = data['value'];
			tree = new SIDE.view.ui.Tree({
//				pUrl: SIDE.params.alfresco + "/service/cmis/p/children?format=json&alf_ticket=" + ticket,
				pUrl: SIDE.params.alfresco + "/service/cmis/p?alf_ticket=" + ticket,
				iUrl: SIDE.params.alfresco + "/service/cmis",
				ticket: ticket
			});
			
			tree.load(); // repository-explorer
/*
			dojo.when(null, function(data){
				tree.load(); // repository-explorer
			})
*/
		});
	
		SIDE.pattern.Observer.subscribe("/repository/uuid", function(data) {
			preview.update(document.getElementById('preview'), data['value']);
		});

		SIDE.params.authenticate();	
	});