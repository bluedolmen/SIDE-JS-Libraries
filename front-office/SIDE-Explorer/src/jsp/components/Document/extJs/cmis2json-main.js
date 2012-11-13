/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */

	goog.require("SIDE.data.CMISStore");

	var alfresco = 'http://localhost:8087/alfresco';
	var ticket;
	
	Ext.onReady(function() {
	    Ext.QuickTips.init();
		var cp = new Ext.state.CookieProvider({
			expires: new Date(new Date().getTime()+(1000*60*60*24*30)) //30 days
		});
		Ext.state.Manager.setProvider(cp);
		
		SIDE.pattern.Observer.subscribe('/CMISStore/data', SIDE.component.view.CMISView);
		SIDE.pattern.Observer.subscribe('/authenticate/ticket', SIDE.component.store.CMISStore);
			
		var guardian = new SIDE.security.Authenticator(SIDE.params.alfresco + "/service/api/login");
		ticket = guardian.getTicket("admin", "admin");
	});