
	// XForms
	// Go ahead and create the TreePanel now so that we can use it below
	CVHost = 'http://localhost:8880/xforms';
	CVParam = '&CSS=/xforms/projects/custom/CV/styles/main.css'
				+ '&baseFolder=/Users/bluexml/opt/local/apache-tomcat/apache-tomcat-7.0.2/webapps/xforms/projects/generated/CV';

	SubscriptionHost = 'http://localhost:8880/xforms';
	SubscriptionParam = '&CSS=/xforms/projects/custom/Subscription/styles/main.css'
				+ '&baseFolder=/Users/bluexml/opt/local/apache-tomcat/apache-tomcat-7.0.2/webapps/xforms/projects/generated/Subscription';

	WorkflowHost = 'http://localhost:8080';
	WorkflowParam = '';

	// Forms Tree
	var createFormUrl = "/share/page/standalonecreateform";
	var modelName = "yamma:com_sidelabs_is_operational_yamma_";
	var clazzes = [
		"Accounting","Contact","CustomerInvoice","Document","Dossier","Entity","HCM","Invoice","Legal","Operational","Organization","Person","PointOfContact","Sales","Service","VendorInvoice","End"
	]
	var formChildren = [];
	for (i=0; i < clazzes.length - 1; i++) {
		var clazzName = clazzes[i];
		formChildren[i] =
			{
				text: clazzName,
				url: createFormUrl + "?itemId=" + modelName + clazzName,
				id: Math.round(Math.random() * 1000000),
				leaf: 'true'
			}
	}
	
	// Views Tree
	var views = [
		"Accounting_DataList","Contact_DataList","CustomerInvoice_DataList","Document_DataList_Main","Document_Facets_FacetMap","Dossier_DataList","Entity_DataList","HCM_DataList","Invoice_DataList_Main","Legal_DataList","Operational_DataList","Organization_DataList","Person_DataList","PointOfContact_DataList","Sales_DataList","Service_DataList","VendorInvoice_DataList","End"
	]
	rawViewUrlPrefix = "http://localhost:8087/alfresco/service/com/bluexml/side/view/yamma_share/";
	//extjsViewUrlPrefix = "http://localhost:8880/side-demo/components/Document/extJs/json-simple-grid-standalone.html?viewWebService=";
	extjsViewUrlPrefix = "http://localhost:8880/side-demo/components/Document/extJs/grid-with-preview.html?viewWebService=";

	var viewChildren = {};
	viewChildren.json = [];
	viewChildren.xml = [];
	viewChildren.extjs = [];
	
	for (i=0; i < views.length - 1; i++) {
		var viewName = views[i];
		viewChildren.json[i] =
			{
				text: viewName,
				url: rawViewUrlPrefix + viewName + ".json",
				id: Math.round(Math.random() * 1000000),
				leaf: 'true'
			}
		viewChildren.xml[i] =
			{
				text: viewName,
				url: rawViewUrlPrefix + viewName + ".xml",
				id: Math.round(Math.random() * 1000000),
				leaf: 'true'
			},
		viewChildren.extjs[i] =
			{
				text: viewName,
				url: extjsViewUrlPrefix + rawViewUrlPrefix + viewName + ".json",
				id: Math.round(Math.random() * 1000000),
				leaf: 'true'
			}
	}
