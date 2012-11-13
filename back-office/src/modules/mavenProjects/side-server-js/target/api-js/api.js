YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Logger",
        "SIDE",
        "SIDE.Alfresco.Helper.DataLists.Folder",
        "SIDE.Alfresco.Helper.Util.AutoUpdate",
        "Search"
    ],
    "modules": [
        "SIDE.Alfresco",
        "SIDE.Alfresco.Helper",
        "SIDE.Util",
        "SIDE.YaMma"
    ],
    "allModules": [
        {
            "displayName": "SIDE.Alfresco",
            "name": "SIDE.Alfresco"
        },
        {
            "displayName": "SIDE.Alfresco.Helper",
            "name": "SIDE.Alfresco.Helper",
            "description": "2006-2012 BlueXML Copyright\n\nThis class provides helpers to manage folders. It of course uses\nAlfresco folder implementation. To augment it should be a good idea."
        },
        {
            "displayName": "SIDE.Util",
            "name": "SIDE.Util",
            "description": "This class provides a logger more advanced than native logger. But,\nthe true solution should be to use Log4javascript.\n\nNevertheless, to avoid such an overhead, we could augment default logger\nwith the following behaviors"
        },
        {
            "displayName": "SIDE.YaMma",
            "name": "SIDE.YaMma",
            "description": "2006-2012 BlueXML Copyright\n\nThis class provides a auto-update mechanisme to update metadata\nbased on other metadata's values."
        }
    ]
} };
});