goog.provide('SIDE.component.view.Select');

dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.form.MultiSelect");


/**
 *   Select Many configuration   
var configSelectLarge = {
		size: 5,
		multiple: false,
		data: datas,
		searchAttr: "id",
		name: "mySelectLarge",
		id: "myIdLarge",
		style: "width:300px"
}
 **/

/** 
 * SelectOne configuration
var configSelectSimple = {
		size: 1,
		multiple: false,
		data: datas,
		searchAttr: "url",
		name: "mySelectSimple",
		id: "myIdSimple",
}
 **/

/**
 * Fonction de création des listes
 **/
SIDE.component.view.Select.prototype.make = function (){
	//Select type "combo box"
	var sel = dojo.byId(htmlId);
	dojo.style(sel, 'display', 'none');
	
	var monSelectSimple = new ImInfo.Select(config);
	dojo.place(monSelectSimple.createSelect(), sel, 'after');
	
	//Select type "multiple"
	var monSelectLarge = new ImInfo.Select(configSelectLarge);
	dojo.place(monSelectLarge.createSelect(), sel, 'after');
}

function handleData(data) {
    datas = data;
    datas.items = datas.records;
    
    var stateStore = new dojo.data.ItemFileReadStore({
        //url: "../../_static/js//dijit/tests/_data/states.json"
		data: datas
    });
  
    var filteringSelect = new dijit.form.MultiSelect({
            id: "stateSelect",
            name: "state",
            value: "Valeur ˆ sŽlectionner...",
            store: stateStore,
            searchAttr: "id",
            multiple: false
        },
        "template_x002e_formPortlet_x002e_standalonecreateform_prop_cm_name"
	);
}

SIDE.component.view.Select = function(config){
	this.htmlId = config.htmlId;
	this.size = config.size;
	this.multiple = config.multiple;
	this.data = config.data;
	this.data.items = config.data.records;
	this.url = config.url || null;
	this.searchAttr = config.searchAttr;
	this.options = null;
	this.name = config.name;
	this.id = config.id;
	this.style = config.style;

	if (this.data == null) {
		if (this.url != null) {
		    var xhrArgs = {
	            url: "http://localhost:8080/alfresco/service/com/bluexml/side/view/a3pm/TexteOfficiel_DataList",
	            handleAs: "json",
	            load: handleData,
	            error: function(error) {
	                targetNode.innerHTML = "An unexpected error occurred: " + error;
	            },
	            timeout: 5000
	        }

	        //Call the asynchronous xhrGet
	        var deferred = dojo.xhrGet(xhrArgs);			
		} else {
			SIDE.component.view.Select.log('Error : Data and Url are both null.');
		}
	}
}

SIDE.component.view.Select.prototype.createOptions = function(select){
	var records = this.data.items;
	for(var i=0; i < records.length; i++){
		 var c = dojo.doc.createElement('option');
		 c.innerHTML = records[i][this.searchAttr];
		 c.value = i;
		 select.appendChild(c);
	 }
}

SIDE.component.view.Select.prototype.create = function(){
	var select = dojo.doc.createElement('select');
	if(this.size){
		select.setAttribute("size", this.size);
	}
	if(this.multiple){
		select.setAttribute("multiple", true);
	}
	if(this.name){
		select.setAttribute("name", this.name);
	}
	if(this.id){
		select.setAttribute("id", this.id);
	}
	if(this.style){
		select.setAttribute("style", this.style);
	}
	this.createOptions(select);
	
	return select;
}

/**
 * @type {*}
 * @static
 */
SIDE.component.view.Select.log = new log4javascript.getLogger("SIDE.component.view.Select");
