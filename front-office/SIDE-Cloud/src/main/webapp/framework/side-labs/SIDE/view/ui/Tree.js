/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.view.ui.Tree');

goog.require('SIDE.Util');
goog.require('SIDE.utils.CMIS');

/**
 * @param {*} config
 * @constructor
 */
SIDE.view.ui.Tree = function(config) {
	//this.config = config;
	this.url = config.pUrl; // || 'http://localhost:8087/alfresco/service/cmis/p?alf_ticket=' + config.ticket;
	this.iurl = config.iUrl; // || 'http://localhost:8087/alfresco/service/cmis';
	this.ticket = config.ticket;
	this.id = config.id || 'repository-explorer';
	
	this.flex = config.flex || 1;
	this.root = config.rootText || 'Repository';
	this.height = config.height || '200';
	this.autoScroll = config.autoScroll == null ? true : false;
	this.rootVisible = config.rootVisible == null ? true : false;
	this.useArrows = config.useArrows || false;
	this.expanded = config.expanded || false;
	this.border = config.border || false;

	this.channel = config.channel || '/repository/uuid';		
};

/**
 * @param {string} message
 * @returns
 */
SIDE.view.ui.Tree.prototype.debug = function(message) {
	try {
		SIDE.view.ui.Tree.log.debug(message);
		SIDE.view.ui.Tree.log.debug("=> Url : ", this.url);
		SIDE.view.ui.Tree.log.debug("=> Ticket : ", this.ticket);
		SIDE.view.ui.Tree.log.debug("=> Root text : ", this.rootText);
	} catch (e) {};
};

/**
 * @param {*} _path
 * @param {string} ticket
 * @returns
 */
SIDE.view.ui.Tree.prototype.getDataUrl = function(_path, ticket) {
	var dataUrl = null;
	var path = _path || "";
		if (path.indexOf("workspace://SpacesStore") != -1) {
			// path is an uuid
			dataUrl = this.getDataUrlById(path, ticket);
		} else {
			// path is normally a true path
			dataUrl = this.getDataUrlByPath(path, ticket);
		}
	SIDE.view.ui.Tree.log.debug("SIDE.view.ui.Tree.getDataUrl() => ", dataUrl);
	return SIDE.Util.addProxyService(dataUrl,"text/xml");
};

/**
 * @param {*} path
 * @param {string} ticket
 * @param {string=} format
 * @returns {string}
 */
SIDE.view.ui.Tree.prototype.getDataUrlById = function(path, ticket, format) {
	var dataUrl = this.iurl + "/i/"
					+ path.split("/")[3]
					+ "/children?alf_ticket=" + ticket;

	if (format == 'json') {
		dataUrl += "&format=json";
	}
	
	return dataUrl;
}

/**
 * @param {*} path
 * @param {string} ticket
 * @param {string=} format
 * @returns {string}
 */
SIDE.view.ui.Tree.prototype.getDataUrlByPath = function(path, ticket, format) {
	var dataUrl = this.iurl + "/p"
					+ path
					+ "/children?alf_ticket=" + ticket;
	
	if (format == 'json') {
		dataUrl += "&format=json";
	}

	return dataUrl;
};

/**
 * @param {*} uuid
 * @param {string} ticket
 * @returns
 */
