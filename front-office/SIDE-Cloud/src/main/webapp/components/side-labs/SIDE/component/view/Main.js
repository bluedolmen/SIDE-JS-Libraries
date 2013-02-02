dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.form.MultiSelect");

/**
 *   Configuration pour un Select type "multiple"   
 **/
var configSelectLarge = {
		size: 5,
		multiple: false,
		data: datas,
		searchAttr: "id",
		name: "mySelectLarge",
		id: "myIdLarge",
		style: "width:300px"
}

/** 
 * Configuration pour un Select type "combobox" 
 **/
var configSelectSimple = {
		size: 1,
		multiple: false,
		data: datas,
		searchAttr: "url",
		name: "mySelectSimple",
		id: "myIdSimple",
}

/**
 * Fonction de création des listes
 **/
function makeList(htmlId){
	//Select type "combo box"
	var sel = dojo.byId(htmlId);
	dojo.style(sel, 'display', 'none');
	var monSelectSimple = new ImInfo.Select(configSelectSimple);
	dojo.place(monSelectSimple.createSelect(), sel, 'after');
	
	//Select type "multiple"
	var monSelectLarge = new ImInfo.Select(configSelectLarge);
	dojo.place(monSelectLarge.createSelect(), sel, 'after');
}

//dojo.addOnLoad(function() {
//});


//    var datas; // Already defined in data.json
    
function getData() {
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
