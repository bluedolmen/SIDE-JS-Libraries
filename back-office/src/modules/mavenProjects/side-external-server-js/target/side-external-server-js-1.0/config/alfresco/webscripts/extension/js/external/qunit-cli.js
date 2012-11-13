var stop_watch = {
    start_time: null, stop_time: null,

    start: function() {
  this.start_time = new Date();
    },

    stop: function() {
	this.stop_time = new Date();
    },

    elapsed_seconds: function() {
	return ( this.stop_time.getMilliseconds() - this.start_time.getMilliseconds() ) / 1000;
    }
};

(function() {

    var out = (typeof println !== "undefined") ? println : print;

    QUnit.init();
    QUnit.config.blocking = true;
    QUnit.config.autorun = true;
    QUnit.config.updateRate = 0;

    // Hack for Rhino's error objects
    var current_object_parser = QUnit.jsDump.parsers.object;
    QUnit.jsDump.setParser('object', function(obj) {
    	if(typeof obj.rhinoException !== 'undefined') {
    	    return obj.name + " { message: '" + obj.message + "', fileName: '" + obj.fileName + "', lineNumber: " + obj.lineNumber + " }";
    	}
    	else {
    	    return current_object_parser(obj);
    	}
    });

    var current_test_name = null;
    var current_test_assertions = [];
    var totals = { pass: 0, fail: 0};
    
    QUnit.testStart = function(name) {
    	current_test_name = name;
    	current_test_assertions = [];
    };
    
    //    QUnit.testDone = function(name, fail_count, total_count) {
    QUnit.testDone = function(suite) {
    	if(suite.failed > 0) {
    	    out("FAIL - " + suite.name);
    
    	    for(var i = 0; i < current_test_assertions.length; i++) {
    		out("    " + current_test_assertions[i]);
    	    }
    
    
    	    totals.fail = totals.fail + 1;
    	}
    	else {
    	    out("PASS - " + suite.name);
    	    totals.pass = totals.pass + 1;
    	}
    };
    
    QUnit.log = function(details) {
    	details.message = details.message || "";
    
    	var type = (typeof details.expected !== "undefined") ? "EQ" : "OK";
    
    	var outcome = details.result ? "PASS" : "FAIL";
    	
    	var response = "";
    	if(!result && typeof details.expected !== "undefined") {
    	    response = "Expected: " + details.expected + ", Actual: " + details.actual;
    	}
    
      current_test_assertions.push([outcome, type, details.message, response].join("|"));
    };
    
    QUnit.done = function() {
    	stop_watch.stop();
    
    	out("----------------------------------------");
    	out(" PASS: " + totals.pass + "  FAIL: " + totals.fail + "  TOTAL: " + (totals.pass + totals.fail));
    	out(" Finished in " + stop_watch.elapsed_seconds() + " seconds.");
    	out("----------------------------------------");
    };
    
    QUnit.begin = function() {
    	stop_watch.start();
    }

})();

/**
 * From envjs.org guide example
 **/
/*
(function(){
              console.log('Loads test runner');
              //hook into qunit.log
	            var count = 0,
	                moduleName = "";

	             
	            // plugin into qunit
	            QUnit.moduleStart = function(name, testEnvironment) {
	                moduleName = name;
	            };
	            QUnit.log = function(result, message){
	                console.log('{%s}(%s)[%s] %s',
	                    moduleName,
	                    count++,
	                    result ? 'PASS' : 'FAIL',
	                    message
	                );
	            };
	            QUnit.done = function(fail, pass){
	                endtime = new Date().getTime();
	                console.log(
	                    'RESULTS: ( of %s total tests )\n' +
	                    'PASSED: %s\n' +
	                    'FAILED: %s\n' +
	                    'Completed in %s milliseconds.',
	                    pass+fail,
	                    pass,
	                    fail,
	                    endtime-starttime
	                );
	            }
})();
*/
