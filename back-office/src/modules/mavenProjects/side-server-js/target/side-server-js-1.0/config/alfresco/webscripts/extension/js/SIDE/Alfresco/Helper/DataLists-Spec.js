<import resource="classpath:alfresco/webscripts/extension/js/external/env.rhino.1.2.13.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/pavlov.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/qunit-cli.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/log4javascript-rhino.js">
<import resource="classpath:alfresco/webscripts/extension/js/external/csvjson.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/DataLists.js">

QUnit.specify.globalApi = true;

pavlov.specify("Data List Test Set", function() {
  describe("Data List Helper", function() {

    var enumerations;
    var p = "yamma:org_sidelabs_is_operational_yamma_"; 
    enumerations = {
      // YaMma
      "EConfidentiality": p + "EConfidentiality",
      "EDelay": p + "EDelay",
      "EDocumentStatus": p + "EDocumentStatus",
      "EEventType": p + "EEventType",
      "EFileStatus": p + "EFileStatus",
      "EFormat": p + "EFormat",
      "EInboxMailStatus": p + "EInboxMailStatus",
      "EMailOrDocumentNature": p + "EMailOrDocumentNature",
      "EMailOrDocumentType": p + "EMailOrDocumentType",
      "EOutboxMailStatus": p + "EOutboxMailStatus",
      "EPriority": p + "EPriority",
      "ESeverity": p + "ESeverity",
      "EUrgency": p + "EUrgency",

      // SIDECommonCRM
      "ECivility": "SIDECommonCRM:org_sidelabs_is_common_crm_ECivility",
      "EGender": "SIDECommonCRM:org_sidelabs_is_common_crm_EGender",
      "ELegalType": "SIDECommonCRM:org_sidelabs_is_common_crm_ELegalType",
      "ERole": "SIDECommonCRM:org_sidelabs_is_common_crm_ERole",
      "EService": "SIDECommonCRM:org_sidelabs_is_common_crm_EService"

      // SIDECommonEnumeration
    };
    
    before(function() {});

    it("should be able to create a severity data list from static data", function() {
      var dl = SIDE.Alfresco.Helper.DataLists.create({
                siteName: "test",
                title: "Test Severity",
                description: "Allows to qualify event severity",
                type: "yamma:org_sidelabs_is_operational_yamma_ESeverity"
              });
      assert(dl.name).equals("Test Severity");
    });

    it("should be able to add an item in the severity data list", function() {      
      var o = SIDE.Alfresco.Helper.DataLists.addItem("test","Test Severity", {
        target: "yamma:org_sidelabs_is_operational_yamma_ESeverity",
        qname: "{http://www.bluexml.com/model/content/SIDECommonEnumeration/1.0}",
        modelPrefix: "org_sidelabs_is_common_enumeration_keyvalue",
        cols: {
          "key": "Low",
          "short": "Low",
          "long": "Low"
        }
      });
      logger.debug(o);
      assert(o.name).equals("Low");
    });

    it("should be able to create a set of data list", function() {
      for (e in enumerations) {
        var label = e.substring(1, e.length);
        var config = {
          siteName: "test",
          title: label,
          description: "Allows to qualify " + label.toLowerCase(),
          type: enumerations[e]
        };
        print(config);
        var dl = SIDE.Alfresco.Helper.DataLists.create(config);
        print(dl);
        assert(dl.name).equals(label);
      };
      
    });

    it("should be able to add items in an existing data list from csv data", function() {
      
      var csvFile = companyhome.childByNamePath("Sites/" + "test" + "/admin/initialization/dataLists/Enumeration.csv");
      logger.debug(csvFile);

      if (csvFile) {
        var content = csvFile.content + "\n";
/*
content.replace(/,*\n/i, "");
        print(content);
*/
        var csvData = csvjson.csv2json(content);
        var h = csvData.headers;
        
        logger.debug("h = " + h);
      
        for(i = 0; i < csvData.rows.length; i++) {
          // We get data
          var row = csvData.rows[i];
          print(row);
          logger.debug("row = " + row);
          if (row["Enumeration"] != 0) {
            var kv = {};
            for (j = 0; j < h.length; j++) {
              kv[h[j].toLowerCase()] = row[h[j]];
            }
            
            if (h[0] == "Enumeration") {
              target = enumerations["E" + row.Enumeration];
            }
            
            var metaData = {
              target: target,
              qname: "{http://www.bluexml.com/model/content/SIDECommonEnumeration/1.0}",
              modelPrefix: "org_sidelabs_is_common_enumeration_keyvalue",
              cols: kv
            };
            
            var label = row["Enumeration"].substring(1, row["Enumeration"].length);
            var o = SIDE.Alfresco.Helper.DataLists.addItem("test", row.Enumeration, metaData);
            logger.debug(o);
            assert(o.name).equals("Low");
          }
        }
      }
    });

  });
});

QUnit.load();
QUnit.start();