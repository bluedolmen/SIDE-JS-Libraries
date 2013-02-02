goog.provide("SIDE.model.Model");

/**
 *
 * @constructor
 */
SIDE.mode.Model = function(createFormUrl, modelName, rawViewUrlPrefix, extjsViewUrlPrefix) {
	this.createFormUrl = "/share/page/standalonecreateform";
	this.modelNamePrefix = "yamma:com_sidelabs_is_operational_yamma_";
	this.rawViewUrlPrefix = "http://localhost:8087/alfresco/service/com/bluexml/side/view/yamma_share/";
	this.extjsViewUrlPrefix = "http://localhost:8880/side-demo/components/Document/extJs/grid-with-preview.html?viewWebService=";
};

/**
 * @returns {Array}
 */
SIDE.mode.Model.prototype.getClassNames = function() {  
	return [
		"Accounting","Contact","CustomerInvoice","Document","Dossier","Entity","HCM","Invoice","Legal","Operational","Organization","Person","PointOfContact","Sales","Service","VendorInvoice","End"
	]
}

/**
 * @returns {Array}
 */
SIDE.mode.Model.prototype.getViewNames = function() {  	
	return [
		"Accounting_DataList","Contact_DataList","CustomerInvoice_DataList","Document_DataList_Main","Document_Facets_FacetMap","Dossier_DataList","Entity_DataList","HCM_DataList","Invoice_DataList_Main","Legal_DataList","Operational_DataList","Organization_DataList","Person_DataList","PointOfContact_DataList","Sales_DataList","Service_DataList","VendorInvoice_DataList","End"
	]
}

/**
 * @returns {*}
 */
SIDE.mode.Model.prototype.getForms = function() {  
	// Forms Tree
	var formChildren = [];
	var clazzes = this.getClassNames();
	for (i=0; i < clazzes.length - 1; i++) {
		var clazzName = clazzes[i];
		formChildren[i] =
			{
				text: clazzName,
				url: this.createFormUrl + "?itemId=" + this.modelNamePrefix + this.clazzName,
				id: Math.round(Math.random() * 1000000),
				leaf: 'true'
			}
	}

	return formChildren;
};

/**
 * @returns {*}
 */
SIDE.mode.Model.prototype.getViews = function() {  	
	var viewChildren = {};
	viewChildren.json = [];
	viewChildren.xml = [];
	viewChildren.extjs = [];
	
	var views = this.getViewNames();
	for (i=0; i < views.length - 1; i++) {
		var viewName = views[i];
		viewChildren.json[i] = {
			text: viewName,
			url: this.rawViewUrlPrefix + viewName + ".json",
			id: Math.round(Math.random() * 1000000),
			leaf: 'true'
		};
		
		viewChildren.xml[i] = {
			text: viewName,
			url: this.rawViewUrlPrefix + viewName + ".xml",
			id: Math.round(Math.random() * 1000000),
			leaf: 'true'
		};
		
		viewChildren.extjs[i] = {
			text: viewName,
			url: this.extjsViewUrlPrefix + this.rawViewUrlPrefix + viewName + ".json",
			id: Math.round(Math.random() * 1000000),
			leaf: 'true'
		};
	}
	
	return viewChildren;
}
