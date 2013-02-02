/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.editor.EditorGrid");

/**
 * @constructor
 */
SIDE.view.ui.editor.EditorGrid = function EditorGrid(config) {
	this.config = config;
};

/**
 * @returns {number}
 */
SIDE.view.ui.editor.EditorGrid.prototype.calculatePropertySize = function() {
	// TODO - completer la methode pour qu'elle retourne la taille du champs en fonction
	// de son type ou de l'information qu'elle affichera.
	return 150;
};

/**
 * @returns {*}
 */
SIDE.view.ui.editor.EditorGrid.prototype.getStore = function() {
    var store = new Ext.data.JsonStore({
    	url: this.config.url,
        fields: this.config.fields,
        autoLoad: true,
        //reader: reader,
        root: 'records'
    });
    return store;
};

/**
 * @param {*} store
 * @returns {*}
 */	    
SIDE.view.ui.editor.EditorGrid.prototype.create = function(store) {
    var grid = new Ext.grid.EditorGridPanel({
        'store': store,
        'stripeRows': true,
        'autoExpandColumn': false,
        'plugins': this.config.plugins,
        'columns': this.config.columns,
        'height': this.config.height,
        'width': this.config.width,
        'title': this.config.title  
    });
    
    return grid;
};

/*
getService = function() {
	return DataSource.get('json', Authenticate.getTicket(), this.getUrl());
},
*/

/**
 * @returns {*}
 */
SIDE.view.ui.editor.EditorGrid.prototype.getGrid = function() {
    return this.create(this.getStore());
};

/**
 * @returns {*}
 */
SIDE.view.ui.editor.EditorGrid.prototype.getContent = function() {
    return this.getGrid();
};

/**
 * @returns
 */
SIDE.view.ui.editor.EditorGrid.prototype.show = function(div) {
    this.getContent().render(div);
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.editor.EditorGrid.log = new log4javascript.getLogger("SIDE.view.ui.editor.EditorGrid");
