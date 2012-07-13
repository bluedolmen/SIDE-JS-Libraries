/**
  *
  **/

function SimpleIFrame(config) {
    this.title = config.title;     
	this.url = config.url;
	this.height = config.height;
    this.width = config.width;
    this.url = config.url;

}

SimpleIFrame.prototype.calculatePropertySize = function() {
	// TODO - completer la methode pour qu'elle retourne la taille du champs en fonction
	// de son type ou de l'information qu'elle affichera.
	return 150;
}
		    
SimpleIFrame.prototype.create = function(url) {
	return new Ext.TabPanel({
        activeTab:'iSideForm',
        deferredRender:true,
        plain:true,
        layoutOnTabChange:true,
		defaults: {
			autoScroll: true,
			border:false,
			loadMask:true
		},
        items: [{
                title: 'SIDE Form',
                id:'iSideForm',
                xtype:'iframepanel',
                defaultSrc: url
        	},{
                title: 'Document Preview',
                id:'igrid',
                xtype:'iframepanel',
                loadMask:{msg:'<img src="images/powered.png" height="35px" width="99px" />'},
                defaultSrc:'http://localhost:8080/side-demo/library/tree-grid-preview-standalone.html'
            }]
    })
}

SimpleIFrame.prototype.getUrl = function() {
    return this.url;
}

SimpleIFrame.prototype.getIFrame = function() {
    return this.create(this.getUrl());
}

SimpleIFrame.prototype.getContent = function() {
    return this.getIFrame();
}

SimpleIFrame.prototype.show = function(div) {
    this.getContent().render(div);
}