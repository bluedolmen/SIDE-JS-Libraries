/**
 * This file is a test to show we can inherit Alfresco JS
 * Root Objects very simply through the use of __noSuchMethod__ function
 *
 * http://www.crockford.com/javascript/inheritance.html
 * http://stackoverflow.com/questions/4706236/how-to-pass-all-arguments-as-collection-to-another-function-and-not-as-single-ar
 */

function toto() {
  this.a = 1;
}

toto.prototype.print = function() {
  logger.log(this.a);
}

toto.prototype.__noSuchMethod__ = function(a, b) {
  logger.log("The " + a + " instance method doesn't exist");
  logger.log('* Argument value 1 is the name of the non existing method : ' + arguments[0]);
  logger.log('* Argument value 2 is an array with the arguments for the non existing method : '
             + arguments[1][0] + " / " + arguments[1][1]);
  //printa.apply(this,arguments[1]);
  eval(a).apply(this,arguments[1]);
}

toto.__noSuchMethod__ = function(a) {
  logger.log("The " + a + " static method doesn't exist");
  logger.log('* Argument value 1 is the name of the non existing method : ' + arguments[0]);
  logger.log('* Argument value 2 is an array with the arguments for the non existing method : '
             + arguments[1][0] + " / " + arguments[1][1]);
  //printa.apply(this,arguments[1]);
  eval(a).apply(this,arguments[1]);
}

function printa(a, b) {
  var c = a + b;
  logger.log("printa is finally executed with the right arguments: "
               + a + " + " + b + " = " + c);
}

var a = new toto();
a.printa(1,2);

toto.printa(10,20);
