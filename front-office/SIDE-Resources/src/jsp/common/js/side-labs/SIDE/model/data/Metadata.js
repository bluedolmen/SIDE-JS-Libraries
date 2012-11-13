/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */
 
goog.provide("SIDE.model.data.Metadata");

/**
 *
 * @constructor
 */
SIDE.model.data.Metadata = function() {
		this.debug("SIDE.model.data.Metadata()");
		
		this.qnames = {};
	//	this.packages = {};
	//	this.classes = {};
	//	this.attributes = {};
};
	
/**
 * @param {string} message 
 * @returns
 */
SIDE.model.data.Metadata.prototype.debug = function(message) {
	try {
		SIDE.model.data.Metadata.log.debug(message);
//		SIDE.model.data.Metadata.log.debug("=> Url : ", this.url);
	} catch (e) {};
};
	
/**
 * @param {*} data 
 * @param {*} id 
 * @returns
 */
SIDE.model.data.Metadata.prototype.render = function(data, id) {
};

/**
 * @param {*} data 
 * @returns {*}
 */
SIDE.model.data.Metadata.prototype.getAspects = function(data) {
	return data.aspects;
};

/**
 * @param {*} data 
 * @returns {*}
 */
SIDE.model.data.Metadata.prototype.getInstances = function(data) {
	for(var propertyName in data) {
		var qname = this.getQNameFromPropertyName(propertyName);
//		qnames
		var attribute = this.getAttributeFromPropertyName(propertyName);
		var packageName = "";
		var contentType = "";
		var re = new RegExp("com_");
		if (re.test(attribute)) {
			packageName = this.getPackageNameFromAttributeName(attribute);
			contentType = this.getContentTypeFromAttributeName(attribute);
			attribute = this.getAttributeFromAttributeName(attribute);
		} else {
			packageName = "Package";
			contentType = this.getContentTypeFromQName(qname);
		}
		
		var value = data[propertyName] || "";
		
		if (this.qnames[qname] == undefined) {
			this.qnames[qname] = {};
		}
		if (this.qnames[qname][contentType] == undefined) {
			this.qnames[qname][contentType] = {};
		}
		if (this.qnames[qname][contentType][attribute] == undefined) {
			this.qnames[qname][contentType][attribute] = {};
		}
		
		this.qnames[qname][contentType][attribute] = value;

		SIDE.model.data.Metadata.log.debug("Property ", propertyName);
		SIDE.model.data.Metadata.log.debug("=> QName = ", qname);
		SIDE.model.data.Metadata.log.debug("=> Package Name = ", packageName);
		SIDE.model.data.Metadata.log.debug("=> Content Type = ", contentType);
		SIDE.model.data.Metadata.log.debug("=> Attribute = ", attribute);
		SIDE.model.data.Metadata.log.debug("=> Value = ", value);
	}
	return this.qnames;
};
	
/**
 * @param {string} title 
 * @param {string} layout nothing || tab 
 * @param {*} content
 * @returns {*}
 */
SIDE.model.data.Metadata.prototype.createContainer = function(title, layout, content) {
	var container;
	var config = {
		title: title,
		region: "center"
	}
	
	if ("tab" == layout) {
		container = new dijit.layout.TabContainer(config);
	} else {
		container = new dijit.layout.AccordionContainer(config);
	}

	for(var i = 1; i < content.length; i++) {
		container.addChild(content[i]);
	}
	SIDE.model.data.Metadata.log.debug(content);
	return container;
};

/**
 * @param {string} propertyName 
 * @returns {string}
 */	
SIDE.model.data.Metadata.prototype.getQNameFromPropertyName = function(propertyName) {
	var re = new RegExp("^{.*}");	
	var m = re.exec(propertyName);
	if (m == null) {
		return "";
	} else {
		return m[0];
	}
};

/**
 * @param {string} propertyName 
 * @returns {string}
 */
SIDE.model.data.Metadata.prototype.getAttributeFromPropertyName = function(propertyName) {
	var re = new RegExp("[^}]*$");	
	var m = re.exec(propertyName);
	if (m == null) {
		return "";
	} else {
		return m[0];
	}
};

/**
 * @param {string} attribute 
 * @returns {string}
 */
SIDE.model.data.Metadata.prototype.getPackageNameFromAttributeName = function(attribute) {
	return this.convertAttributeName("PACKAGE_NAME", attribute);
};

/**
 * @param {string} attribute 
 * @returns {string}
 */
SIDE.model.data.Metadata.prototype.getClassNameFromAttributeName = function(attribute) {
	return this.getContentTypeFromAttributeName(attribute);
};

/**
 * @param {string} attribute 
 * @returns {string}
 */
SIDE.model.data.Metadata.prototype.getContentTypeFromAttributeName = function(attribute) {
	return this.convertAttributeName("CLASS_NAME", attribute);
};

/**
 * @param {string} qname 
 * @returns {string}
 */
SIDE.model.data.Metadata.prototype.getContentTypeFromQName = function(qname) {
	SIDE.model.data.Metadata.log.debug(qname);
	var re = new RegExp("{http://.*/model/(.*)/[0-9]\.[0-9]}");	
	var m = re.exec(qname);
	if (m == null) {
		return "";
	} else {
		return m[1].capitalize();
	}
};

/**
 * @param {string} attribute 
 * @returns {string}
 */
SIDE.model.data.Metadata.prototype.getAttributeFromAttributeName = function(attribute) {
	return this.convertAttributeName("ATTRIBUTE_NAME", attribute);
};

/**
 * @param {string} type 
 * @param {string} attribute 
 * @returns {string}
 */
SIDE.model.data.Metadata.prototype.convertAttributeName = function(type, attribute) {
	var re = new RegExp("(.*)_([A-Z][a-zA-Z0-9]*)_(.*)");	
	var m = re.exec(attribute);
	if (m == null) {
		return "";
	} else {
		if ("PACKAGE_NAME" == type) {
			return m[1];
		} else if ("CLASS_NAME" == type) {
			return m[2];
		} else if ("ABSOLUTE_CLASS_NAME" == type) {
			return m[1] + "_" + m[2];
		} else if ("ATTRIBUTE_NAME" == type) {
			return m[3];
		}
	}	
};

/**
 * @type {*}
 * @static
 */
SIDE.model.data.Metadata.log = new log4javascript.getLogger("SIDE.model.data.Metadata");
