/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.component.store.CMISStore');

goog.require('SIDE.data.CMISStore');

/**
 * @namespace SIDE.component.store.CMISStore
 * @constructor
 * @param {*} _pathOrId
 * @param {*=} config
 */
SIDE.component.store.CMISStore = function(_pathOrId, config) {
	this.channel = config.channel || '/CMISStore/data';
	var pathOrId = _pathOrId.value;
	// var pathOrId = '/Sites/test2/documentLibrary/test/INBOX/Courrier1'
	// var pathOrId = 'workspace://SpacesStore/0f2dd89d-7ef1-4b34-b448-7cf05a4ab0cb';
	var url = SIDE.params.alfresco + '/service/cmis';
	if (/:\/\//.test(pathOrId)) {
		pathOrId = pathOrId.replace(/workspace:\/\/SpacesStore\/(.*)$/,'$1');
		// It's an id
		url += '/i/' + pathOrId + '/children';
	} else {
		// It's a path
		url += '/p' + pathOrId + '/children';
	}
	url += '?alf_ticket=' + ticket;
	// We calculate the query to execute based on the link-rel
	

	var store = new SIDE.data.CMISStore({
		url: url,
		prefix: '',					// we want properties at the top level
		value: true,				// we want to directly store values not objects
		channel: this.channel,
		callback: function() {}
	});
}

