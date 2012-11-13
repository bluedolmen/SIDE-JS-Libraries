<import resource="classpath:alfresco/webscripts/extension/js/external/csvjson.js">
<import resource="classpath:alfresco/webscripts/extension/js/SIDE/Alfresco/Helper/DataLists.js">

var sah = SIDE.Alfresco.Helper;

// We first get all the elements from the csv
var csvdata = ("Site,Key,Short,Long\nTest,Mme,Mme,Madame");
var js = csvjson.csv2json(csvdata)

// Debug
print("Headers = " + js.headers);
for(var i = 0; i < js.rows.length; i++) {
  print("Rows = " + js.rows[i].toString());
}


var prefix = "org_sidelabs_is_operational_yamma_";
var dlPrefix = "dl:" + prefix;

sah.DataLists.create("test", "Civility", "Civility enumeration", dlPrefix + "EConfidentiality");
        
/*
var futureDate = new Date(); 
futureDate.setDate(futureDate.getDate() + 7); 
var currentDate = new Date(); 
var testList = companyhome.childByNamePath("Sites/test/dataLists/b2c74e68-1ccf-494e-83a6-b36049d2607a"); 
   // note: no error checking, or seeing if dataLists or this particular datalist even exists 
var testEntry = testList.createNode(null, "dl:task");
testEntry.properties["cm:title"] = document.name; 
testEntry.properties["cm:description"] = document.name; 
testEntry.properties["dl:ganttStartDate"] = currentDate; 
testEntry.properties["dl:ganttEndDate"] = futureDate; 
testEntry.properties["dl:taskPriority"] = "High"; 
testEntry.properties["dl:taskStatus"] = "Not Started"; 
testEntry.save(); 

 */

