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

		var cp = new Ext.state.CookieProvider({
			expires: new Date(new Date().getTime()+(1000*60*60*24*30)) //30 days
		});
		Ext.state.Manager.setProvider(cp);

		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
			var xhrArgs = {
			  'url': SIDE.params.mainSIDEView
			  			+ '?alf_ticket=' + data.value,
			  'content': {},
			  'callbackParamName': 'alf_callback'
			};

			var jsonp = SIDE.Util.getJsonP(xhrArgs).then(function (data) {
				SIDE.model.view.Metadata.log.debug("Metadata loading: success");
			  	SIDE.pattern.Observer.publish(this.channel, [{"value": data}]);
				return data;
			});

			dojo.when(jsonp, function(data){
				new SIDE.component.view.MainView(null, {
					gridId: 'grid2',
					data: data,
					channel: '/repository/uuid',
					configuration: view,
					height: view['height'],
					width: view['width']
//					modelPrefix: 'Kinedoc'
				});
			});

			/*
			new SIDE.component.view.MainView(null, {
				gridId: 'grid2',
				url: SIDE.Util.getParam("viewWebService"),
				ticket: data.value,
				channel: '/repository/uuid',
				configuration: view
			});
			*/
		});

		SIDE.pattern.Observer.subscribe("/repository/uuid", function(data) {
			SIDE.params.flashPreview.update(document.getElementById('preview_flash'), data.value)
		});
		SIDE.pattern.Observer.subscribe("/repository/uuid", function(data) {
			SIDE.params.PDFPreview.update(document.getElementById('preview_pdf'), data.value)
		});
    	SIDE.pattern.Observer.subscribe("/side-win/size", function(data) {
    		SIDE.pattern.Observer.publish("/repository/uuid", [{"value": data.value}]);
    	});

		SIDE.params.authenticate();
	})
