sap.ui.jsview("view.Tracking", {

	getControllerName : function() {
		return "view.Tracking";
	},

    createContent : function(oController) {

		this.oTrack = new sap.m.Input({type: 'Text', width: '300px'}).addStyleClass('margin');
		var oTrackVBox = new sap.m.VBox("trackVBox", {
			alignItems: sap.m.FlexAlignItems.Left,
			items:[
				new sap.m.Label({text: "", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				new sap.m.Label({text: "Track", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				this.oTrack
			]
		});

		return new sap.m.Page( {
			title: "{i18n>tracking}",
			showNavButton: true,
			navButtonTap: [oController.onNavButtonTap],
			content: [
				oTrackVBox,
				new sap.m.Button({
						text: "Save", 
						type: sap.m.ButtonType.Emphasized,						
						press: function () {oController.save();}
						}).addStyleClass('margin'),
				new sap.m.Button({
						text: "Start", 
						type: sap.m.ButtonType.Emphasized,						
						press: function () {oController.start();}
						}).addStyleClass('margin'),
				new sap.m.Button({
						text: "Stop", 
						type: sap.m.ButtonType.Emphasized,						
						press: function () {oController.stop();}
						}).addStyleClass('margin'),
				new sap.m.Button({
						text: "Reset", 
						type: sap.m.ButtonType.Emphasized,						
						press: function () {oController.reset();}
						}).addStyleClass('margin')
			]
		});
    }

});
