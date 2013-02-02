/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.desktop.SimpleIFrame");

/**
 * @constructor
 */
SIDE.view.ui.desktop.SimpleIFrame = function(config) {
    this.title = config.title;     
	this.url = config.url;
	this.height = config.height;
    this.width = config.width;
    this.url = config.url;
};

/**
 * @returns {number}
 */
SIDE.view.ui.desktop.SimpleIFrame.prototype.calculatePropertySize = function() {
	// TODO - completer la methode pour qu'elle retourne la taille du champs en fonction
	// de son type ou de l'information qu'elle affichera.
	return 150;
};
		
/**
 * @param {string} url
 * @returns {*}
 */    
SIDE.view.ui.desktop.SimpleIFrame.prototype.create = function(url) {
	return new Ext.TabPanel({
        activeTab:'iSideForm',
        deferredRender:true,
        plain:true,
        layoutOnTabChange:true,
		defaults: {
			autoScroll: true,
			border:false,
			loadMask:true
		},
        items: [{
                title: 'SIDE Form',
                id:'iSideForm',
                xtype:'iframepanel',
                defaultSrc: url
        	},{
                title: 'Document Preview',
                id:'igrid',
                xtype:'iframepanel',
                loadMask:{msg:'<img src="images/powered.png" height="35px" width="99px" />'},
                defaultSrc:'http://localhost:8880/side-demo/components/Document/extJs/layout.html?viewWebService=http://localhost:8087/alfresco/service/com/bluexml/side/view/yamma_share/Document_DataList_Main.json'
            }]
    })
};

/**
 * @returns {string}
 */
SIDE.view.ui.desktop.SimpleIFrame.prototype.getUrl = function() {
    return this.url;
};

/**
 * @returns {*}
 */
SIDE.view.ui.desktop.SimpleIFrame.prototype.getIFrame = function() {
    return this.create(this.getUrl());
};

/**
 * @returns {*}
 */
SIDE.view.ui.desktop.SimpleIFrame.prototype.getContent = function() {
    return this.getIFrame();
};

/**
 * @returns
 */
SIDE.view.ui.desktop.SimpleIFrame.prototype.show = function(div) {
    this.getContent().render(div);
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.desktop.SimpleIFrame.log = new log4javascript.getLogger("SIDE.view.ui.desktop.SimpleIFrame");
