/**
 * Copyright (C) 2005-2008 BlueXML Software Limited.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

 */
function Render() {
	this.debug("SIDE_Layout_Render()");
}

Render.prototype.debug = function(message) {
	if (Render.log.isDebugEnabled()) {
		Render.log.debug(message);
	}
}

Render.log = new log4javascript.getLogger("SIDE.Layout.Render");

Render.prototype.render = function(data, instances, id) {
		var names = {
			"{http://www.bluexml.com/model/content/yamma/1.0}": "YaMma",
			"{http://www.alfresco.org/model/content/1.0}": "Alfresco - content",
			"{http://www.alfresco.org/model/system/1.0}": "Alfresco - system"
		}
		
		var families = {
			"SIDE": {
				"{http://www.bluexml.com/model/content/yamma/1.0}": instances["{http://www.bluexml.com/model/content/yamma/1.0}"]
			},
			"Alfresco": {
				"{http://www.alfresco.org/model/content/1.0}": instances["{http://www.alfresco.org/model/content/1.0}"],
				"{http://www.alfresco.org/model/system/1.0}": instances["{http://www.alfresco.org/model/system/1.0}"]
			}
		}
		
		// Level 0
		var level0 = new Array();
		var level1 = new Array();
		var level2 = new Array();

		var m = 0;		
		for (var family in families) {
			level0[m] = this.createContainer(family, "accordion");
		
			var i = 0;		
			var createContainer = families[family].length > 1;
			for (var qname in families[family]) {
				var j = 0;
				var level2 = new Array();
				for (var clazz in instances[qname]) {
					var content = "";
					level2[j] = this.create("ContentPane", clazz, "accordion");
					for (var attribute in instances[qname][clazz]) {
						content += this.createItem(attribute, instances[qname][clazz][attribute]);			
					}
					content = "<ul>" + content + "</ul>";
					level2[j].setContent(content);
					
					if (createContainer) {
						level1[i] = this.create("Container", names[qname], "accordion");
						level1[i].addChild(level2[j]);
					} else {
						level0[m].addChild(level2[j]);				
					}
					
					j++;
				};
				i++;
			};
			m++;
		};				

		// Create main container
		var root = this.createContainer("Main", "tab");
		Render.log.debug(root);

		for (i = 0; i < level0.length; i++) {
			root.addChild(level0[i]);
		}

		// Create top wodget (BorderContainer)
		var bc = new dijit.layout.BorderContainer({style: "border: none; height: 400px; width: 95%;"});
		bc.addChild(root);
		dojo.query(".loading").style("display","none");
		dojo.byId("metadata-core").appendChild(bc.domNode);
//		dojo.byId("result").appendChild(bc.domNode);
		bc.startup();

}
	
Render.prototype.createItem = function(item, value) {
	var separator = ":";
	var rawAttribute = this.getAttributeFromQName(item);
	var attribute = rawAttribute.addSpaceBeforeCapital();
	var label = attribute.length <= 12 ? attribute.capitalize() : attribute.capitalize().substring(0,12) + ".";
	value += "";
	var val = value.length <= 40 ? value.capitalize() : value.capitalize().substring(0,40) + "...";
	
	return '<li>'
			+ '<div title="' + attribute.capitalize() + '" class="attribute label">' + label + '</div>'
			+ '<div class="sep">' + separator + '</div>'				
			+ '<div title="' + value + '" class="value">' + val + '</div>'
			+ "</li>"; 
}

Render.prototype.create = function(type, title, layout, contents) {
	if("ContentPane" == type) {
		return this.createContentPane(title, layout, contents);
	} else {
		return this.createContainer(title, layout, contents);
	}
}

Render.prototype.createContainer = function(title, layout, contents) {
	var container;
	var config = {
		title: title,
		region: "center"
	}
	
	if ("tab" == layout) {
		container = new dijit.layout.TabContainer(config);
	} else {
		container = new dijit.layout.AccordionContainer(config);
	}

	if (contents) {
		for(i = 1; i < contents.length; i++) {
			container.addChild(contents[i]);
		}
		Render.log.debug(contents);
	}
	return container;
}
	
Render.prototype.createContentPane = function(title, layout, contents) {
	var config = {
		title: title,
		region: "center"
	}
	
	return new dijit.layout.ContentPane(config);
}
	
Render.prototype.getAttributeFromQName = function(item) {
	var re = new RegExp("([^}]*)$");	
	var m = re.exec(item);
	if (m == null) {
		return "";
	} else {
		return m[0];
	}
}	
