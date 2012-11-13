/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */
 
goog.provide("SIDE.view.ui.desktop.SideWindow");

goog.require("SIDE.view.ui.desktop.SimpleIFrame");
goog.require("SIDE.view.ui.SimpleGrid");

/**
 * @constructor
 */
SIDE.view.ui.desktop.SideWindow = function(config) {
    this.id =  config.id;
    this.text = config.text;
    this.iconCls = config.iconCls;
    this.title = config.title;
    this.width = config.width;
    this.height = config.height;
    this.type = config.type;

	var sideComponent;

	//alert("Type = " + this.type);
	if (this.type == "iframe") {
		sideComponent = new SIDE.view.ui.desktop.SimpleIFrame(config);
	} else {
		sideComponent = new SIDE.view.ui.SimpleGrid(config);
	}

    this.sideComponent = sideComponent;
};

/**
 * @returns {*}
 */
SIDE.view.ui.desktop.SideWindow.prototype.createComponent = function() {
    return new SIDE.view.ui.SimpleGrid(this);
};

/**
 * @returns {*}
 */
SIDE.view.ui.desktop.SideWindow.prototype.getWindow = function() {
    var id = this.id;
    var text = this.text;
    var iconCls = this.iconCls;
    var title = this.title;
    var width= this.width;
    var height = this.height;
	var sideComponent = this.sideComponent;

	return {
	    id: id,
	    init: function() {
	        this.launcher = {
	            text: text,
	            iconCls: iconCls,
	            handler : this.createWindow,
	            scope: this
	        }
	    },
	
	    createWindow: function() {
	        var desktop = this.app.getDesktop();
	        var win = desktop.getWindow(id);
	        if (!win) {
	            win = desktop.createWindow({
	                id: id,
	                title: title,
	                width: width,
	                height: height,
	                iconCls: iconCls,
	                shim:false,
	                animCollapse:false,
	                constrainHeader:true,
	
	                layout: 'fit',
	                items: sideComponent.getContent()
	            });
	        }
	        win.show();
	    }
	}
};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.desktop.SideWindow.log = new log4javascript.getLogger("SIDE.view.ui.desktop.SideWindow");