/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.SimpleGrid");
goog.require("SIDE.view.ui.extjs.Serializer");

/**
 * @param {*} config
 * @constructor
 */
SIDE.view.ui.SimpleGrid = function(config) {
	this.config = config;
	this.id = this.config.id;

	this.store = false;
	this.grid = null;
};

/**
 * @returns {number}
 */
SIDE.view.ui.SimpleGrid.prototype.calculatePropertySize = function() {
	// TODO
	return 150;
};

/**
 * @returns {*}
 */
SIDE.view.ui.SimpleGrid.prototype.getStore = function() {
	if (this.store) {
		return this.store;
	} else {
		return this.createStore();
	}
};

/**
 * @returns {*}
 */
SIDE.view.ui.SimpleGrid.prototype.createStore = function() {
	var defaultConfig = this.config;
/*	
	defaultConfig({
    	'url': this.config['url'],
        'fields': this.config['fields'],
        'autoLoad': true,
        'root': 'records'
    }
*/
	
	if (this.config['data']) {
		defaultConfig['data'] = this.config['data'];
	} else {
		defaultConfig['url'] = this.config['url'];
	}
    defaultConfig['fields'] = this.config['fields'];
    defaultConfig['autoLoad'] = true;
    defaultConfig['root'] = 'records';

	var store = {};
	if (this.config.enableGrouping) {
    	SIDE.view.ui.SimpleGrid.log.debug('Creating GroupingStore');
		defaultConfig.reader = this.config['reader'];
		defaultConfig.groupField = this.config['groupField'];
    	store = new Ext.data.GroupingStore(defaultConfig);
    	SIDE.view.ui.SimpleGrid.log.info('GroupingStore created');
	} else {
    	SIDE.view.ui.SimpleGrid.log.debug('Creating JSonStore');
	    store = new Ext.data.JsonStore(defaultConfig);
    	SIDE.view.ui.SimpleGrid.log.info('JSonStore created');
	}
	    
    return store;
};
	
/**
 * @returns {*}
 */	    
SIDE.view.ui.SimpleGrid.prototype.create = function(store) {

	var defaultConfig = {
//        'store': this.getStore(),
        'store': store,
        'columns': this.config['columns'],
        'height': this.config['height'],
        'width': this.config['width'],
        'title': this.config['title'],
//	    'resizable': this.config['resizable'],
//	    'draggable': this.config['draggable'],
		'stateId': this.config['stateId'],
		'stateful': this.config['stateful']
    }

/*
	var defaultConfig = this.config;
	defaultConfig['store'] = this.getStore();
*/

	if (this.config['enableGrouping']) {
		defaultConfig['view'] = this.config['view'];
		defaultConfig['fbar'] = this.config['fbar'];
		defaultConfig['fbar'][1]['handler'] = function() { store.clearGrouping(); }
		SIDE.view.ui.SimpleGrid.log.trace('defaultConfigView = ', defaultConfig['view']);
		SIDE.view.ui.SimpleGrid.log.trace('defaultConfigView.fbar[1] = ', defaultConfig['fbar'][1]);
	}

	if (this.config['enablePaging']) {
    	SIDE.view.ui.SimpleGrid.log.info('Paging enabled');
		defaultConfig['viewConfig'] = this.config['viewConfig'];
		var tmpBbar = this.config['bbar'];
		var instance = this;
		tmpBbar['items'][1]['toggleHandler'] = function(btn, pressed) {
	    	SIDE.view.ui.SimpleGrid.log.trace('Component = ', instance);		    	
            var view = instance.getGrid().getView();
	    	SIDE.view.ui.SimpleGrid.log.trace('View = ', view);            
            view['showPreview'] = pressed;
            view.refresh();
        }
		tmpBbar['items'][2]['handler'] = function(btn, pressed) {
	    	var records = SIDE.view.ui.extjs.Serializer.serializeDisplayedContent(
				instance.getGrid().getSelectionModel(),
				instance.getGrid().getColumnModel()
		    );
	    	SIDE.pattern.Observer.publish('/render/charting/bar/' + instance.id, [{data: records}]);
			
			//instance.config.colModels = records[0];
        }
		tmpBbar['items'][3]['handler'] = function(btn, pressed) {
	    	var records = SIDE.view.ui.extjs.Serializer.serializeDisplayedContent(
				instance.getGrid().getSelectionModel(),
				instance.getGrid().getColumnModel()
		    );
	    	SIDE.pattern.Observer.publish('/render/charting/pie/' + instance.id, [{data: records}]);
			
			//instance.config.colModels = records[0];
        }
		tmpBbar['items'][4]['handler'] = function(btn, pressed) {
	    	var records = SIDE.view.ui.extjs.Serializer.serializeDisplayedContent(
				instance.getGrid().getSelectionModel(),
				instance.getGrid().getColumnModel()
		    );
	    	SIDE.pattern.Observer.publish('/render/charting/line/' + instance.id, [{data: records}]);
			
			//instance.config.colModels = records[0];
        }

		tmpBbar['store'] = store;
		defaultConfig['bbar'] = new Ext.PagingToolbar(tmpBbar);
	}

    this.grid = new Ext.grid.GridPanel(defaultConfig);

    return this.grid;
};

// Is it used anywhere?
/*
getService = function() {
	return DataSource.get('json', Authenticate.getTicket(), this.getUrl());
},
*/

/**
 * // returns {Ext.grid.GridPanel}
 * @returns {*}
 */
SIDE.view.ui.SimpleGrid.prototype.getGrid = function() {
	if (this.grid != null) {
	    return this.grid;
	} else {
		return this.create(this.getStore());
	}
};

/**
 * // returns {Ext.grid.GridPanel}
 * @returns {*}
 */
SIDE.view.ui.SimpleGrid.prototype.getContent = function() {
    return this.getGrid();
};

/**
 * @param {string} div
 * @returns
 */
SIDE.view.ui.SimpleGrid.prototype.show = function(div) {
    this.getContent().render(div);
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.SimpleGrid.log = log4javascript.getLogger("SIDE.view.ui.SimpleGrid");