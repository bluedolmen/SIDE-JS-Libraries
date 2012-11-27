/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.component.view.WebView');

/**
 * @namespace SIDE.component.view.WebView
 */
SIDE.component.view.WebView = function(msg) {
	var url = msg.value.data;

	var formConfig = {
		'name': 		'webview',
	    'title': 		'Web View',
	    'header':		false,
	    'id': 			'webview-' + url.length,	// workspace://SpacesStore/...
	    'autoScroll': 	true,
	    'layout': 		'fit',
	    'height': 		500,
        'border': 		false,
        'frameStyle': 	{'width': 'none'}
	}

	formConfig['defaultSrc'] = url;
    var formPanel = new Ext.ux.ManagedIFrame.Panel(formConfig);

	var config = {
	    'title': 	"Web View 2",
	    'header':	false,
	    'id': 		'webviewpanel-' + url.length,
	    'applyTo':	'workflow-task',
	    'layout': 	'fit',
	    'height': 	500,
	    'items': 	[formPanel]
    }

    var extension = new Ext.Panel(config);
};