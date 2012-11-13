/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */

goog.provide("SIDE.model.Model");
goog.require("SIDE.model.data.Metadata");

/**
 * @namespace SIDE.model.Model
 * @constructor
 */
SIDE.model.Model = function(config) {
	this.createFormUrl 		= config.createFormUrl || '/share/page/standalonecreateform';
	this.searchFormUrl 		= config.searchFormUrl || '/share/page/standalonesearchform';
//	this.modelNamePrefix 	= config.modelNamePrefix || 'yamma:com_sidelabs_is_operational_yamma_';
	this.dataNsp 			= config.dataNsp || 'yamma';
	this.rawViewUrlPrefix 	= config.rawViewUrlPrefix || 'http://localhost:8087/alfresco/service/com/bluexml/side/view/yamma_share/';
	this.extjsViewUrlPrefix = config.extjsViewUrlPrefix || 'http://localhost:8880/side-demo/components/Document/extJs/grid-with-preview.html?viewWebService=';
	this.ticket 			= config.ticket;
	this.viewSuffix 		= config.suffix || "_DataList";

	this.metadata = new SIDE.model.data.Metadata({
		dataNsp: this.dataNsp,
		alfresco: SIDE.params.alfresco,
		share: SIDE.params.share,
		ticket: this.ticket
	});

};

/**
 * @returns {Array}
 */
SIDE.model.Model.prototype.getClassesNames = function(type) {
	var classes = null;
	if (type == 'dl') {
		classes = this.metadata.getDataListItems();
	} else {
		classes = this.metadata.getContentTypes();
	}
	var classNames = [];
	for (var i = 0; i < classes.length; i++) {
		classNames[i] = classes[i].name;
	}
	return classNames.sort();

}

SIDE.model.Model.prototype.getContentTypesNames = function() {
	return this.getClassesNames('ct');
}

SIDE.model.Model.prototype.getDataListItemsNames = function() {
	return this.getClassesNames('dl');
}

/**
 * Returns an array with well-formed view names.
 * From the model, views are named nsp:viewname but the generated views
 * are named viewname_DataList.format. This method simply converts model view name
 * into a real view
 * @returns {Array}
 */
SIDE.model.Model.prototype.getViewsNames = function(type) {
	var classes = null;
	if (type == 'dl') {
		classes = this.metadata.getDataListItemsNames();
	} else {
		classes = this.metadata.getContentTypes();
	}
	var classNames = null;
	for (var i = 0; i < classes.length; i++) {
		// nsp:package_package_pakage_ContentType_DataList => ContentType_DataList
		var viewName = classes[i].replace(/^.*:[a-z]*[a-zA-Z_0-9]*_?([A-Z]*[a-zA-Z0-9]*).*/,'$1');
		classNames[i] = viewName + this.viewSuffix;
	}
	return classNames;
/*
return [
		"Accounting_DataList","Contact_DataList","CustomerInvoice_DataList","Document_DataList_Main","Document_Facets_FacetMap","Dossier_DataList","Entity_DataList","HCM_DataList","Invoice_DataList_Main","Legal_DataList","Operational_DataList","Organization_DataList","Person_DataList","PointOfContact_DataList","Sales_DataList","Service_DataList","VendorInvoice_DataList","End"
	]
*/
}

SIDE.model.Model.prototype.getContentTypesViewsNames = function(type) {
	return this.getViewsNames('ct');
}

SIDE.model.Model.prototype.getDataListItemsViewsNames = function(type) {
	return this.getViewsNames('dl');
}

/**
 * Builds a tree of objects from a set of absolute class names
 * prefixed by a namespace
 * @param {*} classes
 * @returns {*}
 */
SIDE.model.Model.prototype.getFormsChildren = function(classes) {
	// Cleaner if classes are sorted alphabetically
	classes.sort();

	// All namespaces
	// Could be extracted automatically?
	// Could be a global variable?
	var namespaces = {
			"Alfresco": [
			             "act","app","blg","bpm","cm","cmis","cmiscustom","dl","emailserver","exif","fm","gd","ia",
			             "imap","imwf","inwf","lnk","mix","nt","pm","pt","rn","rule","se","st","sys","trx","usr",
			             "ver2","ver","wca","wcm","wcmwf","wf","ws","wswf"],
			"SIDE": ["bxcm","yamma","SIDECommonCRM","HCMAgent"],
			"Custom": ["K"]
	};

	var tree = {
			"Custom": {},
			"SIDE": {},
			"Alfresco": {}
	}

	for (var i = 0; i < classes.length; i++) {
		var _className = classes[i];
		var info = _className.match(/^(.*):(.*)$/);
		var ns = info[1];
		//var className = info[2];
		var className = _className;
		if (dojo.indexOf(namespaces["Alfresco"], ns) != -1) {
			tree["Alfresco"][ns] = tree["Alfresco"][ns] || Array();
			Array.push(tree["Alfresco"][ns],className);
		} else if (dojo.indexOf(namespaces["SIDE"], ns) != -1) {
			tree["SIDE"][ns] = tree["SIDE"][ns] || Array();
			Array.push(tree["SIDE"][ns],className);
		} else if (dojo.indexOf(namespaces["Custom"], ns) != -1) {
			tree["Custom"][ns] = tree["Custom"][ns] || Array();
			Array.push(tree["Custom"][ns],className);
		} else {
			tree["Custom"][ns] = tree["Custom"][ns] || Array();
			Array.push(tree["Custom"][ns],className);
		}
	}

	return tree;
}

