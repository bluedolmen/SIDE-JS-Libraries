/**
 * Copyright (C) 2005-2008 BlueXML Software Limited.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

 */
function SIDE_ViewMetadata(url) {
	this.debug("SIDE_ViewMetadata()");
	
	if (url) {
		this.url = url + "?limit=1";
	} else {
		// Throws an exception ?
	}
	
	this.content = {};
	/*
	this.fields = [];
	this.columns = [];
	*/
	
}

SIDE_ViewMetadata.prototype.debug = function(message) {
	if (SIDE_ViewMetadata.log.isDebugEnabled()) {
		SIDE_ViewMetadata.log.debug(message);
//		SIDE_ViewMetadata.log.debug("=> Url : ", this.url);
	}
}

SIDE_ViewMetadata.log = new log4javascript.getLogger("SIDE_ViewMetadata");

SIDE_ViewMetadata.prototype.getContent = function() {
	if (this.content == null) {
		SIDE_ViewMetadata.log.debug("Content has not yet been loaded. Starts loading...");
		this.setContent();
	}
	return this.content;
}

SIDE_ViewMetadata.prototype.setContent = function() {
	var xhrArgs = {
		url: this.url,
		mimeType: "text/json",
	   	success: function (data) {
   			SIDE_ViewMetadata.log.debug("Metadata loading: success");
   			this.content = data;
 		  	Observer.publish("/view/metadata", [{"value": data}]);
	   	},
	   	failure: function (params) {
   			SIDE_ViewMetadata.log.debug("Metadata loading: failure");
	   	}
	};
	SIDE_Util.get(xhrArgs);
}

SIDE_ViewMetadata.prototype.getFields = function() {
	var fields = [];
	fields[0] = {name: 'id'};
	var i = 1;
	for (key in this.getContent().records[0]) {
		fields[i] = {name: key, type: 'String'};
		i++
	}
	
	return fields;
}

/* 
	@TODO: automatically detect attribute type instead of using 
	TextField systematically
*/
SIDE_ViewMetadata.prototype.getColumns = function() {
	var columns = [];
	var fields = this.getFields();
	
	columns[0] = {
		id: 'id',
		header: 'Identifier',
		width: 160,
		sortable: true,
		dataIndex: 'id',
		hidden: true,
		editor: new Ext.form.TextField({allowBlank: true}),
		groupable: false};
		
	for (i=1; i < fields.length; i++) {
		columns[i] = {
			id: fields[i].name,
			header: fields[i].name,
			sortable: true,
			dataIndex: fields[i].name,
			editor: new Ext.form.TextField({allowBlank: true})
		}
	}
	
	return columns;
}
