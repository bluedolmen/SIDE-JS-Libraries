/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.chart.dojo.Bar");
goog.require("SIDE.view.ui.chart.dojo.Base");

/**
 * @constructor
 * @param {*} config
 * @extends {SIDE.view.ui.chart.dojo.Base}
 */
SIDE.view.ui.chart.dojo.Bar = function (config) {
	SIDE.view.ui.chart.dojo.Base.call(this, config);
};
goog.inherits(SIDE.view.ui.chart.dojo.Bar, SIDE.view.ui.chart.dojo.Base);

/**
 * Returns a chart bar
 * @returns {*}
 */
SIDE.view.ui.chart.dojo.Bar.prototype.create = function() {
    var data = [];
	var libX= [];
	
	var instance = this;
    var gotItems = function(items, request) {
		instance.headers = items[0];		
        for (var i = 0; i < items.length; i++) {
            data.push({
                'text': instance.getValue(items[i], 0),
                'y': parseInt(instance.getValue(items[i], 1)),
                'tooltip': instance.getValue(items[i], 0)
            });
			
			libX.push({
				'text': instance.getValue(items[i], 0),
				'value': i+1
			})
        }
    };
    
    this.fetch(gotItems);
		
    try {
        var chart = new dojox.charting.Chart2D(this.chartId);
        chart.setTheme(dojox.charting.themes.Shrooms).addAxis('x', {
            'fixUpper': 'major',
            'includeZero': false,
            'min': 0,
            'max': 3,
			'labels': libX
        }).addAxis('y', {
            'vertical': true,
            'fixLower': 'major',
            'fixUpper': 'major',
            'max': 30
        }).addPlot('default', {
            'type': 'Columns',
            'minBarSize': 70,
            'maxBarSize': 70,
            'gap': 5
        }).addSeries(this.chartTitle, data, {});
        
/*
        var anim4b = new dojox.charting.action2d.Tooltip(chart, 'default');
        var anim4c = new dojox.charting.action2d.Shake(chart, 'default');

*/        
        this.chart = chart;
        return chart;
    } catch (e) {
        SIDE.view.ui.chart.dojo.Bar.log.error("Error : chart not generated", e);
    }
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.chart.dojo.Bar.log = new log4javascript.getLogger("SIDE.view.ui.chart.dojo.Bar");