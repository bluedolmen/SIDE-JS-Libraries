/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.component.view.Previewer');

/**
 * @namespace SIDE.component.view.Previewer
 */
SIDE.component.view.Previewer = function(record) {
	var n = record.value.data;

	var extract = function(aString) {
		return /\/([^\/]*)$/.exec(aString)[1].substring(0, 15);
	}

	var formConfig = {
		'id': 			'form-' + n.id,	// workspace://SpacesStore/...
		'region': 		'east',
		'title': 		'Metadata',
		'header':		false,
		'name': 		'form',
//	    'autoScroll': 	true,
//	    'layout': 		'fit',
//	    'height': 		500,
//        'border': 		true,
        'width':		'25%'
//        ,'frameStyle': 	{'width': 'none'}
	}
	formConfig['defaultSrc'] = SIDE.params.share + '/page/standaloneeditform?nodeRef=' + n.id;
    var formPanel = new Ext.ux.ManagedIFrame.Panel(formConfig);

	var config = {
	    'title': 		n.prop_cmis_name || 'Fichier PDF',
	    'id': 			'combinedpanel-' + n.id,
	    'closable': 	true,
	    'layout': 		'border',
	    'width': '100%',
//	    'split': true,
	    //'tabPosition': 'bottom',
	    //'bodyStyle': 	'padding:1px',
	    //'autoScroll': true,
	    'height': 		500,
	    'items': [{
//		    	'id': 			'preview-' + n.id,
		    	'region': 		'center',
//		    	'layout':		'fit',
		    	'title': 		'Preview',
		    	'header':		false,
//		    	'border': 		true,
		    	'html': 		'<div id="preview-' + n.id + '"></div>',
		    	'split': 		true
//	            ,'baseCls': 		'x-plain',
//	            'bodyStyle': 	'padding-right:1px',
		    }
//		    ,formPanel
	    ]
	}

    var extension = new Ext.Panel(config);

    Ext.getCmp('tab-panel').add(extension);
	Ext.getCmp('tab-panel').activate(extension);

/*
	var cssLink = document.createElement("link")
	cssLink.href = "/side-demo/components/Document/extJs/style.css";
	cssLink.rel = "stylesheet";
	cssLink.type = "text/css";
	//frames[formConfig.id].document.head.appendChild(cssLink);
*/

	// It's either flash either pdf, except in test mode ;-)
	//config.id = 'previewpanelPDF-' + n.value.id;
    //var extensionPDF = new Ext.ux.ManagedIFrame.Panel(config);

    //var re = /pdf.gif$/;

	var re = new RegExp("pdf");
	if (!re.test(n.prop_cmis_contentStreamMimeType)) {
		SIDE.params.flashPreview.update(document.getElementById('preview-' + n.id), n)
	} else {
		SIDE.params.PDFPreview.update(document.getElementById('preview-' + n.id), n)
	}
};