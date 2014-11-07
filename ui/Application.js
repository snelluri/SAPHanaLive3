jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application"); 

sap.ui.app.Application.extend("Application", {

    init: function() {
		jQuery.sap.require("sap.m.MessageBox");
		jQuery.sap.require("jquery.sap.resources");
		jQuery.sap.require("sap.ui.core.format.DateFormat");
		jQuery.sap.require("sap.ui.core.format.NumberFormat");
		jQuery.sap.require("sap.ui.thirdparty.d3");
			
		localStorage["live3.path.default"] = "";
		localStorage["live3.rows.default"] = 1000;
		localStorage["live3.nodejs.default"] = "http://127.0.0.1:8888/";
		
		if (localStorage["live3.path"] === undefined) {
			localStorage["live3.path"] = localStorage["live3.path.default"];
		}
		if (localStorage["live3.rows"] === undefined) {
			localStorage["live3.rows"] = localStorage["live3.rows.default"];
		}
		if (localStorage["live3.nodejs"] === undefined) {
			localStorage["live3.nodejs"] = localStorage["live3.nodejs.default"];
		}

		var imgModel = new sap.ui.model.json.JSONModel("img/model.json");
		sap.ui.getCore().setModel(imgModel, "img");

		var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
		var resModel = new sap.ui.model.resource.ResourceModel({bundleUrl: "i18n/i18n.properties", bundleLocale: sLocale});
		sap.ui.getCore().setModel(resModel, "i18n");

		window.document.title = resModel.getProperty("appTitle");
	
    },
    
    main: function() {
        var root = this.getRoot();
        sap.ui.jsview("app", "view.App").placeAt(root);
		
    }

});
