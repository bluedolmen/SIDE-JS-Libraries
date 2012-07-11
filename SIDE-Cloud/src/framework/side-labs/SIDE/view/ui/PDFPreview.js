/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.PDFPreview");
goog.require("SIDE.view.ui.Preview");

/**
 * @param {string} previewContent
 * @constructor
 * @extends {SIDE.view.ui.Preview}
 */
SIDE.view.ui.PDFPreview = function(previewContent) {
	SIDE.view.ui.Preview.call(this);
	if (previewContent == null || previewContent == "") {
		this.previewContent = SIDE.params.share + "/proxy/alfresco/api/node";
	} else {
		this.previewContent = previewContent;
	}
};
goog.inherits(SIDE.view.ui.PDFPreview, SIDE.view.ui.Preview);

/*
SIDE.view.ui.PDFPreview.prototype.getContentUrl = function(_uuid) {
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
*/

/**
 * @param {Element} elt
 * @param {string} url
 * @param {*} uuid
 * @returns
 */
SIDE.view.ui.PDFPreview.prototype.updateFromUrl = function(elt, url, uuid) {
	SIDE.view.ui.PDFPreview.log.debug("Update PDF Preview");

    var myPDF = new PDFObject({
	    'url': url,
	    'pdfOpenParams': {
	    	'view':			'FitBV',
	      	'pagemode': 	'bookmarks',
	      	'scrollbars': 	'1',
	      	'toolbar': 		'1',
	      	'statusbar': 	'1',
	      	'messages': 	'1',
	      	'navpanes': 	'1'
	    }
    }).embed(elt);

	SIDE.view.ui.PDFPreview.log.debug("PDF Preview Updated");
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.PDFPreview.log = new log4javascript.getLogger("SIDE.view.ui.PDFPreview");
