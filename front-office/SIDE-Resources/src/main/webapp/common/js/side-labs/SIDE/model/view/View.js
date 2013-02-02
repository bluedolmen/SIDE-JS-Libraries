/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.model.view.View");

goog.require("SIDE.Util");
goog.require("SIDE.view.ui.SimpleGrid");
goog.require("SIDE.model.view.Metadata");

/**
 * @param {string} ticket
 * @param {string} url
 * @param {*} view
 * @param {string} id
 * @constructor
 */
SIDE.model.view.View = function(ticket, url, view, id, data) {
	this.ticket = ticket;
	this.url = url;
	this.view = view;
	this.id = id;
	this.data = data;
	
	// view.url is for the widget. It requires the proxy
	this.view['url'] = SIDE.Util.addProxyService(url + "?alf_ticket=" + ticket, "text/json");
	
	// directUrl is for the ViewMetadata which uses a SIDE requester which adds automatically
	// a proxy. It doesn't need it twice otherwise error
	if (url != null && url.indexOf('?') != -1) {
		this.directUrl = url + "&alf_ticket=" + ticket;
	} else {
		this.directUrl = url + "?alf_ticket=" + ticket;
	}

	var metadata;
	if (this.data == null) {	
		metadata = new SIDE.model.view.Metadata(this.directUrl);
	} else {
		metadata = new SIDE.model.view.Metadata({
			data: this.data
		});
		this.view['data'] = this.data;
	}
	this.view['fields'] = metadata.getFields();
	
	if (this.view['columns'] == null || this.view['columns'] == "") {
		this.view['columns'] = metadata.getColumns();
	}
	
	/*
	var checkColumn = new Ext.grid.CheckColumn({
       'header': 'Id',
       'dataIndex': 'id',
       'width': 20
    });

    this.view['columns'].unshift(checkColumn);
    this.view['plugins'].push(checkColumn);
    */
	
	this.view['reader'] = new Ext.data.JsonReader({
	    'root': 'records',
	    'fields': this.view['fields']
	});
	
	this.sg = new SIDE.view.ui.SimpleGrid(view);
};

/**
 * @param {string=} id 
 * @returns
 */
SIDE.model.view.View.prototype.show = function(id) {
	if (id != null && id != "") {
		this.sg.show(id);
	} else {
		this.sg.show(this.id);
	}
};

/**
 * @type {*}
 * @static
 */
SIDE.model.view.View.log = new log4javascript.getLogger("SIDE.model.view.View");
