/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */

	goog.require('SIDE.pattern.Observer');
	goog.require('SIDE.security.Authenticator');
	goog.require('SIDE.model.Model');

	SIDE.params = SIDE.params || {
		alfresco: "http://localhost:8080/alfresco",
		share: "http://localhost:8080/share"
	}

	SIDE.params.console = {
			menu: {
				formShortName: true
			}
	}

	var dataTree = 'index-tree.json';

	var treePanel;
//	var metadata;
	var detailEl;

	SIDE.pattern.Observer.subscribe("/type/id", function(data) {
		var n = data;
	    var extension = new Ext.ux.ManagedIFrame.Panel({
		    'title': 		n.text,
		    'id': 			n.id,
		    'closable': 	true,
		    'layout': 		'fit',
	        'defaultSrc': 	n.attributes.url,
		    'bodyStyle': 	'padding:25px',
		    'autoScroll': 	true
	    });

	    Ext.getCmp('tab-panel').add(extension);
		Ext.getCmp('tab-panel').activate(extension);
	});

	SIDE.pattern.Observer.subscribe("/type/id", function(data) {
		var n = data;
		var url = n.attributes.url;

		document.getElementById('embedIframe-input').setAttribute(
			"value",
			'<div id="widgetIframe"><iframe width="100%" height="350" src="' + url + '" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"></iframe></div>'
		);

		document.getElementById('directLink-input').setAttribute("value", url);
		document.getElementById('directLink-href').setAttribute("href", url);

		var detailEl = Ext.getCmp('details-panel');
		detailEl.update(Ext.getDom('details').innerHTML);
	});

Ext.onReady(function() {
/*
	SIDE.params = SIDE.params || {};
	SIDE.params.alfresco = 'http://localhost:8080/alfresco';
	SIDE.params.share = 'http://localhost:8080/share';
	SIDE.params.mainView = SIDE.params.alfresco + '/service/com/bluexml/side/view/K/Ouvrage_DataList.json',
*/
	SIDE.pattern.Observer.subscribe("/authenticate/ticket", function (data) {
		//	var dataNsp = 'yamma';
		//	var viewNsp = 'yamma_share';

		/*
		 * Data namespace. It could be have more than one namespaces
		 * Namespaces used for content types.
		 */
		var dataNsp = SIDE.params.dataNsp;

		/*
		 * View namespaces. Idem.
		 * Namespaces used for views.
		 */
		var viewNsp = SIDE.params.viewNsp;

		var metadata = new SIDE.model.Model({
			dataNsp: dataNsp,
			createFormUrl: 		SIDE.params.share + '/page/standalonecreateform',
			searchFormUrl: 		SIDE.params.share + '/page/standalonesearchform',
			//modelName: 			'yamma:com_sidelabs_is_operational_yamma_',
			rawViewUrlPrefix: 	SIDE.params.alfresco + '/service/com/bluexml/side/view/' + viewNsp + '/',
//			extjsViewUrlPrefix: 'http://localhost:8080/side-demo/components/Document/extJs/grid-with-preview.jsp?viewWebService=',
//			extjsViewUrlPrefix: '/side-demo/components/Document/extJs/grid-with-preview.jsp?viewWebService=',
//			extjsViewUrlPrefix: 'http://service.bluexml.com:8880/grid-with-preview/index.jsp?alfresco=http://localhost:8080/alfresco&share=http://localhost:8080/share&user=admin&password=admin&mainSIDEView=http://localhost:8080/alfresco/service/com/bluexml/side/view/K/',
			extjsViewUrlPrefix: SIDE.params.viewService + '?'
								+ 'alfresco=' + SIDE.params.alfresco
								+ '&share=' + SIDE.params.share
								+ '&user=' + SIDE.params.user
								+ '&password=' + SIDE.params.password
								+ '&mainSIDEView=',
			ticket: data.value
		});

		dojo.when(metadata.metadata.jsonp, function(data) {
			External = {};
			External.formsCT = metadata.getFormsTree('ct');
			External.formsDL = metadata.getFormsTree('dl');
			External.formsSearchCT = metadata.getFormsTree('ct', 'search');
			External.formsSearchDL = metadata.getFormsTree('dl', 'search');
			External.viewsJson = metadata.getViewsTree('json').json;
			External.viewsXml = metadata.getViewsTree('xml').xml;
			External.viewsExtJs = metadata.getViewsTree('extJs').extjs;

			initTree();
			makeLayout();
		});
	});

	var url = SIDE.Util.getScriptParameter();
	var key = url.replace(/.*=(.*)/,'$1');
	var hash = SIDE.Util.getHash(SIDE.Util.getHost(url));
	if (key != '' && key.length == 40 && hash.indexOf(key) > -1) {
//		SIDE.params.init();
		SIDE.params.authenticate();
	} else {
		alert('Your key is invalid. Go to http://www.side-labs.org and ask for a key. It\'s free :-)')
	}
 });
