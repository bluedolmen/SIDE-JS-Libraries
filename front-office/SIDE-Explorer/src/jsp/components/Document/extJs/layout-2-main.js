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
	
	Ext.onReady(function() {
	    Ext.QuickTips.init();

		SIDE.pattern.Observer.subscribe("/authenticate/ticket", function(data) {
			new SIDE.view.ui.Tree(data);
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
			var n = data;

			var extract = function(aString) {
				return /\/([^\/]*)$/.exec(aString)[1].substring(0, 15);
			}
			
			var config = {
			    title: n.value.text || extract(n.value.data.url) || 'Fichier PDF',
			    id: 'preview-' + n.value.id,
			    closable: true,
			    layout: 'fit',
			    bodyStyle: 'padding:25px',
			    autoScroll: true/*,
			    items: [{
			    	columnWidth:.33,
                    baseCls:'x-plain',
                    bodyStyle:'padding:5px 0 5px 5px',
                    items: [{
	                        title: 'A Panel',
							id: 'preview-' + n.value.id
				    	},
				    	{
				    		title: 'coucou2',
							id: 'form-' + n.value.id,
							html: 'Ceci est un test'
					}]
				}]*/
		    };

			if (! /pdf.gif$/.test(n.value.data.icon32)) {
			    var extension = new Ext.ux.ManagedIFrame.Panel(config);
			    
			    Ext.getCmp('tab-panel').add(extension);
				Ext.getCmp('tab-panel').activate(extension);					
				SIDE.params.flashPreview.update(document.getElementById('preview-' + n.value.id), data.value)
			}
			if (/pdf.gif$/.test(n.value.data.icon32)) {
				config.id = 'previewpanelPDF-' + n.value.id;
			    var extensionPDF = new Ext.ux.ManagedIFrame.Panel(config);
			    Ext.getCmp('tab-panel').add(extensionPDF);
				Ext.getCmp('tab-panel').activate(extensionPDF);	
				SIDE.params.PDFPreview.update(document.getElementById(config.id), data.value)
			}
		});

		SIDE.pattern.Observer.subscribe("/repository/uuida", function(data) {
			if (data) {
				SIDE.params.PDFPreview.update(document.getElementById('previewPDF'), data.value)
			}
		});

		SIDE.params.authenticate();
	});
