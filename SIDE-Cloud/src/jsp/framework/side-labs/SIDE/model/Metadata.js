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
function Metadata() {
	this.debug("Metadata()");
	
	this.qnames = {};
//	this.packages = {};
//	this.classes = {};
//	this.attributes = {};
}

Metadata.prototype.debug = function(message) {
	if (Metadata.log.isDebugEnabled()) {
		Metadata.log.debug(message);
//		Metadata.log.debug("=> Url : ", this.url);
	}
}

Metadata.log = new log4javascript.getLogger("Metadata");

Metadata.prototype.render = function(data, id) {

}

Metadata.prototype.getAspects = function(data) {
	return data.aspects;
}

Metadata.prototype.getInstances = function(data) {
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

		Metadata.log.debug("Property ", propertyName);
		Metadata.log.debug("=> QName = ", qname);
		Metadata.log.debug("=> Package Name = ", packageName);
		Metadata.log.debug("=> Content Type = ", contentType);
		Metadata.log.debug("=> Attribute = ", attribute);
		Metadata.log.debug("=> Value = ", value);
	}
	return this.qnames;
}
	
Metadata.prototype.createContainer = function(title, layout, content) {
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

	for(i = 1; i < content.length; i++) {
		container.addChild(content[i]);
	}
	Metadata.log.debug(content);
	return container;
}
	
Metadata.prototype.getQNameFromPropertyName = function(propertyName) {
	var re = new RegExp("^{.*}");	
	var m = re.exec(propertyName);
	if (m == null) {
		return "";
	} else {
		return m[0];
	}
}	

Metadata.prototype.getAttributeFromPropertyName = function(propertyName) {
	var re = new RegExp("[^}]*$");	
	var m = re.exec(propertyName);
	if (m == null) {
		return "";
	} else {
		return m[0];
	}
}

Metadata.prototype.getPackageNameFromAttributeName = function(attribute) {
	return this.convertAttributeName("PACKAGE_NAME", attribute);
}

Metadata.prototype.getClassNameFromAttributeName = function(attribute) {
	return this.getContentTypeFromAttributeName(attribute);
}

Metadata.prototype.getContentTypeFromAttributeName = function(attribute) {
	return this.convertAttributeName("CLASS_NAME", attribute);
}

Metadata.prototype.getContentTypeFromQName = function(qname) {
	Metadata.log.debug(qname);
	var re = new RegExp("{http://.*/model/(.*)/[0-9]\.[0-9]}");	
	var m = re.exec(qname);
	if (m == null) {
		return "";
	} else {
		return m[1].capitalize();
		
	}
}

Metadata.prototype.getAttributeFromAttributeName = function(attribute) {
	return this.convertAttributeName("ATTRIBUTE_NAME", attribute);
}

Metadata.prototype.convertAttributeName = function(type, attribute) {
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
}
