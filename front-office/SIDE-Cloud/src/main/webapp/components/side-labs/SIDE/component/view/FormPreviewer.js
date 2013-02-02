/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.component.view.FormPreviewer');

/**
 * @namespace SIDE.component.view.FormPreviewer
 */
SIDE.component.view.FormPreviewer = function(record) {
	var n = record.value.data;

	var extract = function(aString) {
		return /\/([^\/]*)$/.exec(aString)[1].substring(0, 15);
	}

	var formConfig = {
		'name': 		'form',
	    'title': 		'Metadata',
	    'header':		false,
	    'id': 			'form-' + n.id,	// workspace://SpacesStore/...
	    'autoScroll': 	true,
	    'layout': 		'fit',
	    'height': 		500,
        'border': 		false,
        'frameStyle': 	{'width': 'none'}
	}
	formConfig['defaultSrc'] = SIDE.params.share + '/page/standaloneeditform?nodeRef=' + n.id;
    var formPanel = new Ext.ux.ManagedIFrame.Panel(formConfig);

	var config = {
	    'title': 		n.prop_cmis_name || 'Fichier PDF',
	    'id': 			'formpanel-' + n.id,
	    'closable': 	true,
	    'layout': 		'column',
	    //'tabPosition': 'bottom',
	    //'bodyStyle': 	'padding:5px',
	    //'autoScroll': true,
	    'height': 		500,
	    'items': [{
	    	'columnWidth': .99,
            'baseCls': 		'x-plain',
            'bodyStyle': 	'padding:5px 0 5px 5px',
            'items': [{
		    	'columnWidth': 	.99,
	            'baseCls': 		'x-plain',
	            'bodyStyle': 	'padding:5px 0 5px 5px',
		    	'items': 		[formPanel]
			}]
	    }]
	}

    var extension = new Ext.Panel(config);

    Ext.getCmp('tab-panel').add(extension);
	Ext.getCmp('tab-panel').activate(extension);
};