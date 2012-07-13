/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.FlashPreview");
goog.require("SIDE.view.ui.Preview");

/**
 * @param {string} previewContent
 * @param {string} previewerUrl
 * @constructor
 * @extends {SIDE.view.ui.Preview}
 */
SIDE.view.ui.FlashPreview = function(previewContent, previewerUrl) {
	SIDE.view.ui.Preview.call(this);

	if (previewContent == null || previewContent == "") {
		//this.previewContent = "http%3A%2F%2Flocalhost%3A8880%2Fshare%2Fproxy%2Falfresco%2Fapi%2Fnode";
		this.previewContent = "http://localhost:8880/share/proxy/alfresco/api/node";
	} else {
		this.previewContent = previewContent;
	}
	
	if (previewerUrl == null || previewerUrl == "") {
		this.previewerUrl = "http://localhost:8880/share/res/components/preview/WebPreviewer.swf";
	} else {
		this.previewerUrl = previewerUrl;
	}
};
goog.inherits(SIDE.view.ui.FlashPreview,SIDE.view.ui.Preview);

/**
 * @param {string} _uuid 
 * @param {string} _title 
 * @returns
 */
SIDE.view.ui.FlashPreview.prototype.getContentUrl = function(_uuid, _title) {
//   	uuid.replace(/:\/\//,'/').split('/')[2];
   	var uuid = _uuid.replace(/:\/\//g,"/");
   	
   	var pattern = /workspace/;
	var content = "";
	if (! /workspace/.test(uuid)) {
		content = this.previewContent + "/workspace/SpacesStore/" + uuid + "/content";
	} else {
		content = this.previewContent + "/" + uuid + "/content";
	}

	pattern = /\.png$|\.jpg$|\.gif$/;
   	if (pattern.test(_title)) {
		content += "/webpreview/"
   	} else {
		content += "/thumbnails/webpreview/"
   	}
   	
	var url = content.replace(/:/g,"%3A");
	url = url.replace(/\//g,"%2F");
   	return url;
};

/**
 * @param {Element} elt 
 * @param {string} _url 
 * @param {string} _title 
 * @returns
 */
SIDE.view.ui.FlashPreview.prototype.updateFromUrl = function(elt, _url, _title) {	
	SIDE.view.ui.FlashPreview.log.debug("Update Flash Preview");
	
   	var embed = elt.childNodes;
   	if (embed != null && embed.length > 0) {
		elt.removeChild(embed[0]);
	}
	
   	embed = document.createElement('embed');

	var flashvars = '';
	if (_title) {
		flashvars = 'fileName=' + _title
	}

	flashvars +=  "&paging=true"
						+ "&url=" + _url
							+ "%3Fc%3Dforce"
							+ "%26noCacheToken%3D1276076754220"
							+ "&i18n_actualSize=Actual%20Size"
							+ "&i18n_fitPage=Fit%20Page&i18n_fitWidth=Fit%20Width&i18n_fitHeight=Fit%20Height"
							+ "&i18n_fullscreen=Fullscreen&i18n_fullwindow=Maximize&i18n_fullwindow_escape=Press%20Esc%20to%20exit%20full%20window%20mode"
							+ "&i18n_page=Page&i18n_pageOf=of"
							+ "&show_fullscreen_button=true&show_fullwindow_button=true";

	SIDE.view.ui.FlashPreview.log.debug('Flashvars', flashvars);
   	embed.setAttribute('flashvars',flashvars);
	embed.setAttribute('src', this.previewerUrl);
	embed.setAttribute('id','embed');
	embed.setAttribute('width','100%');
	embed.setAttribute('height','100%');
	embed.setAttribute('wmode','transparent');
	embed.setAttribute('allowfullscreen','true');
	embed.setAttribute('allowscriptaccess','sameDomain');
	embed.setAttribute('quality','high');
	embed.setAttribute('type','application/x-shockwave-flash');

//	parent.appendChild(embed);
	elt.appendChild(embed);

	SIDE.view.ui.FlashPreview.log.debug("Flash Preview Updated");
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.FlashPreview.log = new log4javascript.getLogger("SIDE.view.ui.FlashPreview");
