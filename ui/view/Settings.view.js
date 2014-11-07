sap.ui.jsview("view.Settings", {

	getControllerName : function() {
		return "view.Settings";
	},

    createContent : function(oController) {

		this.oRows = new sap.m.Input({type: 'Number', width: '70px'}).addStyleClass('margin');
		var oRowsVBox = new sap.m.VBox("rowsVBox", {
			alignItems: sap.m.FlexAlignItems.Left,
			items:[
				new sap.m.Label({text: "", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				new sap.m.Label({text: "Max rows", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				this.oRows
			]
		});

		this.oPath = new sap.m.Input({type: 'Text', width: '300px'}).addStyleClass('margin');
		var oPathVBox = new sap.m.VBox("pathVBox", {
			alignItems: sap.m.FlexAlignItems.Left,
			items:[
				new sap.m.Label({text: "", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				new sap.m.Label({text: "Path", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				this.oPath
			]
		});

		this.oNodeJS = new sap.m.Input({type: 'Text', width: '300px'}).addStyleClass('margin');
		var oNodeJSVBox = new sap.m.VBox("nodeJSVBox", {
			alignItems: sap.m.FlexAlignItems.Left,
			items:[
				new sap.m.Label({text: "", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				new sap.m.Label({text: "NodeJS", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				this.oNodeJS
			]
		});

		return new sap.m.Page( {
			title: "{i18n>settings}",
			showNavButton: true,
			navButtonTap: [oController.onNavButtonTap],
			content: [
				oRowsVBox,
				oPathVBox,
				oNodeJSVBox,
				new sap.m.Button({
						text: "Save", 
						type: sap.m.ButtonType.Emphasized,						
						press: function () {oController.save();}
						}).addStyleClass('margin'),
				new sap.m.Button({
						text: "Reset to Defaults", 
						type: sap.m.ButtonType.Emphasized,						
						press: function () {oController.reset();}
						}).addStyleClass('margin')
			]
		});
    }

});
