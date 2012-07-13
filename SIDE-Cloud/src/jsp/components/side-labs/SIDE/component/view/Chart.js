/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojox.data.HtmlStore");

/*
dojo.require("dojox.charting.widget.Legend");
dojo.require("dojox.charting.Chart2D");
dojo.require("dojox.charting.themes.ThreeD")
dojo.require("dojox.charting.action2d.Tooltip");
dojo.require('dojox.charting.action2d.Shake');
dojo.require("dojox.charting.action2d.Highlight");
dojo.require("dojox.charting.action2d.MoveSlice");
dojo.require("dojox.charting.action2d.Magnify");
dojo.require("dojox.charting.themes.Shrooms");
dojo.require("dijit.form.NumberSpinner");
*/

goog.provide('SIDE.component.view.Chart');

goog.require("SIDE.pattern.Observer");
goog.require("SIDE.view.ui.chart.dojo.Base");
goog.require("SIDE.view.ui.chart.dojo.Bar");
goog.require("SIDE.view.ui.chart.dojo.Line");
goog.require("SIDE.view.ui.chart.dojo.Pie");

/**
 * @namespace SIDE.component.view.Chart
 */
SIDE.component.view.Chart = function() {	
}

SIDE.component.view.Chart.pie = function(msg) {
	var series = msg.data
	var dataStore = new dojo.data.ItemFileReadStore({
		data: { items: msg.data }
    });

    var c1 = new SIDE.view.ui.chart.dojo.Pie({
    			title: '',
    			targetId: 'grid-chart-target',
    			store: dataStore,
    			marginTop: 100,
    			width: 400,
    			height: 200,
    			padding: 40                			
    });
    c1.render();
}

SIDE.component.view.Chart.bar = function(msg) {
	var series = msg.data
	var dataStore = new dojo.data.ItemFileReadStore({
		data: { items: msg.data }
    });

    var c2 = new SIDE.view.ui.chart.dojo.Bar({
    			title: '',
    			targetId: 'grid-chart-target',
    			store: dataStore,
    			marginTop: 100,
    			width: 400,
    			height: 200,
    			padding: 40                			
    });
    c2.render();
}

SIDE.component.view.Chart.line = function(msg) {
	var series = msg.data
	var dataStore = new dojo.data.ItemFileReadStore({
		data: { items: msg.data }
    });

    var c3 = new SIDE.view.ui.chart.dojo.Line({
    			title: '',
    			targetId: 'grid-chart-target',
    			store: dataStore,
    			marginTop: 100,
    			width: 400,
    			height: 200,
    			padding: 40                			
    });
    c3.render();
}