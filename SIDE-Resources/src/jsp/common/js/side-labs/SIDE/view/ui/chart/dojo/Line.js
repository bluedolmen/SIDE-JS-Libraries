/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.chart.dojo.Line");
goog.require("SIDE.view.ui.chart.dojo.Base");

/**
 * @constructor
 * @param {*} config 
 * @extends {SIDE.view.ui.chart.dojo.Base}
 */
SIDE.view.ui.chart.dojo.Line = function (config) {
	SIDE.view.ui.chart.dojo.Base.call(this, config);
};
goog.inherits(SIDE.view.ui.chart.dojo.Line, SIDE.view.ui.chart.dojo.Base);

/**
 * Returns a chart bar
 * @returns {*}
 */
SIDE.view.ui.chart.dojo.Line.prototype.create = function() {
	
    var lines = {};
    var libX = [];
	
	var nbCols;
	var instance = this;
	var gotItems = function(items, request) {
		instance.headers = items[0];		
		nbCols = instance.store.getAttributes(instance.headers).length;
		for (var j = 1; j < nbCols; j++) {
			//on cree un tableau correspondant a chaque colonne 
			//(une serie = une ligne de graph
			lines[j] = [];
		}
		
		for (var i = 0; i < items.length; i++) {
			//pour chaque ligne, on recupere la valeur de chaque colonne
			//et on l'insere dans le tableau lui correspondant
			for (j = 1; j < nbCols; j++) {
				lines[j].push({
					'x': i,
	                'text': instance.getValue(items[i], 0),
	                'y': parseInt(instance.getValue(items[i], j)),
	                'tooltip': instance.getValue(items[i], j)
				});
			}
			//et pour chaque ligne on prend la valeur de la 1ere colonne (0)
			//qui correspond aux libelles des abscisses
			libX.push({
				'value': i,
                'text': instance.getValue(items[i], 0)
			});
		}
	}

    this.fetch(gotItems);
	
	try {
		var chart = new dojox.charting.Chart2D(this.chartId);
		
		chart.setTheme(dojox.charting.themes.Shrooms);
		chart.addPlot("default", {
			'type': "Lines",
			'markers': true,
			'tension': 3,
			'shadows': {
				'dx': 2,
				'dy': 2,
				'dw': 2
			}
		});
		
		chart.addAxis("x", {
			'min': 0,
			//le max des X correspond au nombre de lignes - l'entete
			//max: (items.length - 1),
			'max': 5,
			//et on insere les libelles issus du tableau
			'labels': libX
		});
		
		chart.addAxis("y", {
			'vertical': true,
			//possibilité d'identifier le max lorsque l'on scanne les cellules
			'max': 150
		});
		
		for (var j = 1; j < nbCols; j++) {
			//on cree une serie pour chaque colonne
			//note : store._headings[j] correspond à l'entete d'une colonne (pour la legende)
			chart.addSeries(SIDE.model.view.Metadata.shorten(this.getHeader(j)), lines[j]);
		}
		
/*	
		var anim4b = new dojox.charting.action2d.Tooltip(chart, 'default');
		var anim4c = new dojox.charting.action2d.Magnify(chart, 'default');
*/		
        this.chart = chart;
		return chart;
	} catch(e) {
		SIDE.view.ui.chart.dojo.Line.log.error("Error : chart not generated", e);
	}
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.chart.dojo.Line.log = new log4javascript.getLogger("SIDE.view.ui.chart.dojo.Line");