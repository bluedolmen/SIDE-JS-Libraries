/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.chart.dojo.Pie");
goog.require("SIDE.view.ui.chart.dojo.Base");

/**
 * @constructor
 * @param {*} config 
 * @extends {SIDE.view.ui.chart.dojo.Base}
 */
SIDE.view.ui.chart.dojo.Pie = function (config) {
	SIDE.view.ui.chart.dojo.Base.call(this, config);
};
goog.inherits(SIDE.view.ui.chart.dojo.Pie, SIDE.view.ui.chart.dojo.Base);

/**
 * Returns a chart bar
 * @returns {*}
 */
SIDE.view.ui.chart.dojo.Pie.prototype.create = function() {
    var data = [];
    var instance = this;
    var gotItems = function(items, request) {
		instance.headers = items[0];		
        for (var i = 0; i < items.length; i++) {
            data.push({
                text: instance.getValue(items[i], 0),
                y: parseInt(instance.getValue(items[i], 1)),
                tooltip: instance.getValue(items[i], 0)
            });
        }
    };
	
    this.fetch(gotItems);
	
    try {
        var chart = new dojox.charting.Chart2D(this.chartId);
        chart.setTheme(dojox.charting.themes.ThreeD)
        chart.addPlot('default', {
            'type': 'Pie',
            'font': 'normal normal 7pt Tahoma',
            'radius': 60,
            'fontColor': 'black',
            'labelOffset': -40
        })
        chart.addSeries('SeriesPie', data)
        chart.connectToPlot("default", function(o){
            if (o.type == "onclick") {
                document.location.href = "http://www.google.fr"
            }
        });

/*        chart.render();
        
        var anim4b = new dojox.charting.action2d.Tooltip(chart, 'default');
        var anim4c = new dojox.charting.action2d.Shake(chart, 'default');
*/        
        this.chart = chart;
        return chart;
    } catch (e) {
        SIDE.view.ui.chart.dojo.Pie.log.error("Error : chart not generated", e);
    }
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.chart.dojo.Pie.log = new log4javascript.getLogger("SIDE.view.ui.chart.dojo.Pie");