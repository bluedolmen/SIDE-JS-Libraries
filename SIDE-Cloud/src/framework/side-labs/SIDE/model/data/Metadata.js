/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */
 
goog.provide("SIDE.model.data.Metadata");
goog.require("SIDE.pattern.Observer");

/**
 *
 * @constructor
 */
SIDE.model.data.Metadata = function(config) {
	this.dataNsp = config.dataNsp;
	this.alfresco = config.alfresco;
	this.share = config.share;
	this.ticket = config.ticket;
	this.callbackParameterName = config.callbackParameterName || "alf_callback";
	this.content = config.content || {};

	this.classes = null;
	this.contentTypes = [];
	this.aspects = [];
	this.dataListItems = [];

	this.qnames = {};
	//	this.packages = {};
	//	this.classes = {};
	//	this.attributes = {};

	var xhrArgs = {
	  'url': this.alfresco + '/service/api/classes?'
	  			+ 'nsp=' + this.dataNsp
	  			+ '&alf_ticket=' + this.ticket,
	  'content': this.content,
	  'callbackParamName': this.callbackParameterName
	};
	
	var instance = this;
	this.jsonp = dojo.io.script.get(xhrArgs).then(function (data) {
//		instance.classes = data;
		return data;
		this.getAlfrescoClasses();
	});
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
 * @param {string} nsp namespace you are looking for
 * @returns {Array}
 */
SIDE.model.data.Metadata.prototype.getAlfrescoClasses = function() {
	if (this.classes != null) {
		return this.classes;
	} else {
		var result = null;

		var instance = this;
		dojo.when(this.jsonp, function(data) {
			instance.classes = data;

			var j = 0;
			var k = 0;
			var l = 0;

			for(var i = 0; i < instance.classes.length; i++) {
				if (instance.classes[i]['isAspect'] === false) {
					if (instance.classes[i]['parent']['name'] != 'dl:dataListItem') {
						// classes[i] is a content type
						instance.contentTypes[j] = instance.classes[i];
						j++;
					} else {
						// classes[i] is a data list item
						instance.dataListItems[k] = instance.classes[i];
						k++;
					}
				} else {
					// classes[i] is an aspect
					instance.aspects[l] = instance.classes[i];
					l++
				}
			}
			
			return instance.classes;
		})
		
	}
}

SIDE.model.data.Metadata.prototype.getContentTypes = function() {
	if (this.contentTypes && this.contentTypes.length > 0) {
		return this.contentTypes;
	} else {
		// Maybe classes have not been calculated yet?
		if (this.classes == null) {
			this.getAlfrescoClasses();
			return this.contentTypes;
		}
	}
}

SIDE.model.data.Metadata.prototype.getAspects = function() {
	if (this.aspects.length > 0) {
		return this.aspects;
	} else {
		// Maybe classes have not been calculated yet?
		if (this.classes == null) {
			this.getAlfrescoClasses();
			return this.aspects;
		}
	}
}

SIDE.model.data.Metadata.prototype.getDataListItems = function() {
	if (this.dataListItems.length > 0) {
		return this.dataListItems;
	} else {
		// Maybe classes have not been calculated yet?
		if (this.classes == null) {
			this.getAlfrescoClasses();
			return this.dataListItems;
		}
	}
}

/**
 * @param {*} data 
 * @returns {*}
 */
/*
SIDE.model.data.Metadata.prototype.getAspects = function(data) {
	return data.aspects;
};
*/

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
