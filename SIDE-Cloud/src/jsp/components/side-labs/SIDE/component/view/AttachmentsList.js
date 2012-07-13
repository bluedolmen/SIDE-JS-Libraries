/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.component.view.AttachmentsList');

goog.require("SIDE.model.view.View");

/**
 * Provides clicked item on the indicated channel /document/attachment/uuid
 * @namespace SIDE.component.view.AttachmentList
 * @param {*} msg
 * @param {*} config
 * @constructor
 */
SIDE.component.view.AttachmentsList = function(msg, config) {
	this.channel = config.channel || '/document/preview';
	var gridId = 'grid-attachments';

	var view = view || {};

	views[gridId] = owl.copy(view);
	views[gridId].id = gridId;
	views[gridId]['stateId'] = views[gridId].id;

	if (dojo.byId(gridId) != null) {
		var node = dojo.byId(gridId);
		while (node.hasChildNodes()) {
		    node.removeChild(node.lastChild);
		}
	}

	views[gridId]['height'] = 160;
	views[gridId]['width'] = '100%';
	views[gridId]['enableGrouping'] = false;
	views[gridId]['columns'] = [{"id":"prop_cmis_name","sortable":true,"dataIndex":"prop_cmis_name","groupable":false,"header":"Attachment"}];
//	views[gridId]['columns'] = [];

	// show: 'link,prop' or show: 'prop' or show: 'cust'
	this.view = new SIDE.model.view.View(
				ticket,
				null,
				views[gridId],
				gridId,
				msg.data
	);
	this.view.show();
	var instance = this;
	this.view.sg.getGrid().on('rowmousedown', function(a, rowIndex, c, d) {
		var record = this['store'].getAt(rowIndex);
		SIDE.pattern.Observer.publish(instance.channel, [{'value': record}]);
	});

/*
	var myMask = new Ext.LoadMask(this.view.sg.getGrid().getEl(), {msg:"Please wait..."});
	myMask.show();
*/

}

/*
var attachmentsView;
SIDE.component.view.AttachmentsList.getView = function(data) {
	attachmentsView = new SIDE.model.view.View('', '', view, 'grid-attachments', data);
	view['height'] = "200";
	//view['width'] = "100%";
	view['enableCharting'] = false;
	view['enableGrouping'] = false;
	view['enablePaging'] = true;

	attachmentsView.show();
	attachmentsView.sg.getGrid().on('rowmousedown', function(a, rowIndex, c, d) {
		alert('coucou');
		var record = this['store'].getAt(rowIndex);
		SIDE.pattern.Observer.publish(channel, [{'value': record}]);
	});
}
*/