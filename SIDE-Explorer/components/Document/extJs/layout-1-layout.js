/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */

/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */

 
//Ext.BLANK_IMAGE_URL = './ext/resources/images/default/s.gif';
 
Ext.onReady(function() {
 
    Ext.QuickTips.init();
     
	var regions = {
	 	north: {
			region:'north'
			//,id: 'component'
			//,html: '<div id="component"></div><div id="preview"></div>'
			,height:100
			,border:false
			,bodyStyle:'background-color:#f8f8f8;'
			,title:'North'
			,collapsible:true
			,collapseMode:'mini'
			,split: true
		},
		west: {
			region:'west'
//			,id: 'repository-explorer'
			,width:200
			,border:false
			,autoScroll:true
			,title:'West'
			,bodyStyle:'padding:5px;font-size:11px;background-color:#f4f4f4;'
			//,html:'<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0"  src="tree-with-preview.jsp?viewWebService=http://localhost:8087/alfresco/service/com/bluexml/side/view/yamma_share/Person_DataList.json"></iframe>' 
			,html: '<div id="repository-explorer"></div>'
			,collapsible:true
			,split:true
			//,autoLoad: 'tree-with-preview.jsp?viewWebService=http://localhost:8087/alfresco/service/com/bluexml/side/view/yamma_share/Person_DataList.json'
			,collapseMode:'mini'
		},
		south: {
			 region:'south'
			,height:100
			,html:'South'
			,border:false
			,title:'South'
			,collapsible:true
			,collapseMode:'mini'
			,split: true 
		},
		east: {
			 region:'east'
			//,id: 'preview'
			,width:200
			//,html:'East'
			,border:true
			,bodyStyle:'background-color:#f4f4f4;'
			,title:'East'
			,collapsible:true
			,collapseMode:'mini'
			,split: true 
		},
		center: {
			region:'center'
			,html: '<div id="grid"></div><div id="preview"></div><div id="previewPDF"></div>'
//			,html: '<div id="grid"></div><div id="start-div"><div id="preview"></div><div id="previewPDF"></div></div>'
			,border:false
			,bodyStyle:'background-color:#f0f0f0;'
			,title:'Center'
			,split: true
		}
	}
		
    var viewport = new Ext.Viewport({
         id:'simplevp'
        ,layout:'border'
		,border:false
		,items:[
			//regions.north,
			regions.west
			//,regions.south
			,regions.east
			,regions.center
		]
    });
});
 