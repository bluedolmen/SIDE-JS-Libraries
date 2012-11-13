/*
    * menu portlet publishes events
*/
var mainPortlet = function(args) {		
	var contentNode = dojo.byId("main");
	dojo.xhrGet({
        url: args.href,
        handleAs: "text",
        load: function(data){
            dojo.fadeOut({
                node: contentNode,
                onEnd: function(){
                    contentNode.innerHTML = data;
                    dojo.fadeIn({ node: contentNode }).play();    
                }
            }).play();
        },
        error: function(error,args){
            console.warn("error!",error);
        }
    });
}

	dojo.subscribe("/menu/info", mainPortlet);

var transformMenuLinks = function(){
	dojo.query("#menu a").connect("onclick",function(e){
		e.preventDefault();
		dojo.publish("/menu/info", [{href: this.href}]);
     });       
};

dojo.ready(transformLinks);

/*
dojo.ready(function(){
	transformLinks();
});
*/
