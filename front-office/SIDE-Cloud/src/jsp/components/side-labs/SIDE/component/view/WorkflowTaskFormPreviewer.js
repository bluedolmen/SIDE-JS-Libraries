/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.component.view.WorkflowTaskFormPreviewer');

/**
 * @namespace SIDE.component.view.WorkflowTaskFormPreviewer
 */
SIDE.component.view.WorkflowTaskFormPreviewer = function(record) {
	var n = record.value.data;

	var extract = function(aString) {
		return /\/([^\/]*)$/.exec(aString)[1].substring(0, 15);
	}

	var formConfig = {
		'name': 		'workflowtaskform',
	    'title': 		'Workflow Task Form',
	    'header':		false,
	    'id': 			'workflowtaskform-' + n.id,	// workspace://SpacesStore/...
	    'autoScroll': 	true,
	    'layout': 		'fit',
	    'height': 		500,
        'border': 		false,
        'frameStyle': 	{'width': 'none'}
	}

	formConfig['defaultSrc'] = SIDE.params.share + '/page/standaloneedittask?taskId=' + n.id;
    var formPanel = new Ext.ux.ManagedIFrame.Panel(formConfig);

	var config = {
	    'title': 	n.prop_cmis_name || 'Fichier PDF',
	    'header':	false,
	    'id': 		'workflowtaskformpanel-' + n.id,
	    'applyTo':	'workflow-task',
	    'layout': 	'fit',
	    'height': 	500,
	    'items': 	[formPanel]
    }

    var extension = new Ext.Panel(config);

//    Ext.getCmp('tab-panel').add(extension);
//	Ext.getCmp('tab-panel').activate(extension);
};