/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.view.ui.AlfrescoTreeLoader");

/**
 * @namespace
 */
SIDE.view.ui.AlfrescoTreeLoader = {
}

/**
 * @param {*} colModelConfig
 * @returns {string}
 * @static
 */
SIDE.view.ui.AlfrescoTreeLoader.getInstance = 
	Ext.extend(Ext.tree.TreeLoader, {
		'processResponse' : function(response, node, callback) {
			try {
			    var entries = response.responseXML.getElementsByTagName('entry');
			    node.beginUpdate();
			    for (var i = 0; i < entries.length; i++){
					var child = new Object();
			    	
			    	var title = entries[i].getElementsByTagName('title');
					if (title.length == 0) {
						title = entries[i].getElementsByTagName('cmis:title');
					}
			    	child['text'] = title[0].textContent;
			    	
			    	child['leaf'] = SIDE.utils.CMIS.getProperty(entries[i],'cmis:baseTypeId') != 'cmis:folder';
			    	child['id'] = SIDE.utils.CMIS.getProperty(entries[i],'cmis:objectId');
	
					var icon = entries[i].getElementsByTagName('icon');
					if (icon.length == 0) {
						icon = entries[i].getElementsByTagName('alf:icon');
					}
			    	child['icon'] = icon[0].textContent;
			    	
			        var n = this.createNode(child);
			        if (n) {
			            node.appendChild(n);
			        }
			    }
			    
			    node.endUpdate();
			    if (typeof callback == "function"){
			        callback(this, node);
			    }
			    
			} catch(e) {
			    this.handleFailure(response);
			}    
		}
	});