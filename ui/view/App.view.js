sap.ui.jsview("view.App", {

	getControllerName: function() {
		return "view.App";
	},

	createContent: function(oController) {

		jQuery.sap.declare("app.ref.AppView"); 
		app.ref.AppView = this;

		this.splitApp = new sap.m.SplitApp();

		var menu = sap.m.Page( {
			title: "{i18n>appTitle}",
			icon: "{img>/icon/sap}",
			content: [
				new sap.m.List({
					items : [
						new sap.m.StandardListItem({
							title: "{i18n>overview}", 
							type: "Navigation", 
							icon: "{img>/icon/overview}", 
							tap: function() {oController.onListItemTap("overview")}
						}),
						new sap.m.StandardListItem({
							title: "{i18n>segmentation}", 
							type: "Navigation", 
							icon: "{img>/icon/segmentation}",
							tap: function() {oController.onListItemTap("segmentation")}
						}),
						new sap.m.StandardListItem({
							title: "{i18n>tracking}", 
							type: "Navigation", 
							icon: "{img>/icon/tracking}",
							tap: function() {oController.onListItemTap("tracking")}
						}),
						new sap.m.StandardListItem({
							title: "{i18n>settings}", 
							type: "Navigation", 
							icon: "{img>/icon/settings}",
							tap: function() {oController.onListItemTap("settings")}
						}),
						new sap.m.StandardListItem({
							title: "{i18n>about}", 
							type: "Navigation", 
							icon: "{img>/icon/about}",
							tap: function() {oController.onListItemTap("about")}
						})
					]
				}) 
			],
			footer: new sap.m.Bar({
				contentLeft: new sap.m.Image({
					src: "{img>/icon/academy}",
					height: "34px",
					width: "34px",									
					press: function() {window.open("http://youtube.com/saphanaacademy")}
				}).addStyleClass('margin'),
				contentMiddle: new sap.m.Label({
					text: "{i18n>academy}", 
					design: sap.m.LabelDesign.Bold
				}).addStyleClass('margin')
			})
		});
		this.splitApp.addMasterPage(menu);

		this.splitApp.addDetailPage(sap.ui.jsview("overview", "view.Overview"));
		this.splitApp.addDetailPage(sap.ui.jsview("segmentation", "view.Segmentation"));
		this.splitApp.addDetailPage(sap.ui.jsview("tweeters", "view.Tweeters"));
		this.splitApp.addDetailPage(sap.ui.jsview("tweets", "view.Tweets"));
		this.splitApp.addDetailPage(sap.ui.jsview("tracking", "view.Tracking"));
		this.splitApp.addDetailPage(sap.ui.jsview("settings", "view.Settings"));
		this.splitApp.addDetailPage(sap.ui.jsview("about", "view.About"));

		this.splitApp.setInitialDetail("segmentation");
		app.ref.SegmentationView.getController().doSegmentation();
				
		return this.splitApp;

	}

});
