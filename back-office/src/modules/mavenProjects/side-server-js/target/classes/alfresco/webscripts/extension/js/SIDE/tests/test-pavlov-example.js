<import resource="classpath:alfresco/webscripts/extension/js/external/env.rhino.1.2.13.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/pavlov.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit-cli.js">

QUnit.specify.globalApi = true;

pavlov.specify("Pavlov Example", function(){

    describe("A feature that is being described", function(){

        var foo;

        before(function(){
            foo = "bar";
        });

        after(function(){
            foo = "baz";
        });

        it("can be specified like so", function(){
            assert(foo).equals('bar');
        });

        it("fails with 'Not Implemented' if a specification does not have an associated test");

        given([2,2,4], [5,2,7], [6,-4,2]).
            it("can generate row data tests", function(a, b, c) {
                assert(c).equals(a + b);
            });
    });

});

QUnit.load();
QUnit.start();