/**
 * Builds a tree of objects from a set of absolute class names
 * prefixed by a namespace
 * @param {*} classes
 * @returns {*}
 */
SIDE.model.Model.prototype.convertToExtJSTree = function(tree, classes, formType) {
	/*
	 * Serializes in extJs
	 */

	var formUrl = null;
	if (formType == 'search') {
		formUrl = this.searchFormUrl;
	} else {
		formUrl = this.createFormUrl;
	}

	// Forms list
	// dkeys is a string array
	var getFormByNS = function(classes) {
		var children = [];
		for (var i = 0; i < classes.length; i++) {
			var className = classes[i];
			var classShortName = className.replace(/^(.*):(.*)/,'$2');
			try {
				if (SIDE.params.console.menu.formShortName == true
						&& classShortName.indexOf("_") != -1) {
					classShortName = classShortName.replace(/.*_([^_]*)/,'$1');
				}
			} catch(e) {

			}

			children[i] = {
				'text': classShortName,
				'url': formUrl + '?itemId=' + className,
				'id': Math.round(Math.random() * 1000000),
				'leaf': 'true'
			}
		}
		return children;
	}

	// Namespaces folder
	// ckeys is an object array
	var getFolderByNS = function(ckeys) {
		var children = [];
		var l2keys = Object.keys(ckeys);
		for (var j = 0; j < l2keys.length; j++) {
			children[j] = {
				'text': l2keys[j],
				'id': Math.round(Math.random() * 1000000),
				'children': getFormByNS(ckeys[l2keys[j]])
			}
		}
		return children;
	}

	var formChildren = [];
	// Main categories folder
	var l1keys = Object.keys(tree);
	for (var i = 0; i < l1keys.length; i++) {
		formChildren[i] =
		{
			'text': l1keys[i],
			'id': Math.round(Math.random() * 1000000),
			'children': getFolderByNS(tree[l1keys[i]])
		}
	}

	return formChildren;
}

/**
 * @param {*} type
 * @param {*=} formType
 * @returns {*}
 */
SIDE.model.Model.prototype.getFormsTree = function(type, formType) {
	var classes = null;
	if (type == 'dl') {
		classes = this.getDataListItemsNames();
	} else {
		classes = this.getContentTypesNames();
	}

	/*	var formChildren = [];
	for (var i=0; i < classes.length; i++) {
		var className = classes[i];
		var classShortName = className.replace(/^(.*):[a-z]?[a-zA-Z_0-9]*_([A-Z]*[a-zA-Z0-9]*)/,'$1:$2');
		formChildren[i] =
			{
				'text': classShortName,
				'url': formUrl + '?itemId=' + className,
				'id': Math.round(Math.random() * 1000000),
				'leaf': 'true'
			}
	}
	return formChildren;
*/

	var tree = this.getFormsChildren(classes);
	return this.convertToExtJSTree(tree, classes, formType);
};

SIDE.model.Model.prototype.getDataListItemsFormsTree = function() {
	return this.getFormsTree('dl');
}

SIDE.model.Model.prototype.getContentTypesFormsTree = function() {
	return this.getFormsTree('ct');
}

/**
 * @param {string} format format of the wanted result. For the moment,
 * json, xml and extjs format are defined.
 * @returns {*}
 */
SIDE.model.Model.prototype.getDataListItemsViewsTree = function(format) {
	return this.getViewsTree('dl')[format.toLowerCase()];
}

SIDE.model.Model.prototype.getContentTypesViewsTree = function(format) {
	return this.getViewsTree('ct')[format.toLowerCase()];
}

/**
 * @returns {*}
 */
SIDE.model.Model.prototype.getViewsTree = function(type) {
	var views = null;
	if (type == 'dl') {
		views = this.getDataListItemsNames();
	} else {
		views = this.getContentTypesNames();
	}

	var viewChildren = {};
	viewChildren.json = [];
	viewChildren.xml = [];
	viewChildren.extjs = [];

	for (var i=0; i < views.length; i++) {
		var viewName = views[i];
//		var viewRealName = viewName.replace(/^.*:/,'') + this.viewSuffix;
//		var viewRealName = viewName.replace(/^.*:([A-Z]*[a-zA-Z0-9]*).*$/,'$1');
		var viewRealName = viewName.replace(/^.*:[a-z]?[a-zA-Z_0-9]*_([A-Z]*[a-zA-Z0-9]*)/,'$1')
							+ '_DataList';
		viewChildren.json[i] = {
			'text': viewRealName,
			'url': this.rawViewUrlPrefix + viewRealName + ".json",
			'id': Math.round(Math.random() * 1000000),
			'leaf': 'true'
		};

		viewChildren.xml[i] = {
			'text': viewName,
			'url': this.rawViewUrlPrefix + viewRealName + ".xml",
			'id': Math.round(Math.random() * 1000000),
			'leaf': 'true'
		};

		viewChildren.extjs[i] = {
			'text': viewName,
			'url': this.extjsViewUrlPrefix + this.rawViewUrlPrefix + viewRealName + ".json",
			'id': Math.round(Math.random() * 1000000),
			'leaf': 'true'
		};
	}

	return viewChildren;
}

