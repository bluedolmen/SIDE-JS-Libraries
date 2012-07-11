/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */


function initTree() {
	// Main menu
    treePanel = new Ext.tree.TreePanel({
    	'id': 			'tree-panel',
    	'title': 		'SIDE Library Browser',
        'region':		'north',
        'split': 		true,
        'height': 		300,
        'minSize': 		150,
        'autoScroll': 	true,

        'rootVisible': 	false,
        'lines': 		false,
        'singleExpand': true,
        'useArrows': 	true,

        'loader': 		new Ext.tree.TreeLoader({
            'dataUrl': dataTree
        }),

        'root': 		new Ext.tree.AsyncTreeNode()
    });

	// Assign the changeLayout function to be called on tree node click.
    treePanel.on('click', function(n){
    	//var n = this.selModel.selNode || {}; // selNode is null on initial selection

    	onClick(n);
    });

	var onClick = function (args) {
		var n = args;
		var id;
		var tab;
		if (n != null) {
			id = n.id;
			tab = Ext.getCmp(id);
		}
		if (tab != null) {
			Ext.getCmp('tab-panel').activate(tab);
		}

		if (n['leaf'] && tab == null) {  // ignore clicks on folders and currently selected node
			Ext.getCmp('content-panel').layout.setActiveItem(id + '-panel');
			if(!detailEl){
				var bd = Ext.getCmp('details-panel').body;
				bd.update('').setStyle('background','#fff');
				//detailEl = bd.createChild(); //create default empty div
			}
			//detailEl.update('');

			if (n['attributes']['url'] != null && n['attributes']['url'].length > 0) {
			    SIDE.pattern.Observer.publish("/type/id", [n]);
			} else {
			    SIDE.pattern.Observer.publish("/type/view", [n]);
			}
		}
	}
}

function makeLayout() {
	var start = {
	    'id': 'start-panel',
	    'title': 'Start Page',
	    'layout': 'fit',
	    'bodyStyle': 'padding:25px',
	    'contentEl': 'start-div'  // pull existing content from the page
	};

	var tabs = new Ext.TabPanel({
	    'activeTab': 0,
	    'id': 'tab-panel',
	    'items': [start]
	});

	var contentPanel = {
		'id': 'content-panel',
		'region': 'center', // this is what makes this panel into a region within the containing layout
		'layout': 'card',
		'margins': '2 5 5 0',
		'activeItem': 0,
		'border': false,
		'items': [
			tabs
			// from basic.js:
			//start, absolute, accordion, anchor, border, cardTabs, cardWizard, column, fit, form, table, vbox, hbox,
			// from custom.js:
			//rowLayout, centerLayout,
			// from combination.js:
			//absoluteForm, tabsNestedLayouts
		]
	};

	// This is the Details panel that contains the description for each example layout.
	var detailsPanel = {
		'id': 'details-panel',
        'title': 'Details',
        'region': 'center',
        'bodyStyle': 'padding-bottom:15px;background:#eee;',
		'autoScroll': true,
		'html': '<p class="details-info">When you select an item from the tree, additional details will display here.</p>'
    };

    new Ext.Viewport({
		'layout': 	'border',
		'title': 	'SIDE Browser',
		'items': 	[{
						'xtype': 	'box',
						'region': 	'north',
						'applyTo':	'external-header',
						'height': 	110
					},{
						'layout': 	'border',
				    	'id': 		'layout-browser',
				        'region':	'west',
				        'border': 	false,
				        'split':	true,
						'margins': 	'2 0 5 5',
				        'width': 	275,
				        'minSize': 	100,
				        'maxSize': 	500,
						'items': [
							treePanel,
							detailsPanel
						]
					}
					,contentPanel
				],
        'renderTo': Ext.getBody()
    });
}
