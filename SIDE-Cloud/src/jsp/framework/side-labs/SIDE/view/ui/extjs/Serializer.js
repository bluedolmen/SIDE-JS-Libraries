/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.extjs.Serializer");

/**
 * @namespace
 * @constructor
 */
SIDE.view.ui.extjs.Serializer = function() {
	this.config = null;
};

/**
 * //@ param {Ext.grid.ColumnModel} colModelConfig
 * @param {*} colModelConfig
 * @returns {string}
 * @static
 */   
SIDE.view.ui.extjs.Serializer.serializeColModel = function(colModelConfig) {
	var newCMC = [];
	for(var i = 0; i < colModelConfig.length; i++) {
		newCMC[i] = {
			'id': colModelConfig[i].id,
			'sortable': colModelConfig[i]['sortable'],
			'width': colModelConfig[i]['width'],
			'dataIndex': colModelConfig[i]['dataIndex'],
			'groupable': colModelConfig[i]['groupable'],
			'header': colModelConfig[i]['header'],
			'hidden': colModelConfig[i]['hidden']
		};
	}
	return JSON.stringify(newCMC);
}

/**
 * //@ param {Ext.grid.RowSelectionModel} selectionModel
 * //@ param {Ext.grid.ColumnModel} colModel
 * //@ returns {Array}
 * @param {*} selectionModel
 * @param {*} colModel
 * @returns {*}
 * @static
 */   
SIDE.view.ui.extjs.Serializer.serializeDisplayedContent = function(selectionModel, colModel) {
	
	selectionModel.selectAll();
	var sm = selectionModel.getSelections();
	var cmc = colModel['config'];

	var records = [];

	/*
	// Only needed if we want to build an array with headers
	var items = [];    
	k = 0;
	for(var j = 0; j < cmc.length; j++) {
		var attribute = cmc[j];
		var attributeName = attribute['dataIndex'];
        if (! attribute['hidden']) {
        	items[k] = attributeName; // We could shorten it
        	k++;
        }
    }
    records.push(items);
	*/
	
	for (var i = 0; i < sm.length; i++) {
		var items = {};
		var record = sm[i];
		var k = 1;
		for(var j = 0; j < cmc.length; j++) {
			// If the attribute is not hidden, we then store the value
			var attribute = cmc[j];
			var attributeName = attribute['dataIndex'];
	        if (! attribute['hidden']) {
	        	items[attributeName] = record['data'][attributeName];
	        	// k++; // Only interesting if I wanted an array
	        }
        }
        records.push(items);
    }
    
    return records;
}

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.extjs.Serializer.log = new log4javascript.getLogger("SIDE.view.ui.extjs.Serializer");