		dojo.require("dijit.layout.BorderContainer");
		dojo.require("dijit.layout.TabContainer");
		dojo.require("dijit.layout.AccordionContainer");
		dojo.require("dijit.layout.ContentPane");

//		dojo.require("dojo.json.query");

    	var test = {
    		obs:function(data) {
	    		alert('Data = ' + data.value);
    		}	    	
    	}

		var data = 
		{
  "aspects" :
	[ "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Referenceable",
      "{http://www.alfresco.org/model/system/1.0}referenceable",
      "{http://www.alfresco.org/model/content/1.0}thumbnailed",
      "{http://www.alfresco.org/model/content/1.0}titled",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Event",
      "{http://www.alfresco.org/model/content/1.0}auditable",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Titleable",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Assignable",
      "{http://www.alfresco.org/model/content/1.0}author",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Classable",
      "{http://www.alfresco.org/model/content/1.0}versionable"
    ],
  "mimetype" : "application/pdf",
  "nodeRef" : "workspace://SpacesStore/8762fd8b-9cea-4848-9f89-ffca2c880cdb",
  "properties" : {
	  "{http://www.alfresco.org/model/content/1.0}author" : "WAS",
      "{http://www.alfresco.org/model/content/1.0}autoVersion" : false,
      "{http://www.alfresco.org/model/content/1.0}autoVersionOnUpdateProps" : true,
      "{http://www.alfresco.org/model/content/1.0}automaticUpdate" : true,
      "{http://www.alfresco.org/model/content/1.0}content" : "contentUrl=store://2011/1/20/12/27/ab7ff26f-b743-4c7a-8a31-1d7da37df335.bin|mimetype=application/pdf|size=20683|encoding=utf-8|locale=fr_",
      "{http://www.alfresco.org/model/content/1.0}contentType" : "yamma:com_sidelabs_is_operational_yamma_Document",
      "{http://www.alfresco.org/model/content/1.0}created" : "Thu Jan 20 12:27:36 CET 2011",
      "{http://www.alfresco.org/model/content/1.0}creator" : "admin",
      "{http://www.alfresco.org/model/content/1.0}initialVersion" : false,
      "{http://www.alfresco.org/model/content/1.0}modified" : "Fri Jan 21 12:01:07 CET 2011",
      "{http://www.alfresco.org/model/content/1.0}modifier" : "admin",
      "{http://www.alfresco.org/model/content/1.0}name" : "Adobe Invoice No. 0022997519.pdf",
      "{http://www.alfresco.org/model/content/1.0}title" : "Adobe Invoice No. 0022997519.pdf",
      "{http://www.alfresco.org/model/system/1.0}node-dbid" : 521,
      "{http://www.alfresco.org/model/system/1.0}node-uuid" : "8762fd8b-9cea-4848-9f89-ffca2c880cdb",
      "{http://www.alfresco.org/model/system/1.0}store-identifier" : "SpacesStore",
      "{http://www.alfresco.org/model/system/1.0}store-protocol" : "workspace",
      "{http://www.bluexml.com/model/content/yamma/1.0}cc" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Classable_categories" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Classable_tags" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Document_author" : "jck",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Document_comments" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Document_digitizationDate" : "Thu Jan 20 12:00:00 CET 2011",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Document_name" : "Invoice Adobe 3",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Event_dateTime" : "Thu Jan 20 12:00:00 CET 2011",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Event_dateTimeForPerson" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Event_dateTimeInService" : "Thu Jan 20 00:00:00 CET 2011",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Event_eventType" : "Incoming",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Referenceable_refId" : "001",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Titleable_description" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Titleable_title" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}comment" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}confidentiality" : "Public",
      "{http://www.bluexml.com/model/content/yamma/1.0}date" : "Thu Jan 20 00:00:00 CET 2011",
      "{http://www.bluexml.com/model/content/yamma/1.0}initialResponsible" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}responsible" : "",
      "{http://www.bluexml.com/model/content/yamma/1.0}to2" : ""
    },
  "type" : "{http://www.bluexml.com/model/content/yamma/1.0}com_sidelabs_is_operational_yamma_Document"
}

		dojo.addOnLoad(function(){
			console.log("document ready!");
			metadata = new Metadata();
	        var instances = metadata.getInstances(data.properties);
			aRender = new Render();
	        aRender.render(data.properties, instances, "result");
		});
