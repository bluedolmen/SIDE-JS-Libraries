/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */
 
/* String augmentation */
String.prototype.capitalize = function(){
   return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1 + p2.toUpperCase(); } );
};

String.prototype.addSpaceBeforeCapital = function(){
	return this.replace( /([A-Z])/g , function(m, p1){ return " " + p1; });
};
