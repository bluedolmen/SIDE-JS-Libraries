/*!
 * SIDE Js Library 3.2.1
 * Copyright(c) 2006-2010 BlueXML SARL
 * GPL v3
 * http://www.side-labs.org/license
 */

/*
 * Example windows
 */

function SideWindow(config) {
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
		sideComponent = new SimpleIFrame(config);
	} else {
		sideComponent = new SimpleGrid(config);
	}

    this.sideComponent = sideComponent;
}

SideWindow.prototype.createComponent = function() {
    return new SimpleGrid(this);
}

SideWindow.prototype.getWindow = function() {
    var id = this.id;
    var text = this.text;
    var iconCls = this.iconCls;
    var title = this.title;
    var width= this.width;
    var height = this.height;
	var sideComponent = this.sideComponent;

	return {
	    id: id,
	    init : function() {
	        this.launcher = {
	            text: text,
	            iconCls: iconCls,
	            handler : this.createWindow,
	            scope: this
	        }
	    },
	
	    createWindow : function() {
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

