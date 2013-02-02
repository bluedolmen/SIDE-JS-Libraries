/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.Preview");

/**
 * @constructor
 */
SIDE.view.ui.Preview = function() {
};

/**
 * @param {Element} elt 
 * @param {*} node 
 * @returns
 */
SIDE.view.ui.Preview.prototype.update = function(elt, node) {
	SIDE.view.ui.Preview.log.debug("Update Preview");
	if (node instanceof Ext.tree.TreeNode) {
		SIDE.view.ui.Preview.log.debug("From tree");
		this.updateFromUrl(elt, this.getContentUrl(node.id, node.text), node.text);
	} else {
		SIDE.view.ui.Preview.log.debug("From grid");
		this.updateFromUrl(elt, this.getContentUrl(node.id, node.url), node.url);
	}	
};

/**
 * @param {Element} elt
 * @param {string} url
 * @param {string} title
 * @returns
 */
SIDE.view.ui.Preview.prototype.updateFromUrl = function(elt, url, title) {};

/**
 * @param {*} _uuid 
 * @param {*=} _text 
 * @returns
 */
SIDE.view.ui.Preview.prototype.getContentUrl = function(_uuid, _text) {
   	var uuid = _uuid.replace(/:\/\//g,"/");
   	
   	var pattern = /workspace/;
	var content = "";
	if (! /workspace/.test(uuid)) {
		content = this.previewContent + "/workspace/SpacesStore/" + uuid + "/content";
	} else {
		content = this.previewContent + "/" + uuid + "/content";
	}

	return content;
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.Preview.log = new log4javascript.getLogger("SIDE.view.ui.Preview");