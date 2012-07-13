/**
  *
  **/

function EditorGrid(config) {
    this.title = config.title;     
	this.url = config.url;
	this.height = config.height;
    this.width = config.width;
	this.fields = config.fields;
	this.columns = config.columns;
}

EditorGrid.prototype.calculatePropertySize = function() {
	// TODO - completer la methode pour qu'elle retourne la taille du champs en fonction
	// de son type ou de l'information qu'elle affichera.
	return 150;
}

EditorGrid.prototype.getStore = function() {
    var store = new Ext.data.JsonStore({
    	url: this.getUrl(),
        autoLoad: true,
        fields: this.getFields(),
        root: 'records'
    });
    return store;
}
		    
EditorGrid.prototype.create = function(store) {
    var grid = new Ext.grid.EditorGridPanel({
        store: store,
        plugins: plugins,
        columns: this.getColumns(),
        stripeRows: true,
        autoExpandColumn: false,
        height: this.height,
        width: this.width,
        title: this.title     
    });
    
    return grid;
}

EditorGrid.prototype.getUrl = function() {
    return this.url;
}

EditorGrid.prototype.getService = function() {
	return DataSource.get('json', Authenticate.getTicket(), this.getUrl());
}

EditorGrid.prototype.getFields = function() {
    return this.fields;
}

EditorGrid.prototype.getColumns = function() {
    return this.columns;
}

EditorGrid.prototype.getGrid = function() {
    return this.create(this.getStore());
}

EditorGrid.prototype.getContent = function() {
    return this.getGrid();
}

EditorGrid.prototype.show = function(div) {
    this.getContent().render(div);
}
