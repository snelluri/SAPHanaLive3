sap.ui.controller("view.About", {

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backMaster();
	}

});