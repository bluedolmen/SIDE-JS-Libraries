/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.chart.dojo.Base");

/**
  * @constructor
  * @param {*} config 
 */
SIDE.view.ui.chart.dojo.Base = function (config) {

	SIDE.view.ui.chart.dojo.Base.MARGIN_TOP = 10;
	SIDE.view.ui.chart.dojo.Base.MIN_LEGEND_WIDTH = 120;
	
	this.chartType = config.type || null;
	this.chartTitle = config.title || null;
	this.chartId = config.id || 'chart-' + Math.floor(Math.random()*1000000000);

	this.chartLegend = config.legendId || 'legend-' + Math.floor(Math.random()*1000000000);
	this.marginTop = config.marginTop || SIDE.view.ui.chart.dojo.Base.MARGIN_TOP;
	this.minLegendWidth = config.minLegendWidth || SIDE.view.ui.chart.dojo.Base.MIN_LEGEND_WIDTH;

	this.tableId = config.tableId || null;
	this.targetId = config.targetId || null;

	if (config.store) {
		this.store = config.store;
	} else if (config.tableId) {
		this.tableId = config.tableId;
		this.store = new dojox.data.HtmlStore({
			dataId: config.tableId
	    });
	}
	
	// chart dimensions
	this.height = config.height || '';
	this.width = config.width || '';
	
	// legend padding
	this.padding = config.padding || '';

	//	
	this.headers = null;
	this.id = null;
	this.chart = null;
//	this.chartLegend = null;
};

/**
 * @param {*} fn Function to call when complete 
 * @returns {*}
 */
SIDE.view.ui.chart.dojo.Base.prototype.fetch = function(fn) {
	// It could be a good idea to embed it in a try catch
    this.store['fetch']({
        onComplete: fn
    });
    
    return this.store;
}
    
/**
 * @param {string} id 
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Base.prototype.createTargetDiv = function (id) {
	var targetDiv = dojo.byId(id);
	if (targetDiv == null) {
		targetDiv = dojo.create('div', {
			'id': id,
			'style': {
				'height': this.height,
				'width': this.width,
				'float': 'left'
			},
			'className': this.chartType + ' ' + id
		});
	}
	
	return targetDiv;
};

/**
 * @param {string=} containerId 
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Base.prototype.render = function (containerId) {
	var container = dojo.byId(containerId);
	if (container == null) {
		container = this.createTargetDiv(this.chartId + '-container');
	}
	
	// ChartId div creation
	if (dojo.byId(this.chartId) == null) {
		var elt = dojo.create("div", {
			'id': this.chartId,
			'style': {
				'float': 'left',
				'width': this.width - this.minLegendWidth
			}
		});
		dojo.place(elt, container);
	}
	
	// ChartLegend div creation	
	if (dojo.byId(this.chartLegend) == null) {
		var elt = dojo.create("div", {
			'id': this.chartLegend
		});
		dojo.place(elt, container);
	}
	
	if(this.targetId) {
		dojo.place(container, this.targetId);
	} else if(this.tableId) {
		dojo.place(container, this.tableId, 'after');
	} else {
		dojo.place(container, dojo.body());
	}
		
	if (this.chart == null) {
		this.create();
	}
	this.chart.render();
	this.createLegend();
};

/**
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Base.prototype.createLegend = function () {
    var legend = new dojox.charting.widget.Legend({
        'chart': this.chart,
        'horizontal': false,
        'style': {
        	'float': 'right',
        	'font-size': 'smaller',
        	'font-weight': 'bold',
			'margin-top': this.marginTop
        }
    }, this.chartLegend);

	return this.chartLegend;
};

/**
 * @param {*} index 
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Base.prototype.getHeader = function (index) {
	return this.store.getAttributes(this.headers)[index];
};

/**
 * @param {*} item 
 * @param {String} index 
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Base.prototype.getValue = function (item, index) {
	return this.store.getValue(item, this.getHeader(index))
};

/**
 * @returns {*}
 */
SIDE.view.ui.chart.dojo.Base.prototype.create = function () {
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.chart.dojo.Base.log = new log4javascript.getLogger("SIDE.view.ui.chart.dojo.Base");