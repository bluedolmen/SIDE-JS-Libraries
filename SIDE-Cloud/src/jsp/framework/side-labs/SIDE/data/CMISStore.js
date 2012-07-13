/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.data.CMISStore");

dojo.require("dojox.jsonPath.query");

/**
 * Builds a json flux from a CMIS query
 * @namespace SIDE.data.CMISStore
 * @param {*} config
 * @constructor
 */
SIDE.data.CMISStore = function(config) {
	var instance = this;

	this.value = config.value == true ? true : false;
	// elements at the entry root otherwise in provided property, generally props
	// this.prefix = 'props'
	this.prefix = config.level || '';
	this.aspectsPrefix = config.aspectsPrefix || this.prefix;
	this.linksPrefix = config.linksPrefix || this.prefix;

	this.propertyNamePrefix = config.propertyNamePrefix || 'prop_';
	this.linkNamePrefix = config.propertyNamePrefix || 'link_';

	this.entries = null;

	if (config.data != null && config.data != '') {
		this.serialize(config.data);
	} else {
		this.channel = config.channel || '/CMISStore/data';

		this.xhrArgs = {
			'url': config.url,
			'success': function(response) {
				instance.serialize(response.responseText);
				//var entries2 = JSONSelect.match('.entry [:has(.cmis_value:val("icon.png"))]', json);
				SIDE.pattern.Observer.publish(instance.channel, [{data: { 'records': instance.entries}}]);
				try {
					eval(config.callback)(instance);
				} catch (e) {
				}
			},
			'failure': function() {
			},
			'async': config.async || false,
			'dataType': config.dataType || "text/xml"
		}

		SIDE.Util.request(this.xhrArgs);
	}
};

/**
 * Creates json object corresponding to an entry in the CMIS result
 * @param {*} response
 * @returns
 */
SIDE.data.CMISStore.prototype.success = function(response) {
	//instance.serialize(response);
	this.serialize(response);
}

SIDE.data.CMISStore.prototype.getData = function() {
	return this.entries;
}

/**
 * Creates json object corresponding to an entry in the CMIS result
 * @param {*} entry
 * @param {*} properties
 * @param {*} type
 * @returns
 */
SIDE.data.CMISStore.prototype.createEntry = function(entry, properties, type) {
	try {
		for (var j = 0; j < properties.length; j++) {
			var property = properties[j];
			if (this.value) {
				// Stores only the value:
				// * x['cmis:name'] = test
				if (type == 'PROP') {
					var propertyName = this.propertyNamePrefix + property['queryname'].replace(/:/g, '_');
					if (property['cmis_value'] !== undefined) {
						entry[propertyName] = property['cmis_value'];
					} else {
						entry[propertyName] = '';
					}
				} else if (type == 'LINK') {
					var linkName = this.linkNamePrefix + property['rel'].replace(/http:.*\/([^\/]*)$/g, '$1').replace(/:/g, '_');
					if (property['href'] !== undefined) {
						entry[linkName] = property['href'];
					} else {
						entry[linkName] = '';
					}
				}
			} else {
				// Stores an object
				// * x['cmis:name'] = { cmis_value: test, cmis_displayName: ...}
				if (type == 'PROP') {
					// Copy'n paste from above
					var propertyName = this.propertyNamePrefix + property['queryname'].replace(/:/g, '_');
					entry[propertyName] = property;
				} else if (type == 'LINK') {
					// Copy'n paste from above
					var linkName = this.linkNamePrefix + property['rel'].replace(/http:.*\/([^\/]*)$/g, '$1').replace(/:/g, '_');
					entry[linkName] = property;
				}
			}
		}
	} catch (e) {
		SIDE.data.CMISStore.log.debug(e);
	}
}

/**
 * Serializes a complete fragment from the entry provided in the CMIS result
 * @param {*} entry
 * @param {*} properties
 * @returns
 */
SIDE.data.CMISStore.prototype.serializeFragment = function(entry, properties) {
	this.createEntry(entry, properties['cmis_propertyboolean'], 'PROP');
	this.createEntry(entry, properties['cmis_propertydatetime'], 'PROP');
	this.createEntry(entry, properties['cmis_propertyid'], 'PROP');
	this.createEntry(entry, properties['cmis_propertyinteger'], 'PROP');
	this.createEntry(entry, properties['cmis_propertystring'], 'PROP');
}

/**
 * Serializes a complete fragment from the entry provided in the CMIS result
 * @param {*} entry
 * @param {*} properties
 * @returns
 */
SIDE.data.CMISStore.prototype.serializeLinksFragment = function(entry, properties) {
	this.createEntry(entry, properties, 'LINK');
}

/**
 * Serializes each entry of the CMIS flow in the container
 * provided to serializeFragment
 * Container may be the entry itself, or an object created for it. The second solution may be
 * cleaner because of the separation of native properties and calculated one but leads to
 * more complex queries. In the beginning, the first solution will be chosen.
 * @param {*} xml
 * @returns
 */
SIDE.data.CMISStore.prototype.serialize = function(xml) {
	var json = xml2json.parser(xml);
	//var entries = dojox.jsonPath.query(json, "$.feed.entry[?(queryname = 'cmis:name')]");
	if (json.entry instanceof Array) {
		this.entries = [json.entry];
	} else if (json.entry instanceof Object) {
		this.entries = [json.entry];
	} else if (json.feed.entry instanceof Array) {
		this.entries = dojox.jsonPath.query(json, "$.feed.entry[*]");
	} else {
		this.entries = [json.feed.entry];
	}
	for (var i = 0; i < this.entries.length; i++) {
		var entry = this.entries[i];

		if (null != entry) {
			var cmisra = entry['cmisra_object'];
			var links = entry['link'];

			if (this.prefix == null || this.prefix == '') {
				// All props will be in the same container
				this.serializeFragment(entry, cmisra['cmis_properties']);
				this.serializeFragment(entry, cmisra['cmis_properties']['alf_aspects']['alf_properties']);
				this.serializeLinksFragment(entry, entry['link']);

				// SIDE normalization
				entry['id'] = entry[this.propertyNamePrefix + 'cmis_objectId'];
				entry['url'] = entry[this.linkNamePrefix + 'self'];
			} else {
				// Must be initilized in the same time because of the risk of collision if equals to this.prefix
				entry[this.prefix] = {};
				entry[this.aspectsPrefix] = {};
				entry[this.linksPrefix] = {};

				this.serializeFragment(entry[this.prefix], cmisra['cmis_properties']);
				this.serializeFragment(entry[this.aspectsPrefix], cmisra['cmis_properties']['alf_aspects']['alf_properties']);
				this.serializeLinksFragment(entry[this.linksPrefix], entry['link']);
			}
		}
	}

	//var entries2 = JSONSelect.match('.entry [:has(.cmis_value:val("icon.png"))]', json);
//	SIDE.pattern.Observer.publish(this.channel, [{data: { records: this.entries}}]);
}

/**
 * @type {*}
 * @static
 */
SIDE.data.CMISStore.log = new log4javascript.getLogger("SIDE.data.CMISStore");