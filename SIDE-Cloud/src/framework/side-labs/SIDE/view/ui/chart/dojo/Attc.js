/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.chart.dojo.Attc");

/**
 * @constructor
 */
SIDE.view.ui.chart.dojo.Attc = function (config) {
	
//	dojo.byId(_chartId).innerHTML = '';
	
	this.chartType = config.type;
	this.chartTitle = config.title;
	this.chartId = config.id;

	this.chartLegend = config.legendId;

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
	this.height = config.legendId;
	this.width = config.legendId;
	
	// legend padding
	this.padding = config.legendId;

	//	
	this.headers = null;
	this.id = null;
	this.chart = null;
//	this.chartLegend = null;
};

/**
 * @param {*} item 
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Attc.prototype.createTargetDiv = function (id) {
	var targetDiv = dojo.byId(id);
	if (targetDiv == null) {
		targetDiv = dojo.create('div', {
			'id': id,
			'style': {
				'height': this.height,
				'width': this.width
			},
			'className': this.chartType + ' ' + id
		});
	}
	
	return targetDiv;
};

/**
 * @param {*} item 
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Attc.prototype.render = function (containerId) {
	var container = dojo.byId(containerId);
	if (container == null) {
		container = this.createTargetDiv(this.chartId + '-container');
	}
	
	// ChartId div creation
	if (dojo.byId(this.chartId) == null) {
		var elt = dojo.create("div", {
			'id': this.chartId
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
		if (this.chartType == 'pie') {
			this.createPie();
		} else if (this.chartType == 'line') {
			this.createLine();
		} else if (this.chartType == 'column') {
			this.createBar();
		}
	}
	this.chart.render();
	this.createLegend();
};

/**
 * @param {*} item 
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Attc.prototype.createLegend = function () {
    var legend = new dojox.charting.widget.Legend({
        'chart': this.chart,
        'horizontal': false
    }, this.chartLegend);

	return this.chartLegend;
};

/**
 * @param {*} item 
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Attc.prototype.getHeader = function (index) {
	return this.store.getAttributes(this.headers)[index];
};

/**
 * @param {*} item 
 * @returns {string}
 */
SIDE.view.ui.chart.dojo.Attc.prototype.getValue = function (item, index) {
	return this.store.getValue(item, this.getHeader(index))
};

/**
 * Returns a chart bar
 * @returns {*}
 */
SIDE.view.ui.chart.dojo.Attc.prototype.createBar = function() {
    var data = [];
	var libX= [];
	
	var instance = this;
    var gotItems = function(items, request) {
		instance.headers = items[0];		
        for (i = 0; i < items.length; i++) {
            data.push({
                'text': instance.getValue(items[i], 0),
                'y': parseInt(instance.getValue(items[i], 1)),
                'tooltip': instance.getValue(items[i], 0)
            });
			
			libX.push({
				'text': instance.getValue(items[i], 0),
				'value': i+1,
			})
        }
    };
    
    this.store.fetch({
        'onComplete': gotItems
    });
		
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
        //var anim4c = new dojox.charting.action2d.Shake(chart, 'default');
        
//        chart.render();
*/        
        this.chart = chart;
        return chart;
    } catch (e) {
        SIDE.view.ui.chart.dojo.Attc.log.error("Error : chart not generated", e);
    }
};

/**
 * Returns a chart bar
 * @returns {*}
 */
SIDE.view.ui.chart.dojo.Attc.prototype.createPie = function() {
    var data = [];
    var instance = this;
    var gotItems = function(items, request) {
		instance.headers = items[0];		
        for (i = 0; i < items.length; i++) {
            data.push({
                text: instance.getValue(items[i], 0),
                y: parseInt(instance.getValue(items[i], 1)),
                tooltip: instance.getValue(items[i], 0)
            });
        }
    };
	
    this.store.fetch({
        onComplete: gotItems
    });
	
    try {
        var chart = new dojox.charting.Chart2D(this.chartId);
        chart.setTheme(dojox.charting.themes.ThreeD)
        chart.addPlot('default', {
            'type': 'Pie',
            'font': 'normal normal 7pt Tahoma',
            'radius': 90,
            'fontColor': 'black',
            'labelOffset': -40,
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
        //chart.render();
        /*
        var legend = new dojox.charting.widget.Legend({
            'chart': chart,
            'horizontal': false
        }, this.chartLegend);
        */
        this.chart = chart;
        
        return chart;
    } catch (e) {
        SIDE.view.ui.chart.dojo.Attc.log.error("Error : chart not generated", e);
    }
};

/**
 * Returns a chart bar
 * @returns {*}
 */
SIDE.view.ui.chart.dojo.Attc.prototype.createLine = function() {
	
    var lines = {};
    var libX = [];
	
	var nbCols;
	var instance = this;
	var gotItems = function(items, request) {
		instance.headers = items[0];		
		nbCols = instance.store.getAttributes(instance.headers).length;
		for (j = 1; j < nbCols; j++) {
			//on cree un tableau correspondant a chaque colonne 
			//(une serie = une ligne de graph
			lines[j] = [];
		}
		
		for (i = 0; i < items.length; i++) {
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
                'text': instance.getValue(items[i], 0),
			});
		}
	}

	this.store.fetch({
		onComplete: gotItems
	});
	
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
		
		for (j = 1; j < nbCols; j++) {
			//on cree une serie pour chaque colonne
			//note : store._headings[j] correspond à l'entete d'une colonne (pour la legende)
			chart.addSeries(this.getHeader(j), lines[j]);
		}
		
/*		chart.render();
		
		var anim4b = new dojox.charting.action2d.Tooltip(chart, 'default');
		//var anim4c = new dojox.charting.action2d.Magnify(chart, 'default');
		
		var legend = new dojox.charting.widget.Legend({
			'chart': chart,
            'horizontal': false
		}, this.chartLegend);
		
		//chart.render();
*/		
        this.chart = chart;

		return chart;
	} catch(e) {
		SIDE.view.ui.chart.dojo.Attc.log.error("Error : chart not generated", e);
	}
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.chart.dojo.Attc.log = new log4javascript.getLogger("SIDE.view.ui.chart.dojo.Attc");