/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.component.view.MainView');

goog.require("SIDE.model.view.View");

/**
 * Once the previous query has been executed:
 * LISTENS: /MainStore/data
 * PUBLISHES: /MainStore/data
 * Main view initialization
 *
 * @namespace SIDE.component.view.MainView
 * @param {*} msg contains the records to display
 * @param {*} config
 * @returns
 * @constructor
 */
SIDE.component.view.MainView = function(msg, config) {
	this.channel = config.channel || '/repository/uuid';
	this.ticket = config.ticket || ticket;
	this.modelPrefix = config.modelPrefix || '';
	this.url = null;
	this.data = null;

	var gridId = 'grid-main';

	var view = view || {};

	this.configuration = owl.deepCopy(view); // view configuration
	this.configuration.id = gridId;
	this.configuration['stateId'] = this.configuration.id;
	this.configuration['height'] = 200;
	this.configuration['width'] =  config.width || '100%';
	this.configuration['enableGrouping'] = config.enableGrouping !== true ? false : true;

	// By configuring columns explicitly, we can directly indicate the required info
	/*
	*/
/*	this.configuration['columns'] = [
	  {"id":"prop_cmis_name","sortable":true,"dataIndex":"prop_cmis_name","groupable":false,"header":"Mails"}
	];
*/
	/*	this.configuration['enablePaging'] = false;*/
	/*
	*/
	views[gridId] = this.configuration;

	try {
//		this.data = msg.data;
		if (msg) {
			this.data = msg.data;
		} else {
			this.data = config.data;
		}
	} catch (e) {
		this.url = config.url;
	}

//	var gridId = config.gridId || 'grid-toto';
	// We replace the already existing gridId part
	if (dojo.byId(gridId) != null) {
		var node = dojo.byId(gridId);
		while (node.hasChildNodes()) {
			node.removeChild(node.lastChild);
		}
	}

	var aview = new SIDE.model.view.View(
				this.ticket,
				this.url,
				//views[gridId],
				this.configuration,
				gridId,
				this.data,
				this.modelPrefix
			);

//	var z = Ext.getCmp('toto');
//	z.doLayout();

	aview.show();
	var instance = this;
	aview.sg.getGrid().on('rowmousedown', function(event, rowIndex) {
		var record = this['store'].getAt(rowIndex);
		SIDE.pattern.Observer.publish(instance.channel, [{'value': record}]);
	});

	return aview;
}
