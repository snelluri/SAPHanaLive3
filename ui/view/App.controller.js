sap.ui.controller("view.App", {

	onListItemTap: function(viewName) {
		app.ref.AppView.splitApp.toDetail(viewName);
	}

});