SIDE.view.ui.Tree.prototype.update = function(uuid, ticket) {
	var instance = this;
	
	this.debug("Update Tree");
	
	try {
		SIDE.view.ui.Tree.log.debug("SIDE.view.ui.Tree : ", instance.getDataUrl(uuid, this.ticket))
	} catch (e) {};
	
	var config = {
		'dataUrl': instance.getDataUrl(uuid, instance.ticket),
		'requestMethod': 'get'
	}
//	var myLoader = new SIDE.view.ui.AlfrescoTreeLoader.getInstance(config);

	var myTreeLoader = Ext.extend(Ext.tree.TreeLoader, {
		'processResponse' : function(response, node, callback) {
			try {

				// Not used for the moment, but this kind of approach, used in SIDE.data.CMISStore
				// would avoid the use of CMIS.getProperty a few lines later and may be replaced
				// by more intuitive programming
				//var json = xml2json.parser(response.responseText); //Please notice that we use responseXML here which is DOMDocument object
				var store = new SIDE.data.CMISStore({
					data: response.responseText,
					prefix: '',					// we want properties at the top level
					value: true				// we want to directly store values not objects
				});

			    var entries = store.getData();
			    node.beginUpdate();
			    for (var i = 0; i < entries.length; i++){
					var child = new Object();
			    	
			    	var title = entries[i]['title'];
					if (title == '') {
						title = entries[i]['prop_cmis_title'];
					}
			    	child['text'] = title;
			    	
			    	child['leaf'] = entries[i]['prop_cmis_baseTypeId'] != 'cmis:folder';
			    	//child['id'] = SIDE.utils.CMIS.getProperty(entries[i],'cmis:objectId');
			    	//child['id'] = SIDE.utils.CMIS.getProperty(entries[i],'cmis:displayPath');
			    	child['id'] = entries[i]['prop_cmis_objectId'];
			    	child['path'] = entries[i]['prop_cmis_path'];
	
					var icon = entries[i]['prop_icon'];
					if (icon == '') {
						icon = entries[i]['prop_alf_icon'];
					}
			    	child['icon'] = icon;
			    	
			        var n = this['createNode'](child);
			        /*
			        n.on('expand', function (a, b, c) {
				    	alert('test');
				    });
				    */
				    
			        if (n) {
			            node['appendChild'](n);
			        }
			    }
			    
			    node.endUpdate();
			    if (typeof callback == "function"){
			        callback(this, node);
			    }
			    
			} catch(e) {
			    this['handleFailure'](response);
			}    
		}
	});
	
	var myLoader = new myTreeLoader(config);

	myLoader.on('beforeload', function(treeLoader, node) {
		var dataUrl = instance.getDataUrl(node['id'], instance.ticket);
		try {
			SIDE.view.ui.Tree.log.debug("SIDE.view.ui.Tree : onBeforeLoad", dataUrl)
		} catch (e) {};

		if (!node.isRoot) {
        	treeLoader['dataUrl'] = dataUrl;
        }
    }, this);

    var tree = new Ext.tree.TreePanel({
		'flex':			this.flex,
		'loader': 		myLoader,
		'root': 		this.root,
		'autoScroll': 	this.autoScroll,
        'height': 		this.height,
        'rootVisible':  this.rootVisible,
        'useArrows':	this.useArrows,
        'border': 		this.border
    });
    
    tree.on('click', function (node) {
       	if (node != null) {
       		if (node.leaf) {
       			// It's a file
	           	SIDE.pattern.Observer.publish(instance.channel, [{"value": node}]);
           	} else {
           		SIDE.pattern.Observer.publish(instance.channel + '/folder', [{"value": node}]);
           	}
        }
    });
	
    tree.render(this.id);
/*
    if (this.expanded === true) {
		tree.getRootNode().expand();
	}
*/
	SIDE.view.ui.Tree.log.debug("Tree Updated");
};

/**
 * @returns
 */
SIDE.view.ui.Tree.prototype.load = function() {
	this.debug("load()");

	var instance = this;

	var xhrArgs = {
		'url': instance.url,
		'mimeType': "text/xml",
//		'mimeType': "application/json",
	   	'success': function (result, request ) {
   			SIDE.view.ui.Tree.log.debug("Load Tree: success");
	   		instance.update(SIDE.utils.CMIS.getProperty(result.responseXML, 'cmis:objectId'), instance.ticket);
	   	},
	   	'failure': function (params) {
   			SIDE.view.ui.Tree.log.error("Load Tree: failure");
	   	}
	};
	
	SIDE.Util.request(xhrArgs);

	/*
	var xhrArgs = {
			  'url': instance.url,
//			  			+ '?alf_ticket=' + this.ticket,
			  'content': {},
			  'callbackParamName': 'alf_callback'
			};
					
	this.jsonp = SIDE.Util.getJsonP(xhrArgs).then(function (data) {
		SIDE.view.ui.Tree.log.debug("Load Tree: success");
		var root = data.children[0]['node-uuid'];
//		var root = SIDE.utils.CMIS.getProperty(result.responseXML, 'cmis:objectId');
   		instance.update(root, instance.ticket);
   		return data;
	});
	*/

};

/**
 * @type {*}
 * @static
 */
SIDE.view.ui.Tree.log = new log4javascript.getLogger("SIDE.view.ui.Tree");