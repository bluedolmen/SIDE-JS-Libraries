/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide('SIDE.component.view.Tree');
goog.require('SIDE.view.ui.Tree');

/**
 * @namespace SIDE.component.view.Tree
 * @constructor
 */
SIDE.component.view.Tree =  function(msg, _config) {
	var config = _config || {};
	this.channel = config.channel || '/repository/uuid';
	this.ticket = config.ticket || ticket || msg.value;
	
	var prefix = SIDE.params.alfresco + '/service/cmis/p/Sites';
	this.tree = new SIDE.view.ui.Tree({
		ticket: this.ticket,
		pUrl: 			config.pUrl || SIDE.params.alfresco + "/service/cmis/p?alf_ticket=" + this.ticket,
		iUrl: 			config.iUrl || SIDE.params.alfresco + "/service/cmis",
		height: 		config.height || '200',
		id: 			this.id || 'repository-explorer',
		rootVisible:	config.rootVisible !== false ? true : false,
		useArrows: 		config.useArrows !== false ? true : false, 
		rootText: 		config.rootText || 'Alfresco Repo',
		channel: 		config.channel || '/repository/uuid'
	});
	this.tree.load();

	return this.tree;
}