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
		});
		
		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
		});		

		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
			var ticket = data.value;
			var url = SIDE.Util.getParam("viewWebService");
			var attachmentsView = new SIDE.model.view.View(ticket, url, view, 'grid-attachment');
			view['height'] = "300";
			view['width'] = "10%";
			view['enableCharting'] = false;
			view['enableGrouping'] = false;
			view['enablePaging'] = true;
			
			attachmentsView.show();
			attachmentsView.sg.getGrid().on('rowmousedown', function(a, rowIndex, c, d) {
				var record = this['store'].getAt(rowIndex);
	    		SIDE.pattern.Observer.publish("/repository/uuid", [{'value': record}]);
			});

		});		

		SIDE.pattern.Observer.subscribe('/render/charting/pie/' + view.id, function(msg) {
			var series = msg.data
			var dataStore = new dojo.data.ItemFileReadStore({
				data: { items: msg.data }
		    });

		    var c1 = new SIDE.view.ui.chart.dojo.Pie({
		    			title: '',
		    			targetId: 'grid-chart-target',
		    			store: dataStore,
		    			marginTop: 100,
		    			width: 400,
		    			height: 200,
		    			padding: 40                			
		    });
		    c1.render();
		});

		SIDE.pattern.Observer.subscribe('/render/charting/bar/' + view.id, function(msg) {
			var series = msg.data
			var dataStore = new dojo.data.ItemFileReadStore({
				data: { items: msg.data }
		    });

		    var c2 = new SIDE.view.ui.chart.dojo.Bar({
		    			title: '',
		    			targetId: 'grid-chart-target',
		    			store: dataStore,
		    			marginTop: 100,
		    			width: 400,
		    			height: 200,
		    			padding: 40                			
		    });
		    c2.render();
		});

		SIDE.pattern.Observer.subscribe('/render/charting/line/' + view.id, function(msg) {
			var series = msg.data
			var dataStore = new dojo.data.ItemFileReadStore({
				data: { items: msg.data }
		    });

		    var c3 = new SIDE.view.ui.chart.dojo.Line({
		    			title: '',
		    			targetId: 'grid-chart-target',
		    			store: dataStore,
		    			marginTop: 100,
		    			width: 400,
		    			height: 200,
		    			padding: 40                			
		    });
		    c3.render();
		});
		
		SIDE.pattern.Observer.subscribe("/repository/uuid", function(data) {
			new SIDE.component.view.Previewer(data);
		});

		SIDE.params.authenticate();
	});
		