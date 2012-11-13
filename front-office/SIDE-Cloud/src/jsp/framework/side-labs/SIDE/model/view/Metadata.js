/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */
 
goog.provide("SIDE.model.view.Metadata");

goog.require("SIDE.Util");
goog.require("SIDE.pattern.Observer");

/**
 * To get metadata, a request is done and first record is analyzed to extract
 * columns name
 *
 * @param {*} config
 * @constructor
 */
SIDE.model.view.Metadata = function(config) {
	if (typeof config == "object") {
		// config is a configuration object
		this.url = config.url || null;
		this.data = config.data || null;
		this.channel = config.channel || '/view/metadata';
		this.modelPrefix = config.modelPrefix || 'yamma';
		this.show = config.show || 'prop'; // bprop = basic properties; cprop = custom properties
		this.dataIsCMIS = config.dataIsCMIS !== true ? false : true;
//		this.dataIsCMIS = true;
	} else {
		// config is a simple url
		this.url = config 			// + "?limit=1";
		this.channel = "/view/metadata";
		this.show = config.show || 'bprop, cprop'; // bprop = basic properties; cprop = custom properties
		this.modelPrefix = config.modelPrefix || 'yamma';
		this.dataIsCMIS = false;
	}
	
	if (this.dataIsCMIS === false) {
		this.show = config.show || 'bprop,cprop'; // bprop = basic properties; cprop = custom properties
	} else {
		
	}

	this.debug("SIDE.model.view.Metadata()");

	if (this.data) {	
		this.content = this.data;
	} else {
		this.content = "";
	}
	
	/*
	this.fields = [];
	this.columns = [];
	*/
};

/**
 * @param {string} message 
 * @returns
 */
SIDE.model.view.Metadata.prototype.debug = function(message) {
	try {
		SIDE.model.view.Metadata.log.debug(message);
//		SIDE.model.view.Metadata.log.debug("=> Url : ", this.url);
	} catch (e) {};
};
	
/**
 * @returns {string}
 */
SIDE.model.view.Metadata.prototype.getContent = function() {
	if ((this.content == null) || (this.content == "")) {
		SIDE.model.view.Metadata.log.debug("Content has not yet been loaded. Starts loading...");
		this.setContent();
	}
	return this.content;
};
	
/**
 * @returns
 */
SIDE.model.view.Metadata.prototype.setContent = function() {
	var instance = this;

/*	
	var xhrArgs = {
	  'url': this.url,
	  'content': {},
	  'callbackParamName': 'alf_callback'
	};
	this.jsonp = SIDE.Util.getJsonP(xhrArgs)
					.then(function (data) {
						SIDE.model.view.Metadata.log.debug("Metadata loading: success");
						instance.content = data;
					  	SIDE.pattern.Observer.publish(this.channel, [{"value": data}]);
						return data;
					});
 */

	var xhrArgs = {
		'url': this.url,
		'mimeType': "text/json",
	   	'success': function (data) {
   			SIDE.model.view.Metadata.log.debug("Metadata loading: success");
   			instance.content = data;
 		  	SIDE.pattern.Observer.publish(this.channel, [{"value": data}]);
	   	},
	   	'failure': function (params) {
   			SIDE.model.view.Metadata.log.debug("Metadata loading: failure");
	   	}
	};
	SIDE.Util.get(xhrArgs);
};
	
/**
 * @returns {*}
 */
SIDE.model.view.Metadata.prototype.getFields = function() {
	var fields = [];
	fields[0] = {
		'name': 'id'
	};
	
	var i = 1;
	var content = this.getContent();
	var j = 0;
	for (var key in content['records'][0]) {
		fields[i] = {
			'name': key,
			'type': 'String'
		};
		i++;
	}

	// fields are sorted on their absolute name, not the end part
	// which is displayed	
	return fields.sort(function(a, b) {
		var stringA = a.name.toLowerCase();
		var stringB = b.name.toLowerCase();
		if (stringA < stringB) //sort string ascending
			return -1 
		if (stringA > stringB)
			return 1
		return 0
	});
};
	
/** 
 * shorten became a static method
 * @param {string} attribute 
 * @returns {string}
 */
SIDE.model.view.Metadata.shorten = function(attribute) {
	var re = new RegExp("(.*)_([^_]*)_([^_]*)");	
	var m = re.exec(attribute);
	if (m == null) {
		return attribute;
	} else {
//		return m[2] + "/" + m[3].capitalize();
		return m[3].capitalize();
	}	
};

/**
 * Returns a column definition based on the absolute provided column name
 * @param {string} columnName 
 * @returns {*}
 */
SIDE.model.view.Metadata.prototype.getColumnDefinition = function(columnName) {
	return {
		'id': columnName,
		'header': SIDE.model.view.Metadata.shorten(columnName),
		'sortable': true,
		'dataIndex': columnName,
		//'renderer': Renderer.handle,
		'groupable': true,
		'editor': new Ext.form.TextField({allowBlank: true})
	}
}
	
/**
 * TODO: automatically detect attribute type instead of using TextField systematically
 * @returns {*}
 */
SIDE.model.view.Metadata.prototype.getColumns = function() {
	var columns = [];
	var fields = this.getFields();	
	
	columns[0] = {
		'id': 'id',
		'header': 'Identifier',
		'width': 160,
		'sortable': true,
		'dataIndex': 'id',
		'hidden': true,
		//'renderer': Renderer.handle,
		'editor': new Ext.form.TextField({allowBlank: true}),
		'groupable': false
	};

	var j = 1;
	for (var i = 1; i < fields.length; i++) {
		var name = fields[i].name;
		if (this.dataIsCMIS) {
			if ((name != "alfresco_actions" && name != 'id')
				&& ((this.show.indexOf('link') > -1 && (name.indexOf('link_') > -1))
					|| (this.show.indexOf('prop') > -1 && (name.indexOf('prop_') == 0)))) {
				columns[j] = this.getColumnDefinition(name);
				j++;
			}
		} else {
			if ((name != "alfresco_actions" && name != 'id')
				&& ((this.show.indexOf('bprop') > -1 && (name.indexOf(this.modelPrefix) == -1))
					|| (this.show.indexOf('cprop') > -1 && (name.indexOf(this.modelPrefix) > -1)))) {
				columns[j] = this.getColumnDefinition(name);
				j++;
			}
		}
	}
	
	return columns;
};

/**
 * @type {*}
 * @static
 */
SIDE.model.view.Metadata.log = new log4javascript.getLogger("SIDE.model.view.Metadata");