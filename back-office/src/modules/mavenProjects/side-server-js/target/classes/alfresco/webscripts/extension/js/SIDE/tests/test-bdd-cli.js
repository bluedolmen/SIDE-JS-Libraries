<import resource="classpath:alfresco/webscripts/extension/js/external/env.rhino.1.2.13.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/pavlov.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit-cli.js">

// run the tests
test("module without setup/teardown (default)", function() {
  expect(2);
	ok(true,"Default OK");
	ok(jck, "function exists");
});

//QUnit.load();
QUnit.begin(); // hacked b/c currently QUnit.begin is normally called on document.load
QUnit.start();
