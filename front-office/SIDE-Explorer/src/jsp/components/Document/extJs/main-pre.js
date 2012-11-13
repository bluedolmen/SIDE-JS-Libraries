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

	goog.require('SIDE.Util');
	goog.require('SIDE.view.ui.FlashPreview');
	goog.require('SIDE.view.ui.PDFPreview');

	var component = {};
	//$.ajax({type: "HEAD", url: 'http://www.side-labs.com/stats?' + window.href });
	//$.ajax({type: "HEAD", url: 'http://www.side-labs.com:8080/stats?' + window.location });

	var aView;
	var views = {};
	var attachmentsView;
	var initializedTabs = {};
	var ticket;

	SIDE.params = SIDE.params || {};
	SIDE.params.init = function() {
		/*
		 * It's not possible to define directly default values otherwise
		 * Closure Compiler produces a code which doesn't ask for values
		 */
		if (SIDE.Util.getParam('login') != 'default') {
			SIDE.params.alfresco = SIDE.params.prompt('alfresco', 'Alfresco Url?', "http://localhost:8080/alfresco");
			SIDE.params.share = SIDE.params.prompt('share', 'Share Url?', "http://localhost:8080/share");
			SIDE.params.user = SIDE.params.prompt('user', 'Alfresco username?', "admin");
			SIDE.params.password = SIDE.params.prompt('password', 'Alfresco password?', "admin");
			SIDE.params.mainSIDEView = SIDE.params.prompt('mainSIDEView', 'Main SIDE view?', 'http://localhost:8080/alfresco/service/com/bluexml/side/view/Kinedoc/Ouvrage_DataList.json');
			SIDE.params.viewService = SIDE.params.prompt('viewService', 'View Service?', 'http://cloud.bluexml.com/grid-with-preview/index.jsp');
			SIDE.params.dataNsp = SIDE.params.prompt('dataNsp', 'Data namespace', '');
			SIDE.params.viewNsp = SIDE.params.prompt('viewNsp', 'View namespace', SIDE.params.dataNsp)
		} else {
			SIDE.params.alfresco = 'http://localhost:8080/alfresco';
			SIDE.params.share = "http://localhost:8080/share";
			SIDE.params.user = 'admin';
			SIDE.params.password = 'admin';
			SIDE.params.mainSIDEView = 'http://localhost:8080/alfresco/service/com/bluexml/side/view/Kinedoc/Ouvrage_DataList.json';
			SIDE.params.viewService = SIDE.params.prompt('viewService', 'View Service?', 'http://cloud.bluexml.com/grid-with-preview/index.jsp');
			SIDE.params.dataNsp = SIDE.params.prompt('dataNsp', 'Data namespace', 'Kinedoc')
			SIDE.params.viewNsp = SIDE.params.prompt('viewNsp', 'View namespace', SIDE.params.dataNsp)
		}

		SIDE.params.flashPreview = new SIDE.view.ui.FlashPreview(
				SIDE.params.share + "/proxy/alfresco/api/node",
				SIDE.params.share + "/components/preview/WebPreviewer.swf"
		);
		SIDE.params.PDFPreview = new SIDE.view.ui.PDFPreview(
				SIDE.params.share + "/proxy/alfresco/api/node"
		);
	}

	SIDE.params.authenticate = function() {
		var guardian = new SIDE.security.Authenticator({
			url: SIDE.params.alfresco + "/service/api/login.json",
			callbackParamName: 'alf_callback'
		});

		guardian.getTicket(SIDE.params.user, SIDE.params.password);

		//var guardian = new SIDE.security.Authenticator(SIDE.params.alfresco + "/service/api/login");
		//guardian.getTicket("admin", "admin");
	}

	SIDE.params.prompt = function(param, question, defaultValue) {
		if (SIDE.Util.getParam(param)) {
			return SIDE.Util.getParam(param);
		} else {
			return prompt(question, defaultValue);
		};
	}

	SIDE.params.init();
