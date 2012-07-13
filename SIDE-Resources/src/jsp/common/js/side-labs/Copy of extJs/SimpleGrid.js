/**
  *
  **/

function SimpleGrid(config) {
    this.title = config.title;     
	this.url = config.url;
	this.height = config.height;
    this.width = config.width;
	this.fields = config.fields;
	this.columns = config.columns;
}

SimpleGrid.prototype.calculatePropertySize = function() {
	// TODO - completer la methode pour qu'elle retourne la taille du champs en fonction
	// de son type ou de l'information qu'elle affichera.
	return 150;
}

SimpleGrid.prototype.getStore = function() {
    var store = new Ext.data.JsonStore({
    	url: this.getUrl(),
        autoLoad: true,
        fields: this.getFields(),
        root: 'records'
    });
    return store;
}
		    
SimpleGrid.prototype.create = function(store) {
    var grid = new Ext.grid.GridPanel({
        store: store,
        columns: this.getColumns(),
        stripeRows: true,
        autoExpandColumn: false,
        height: this.height,
        width: this.width,
        title: this.title     
    });
    
    return grid;
}

SimpleGrid.prototype.getUrl = function() {
    return this.url;
}

SimpleGrid.prototype.getService = function() {
	return DataSource.get('json', Authenticate.getTicket(), this.getUrl());
}

SimpleGrid.prototype.getFields = function() {
    return this.fields;
}

SimpleGrid.prototype.getColumns = function() {
    return this.columns;
}

SimpleGrid.prototype.getGrid = function() {
    return this.create(this.getStore());
}

SimpleGrid.prototype.getContent = function() {
    return this.getGrid();
}

SimpleGrid.prototype.show = function(div) {
    this.getContent().render(div);
}
