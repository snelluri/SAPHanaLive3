sap.ui.controller("view.Settings", {

	onAfterRendering: function() {
		var view = this.getView();
		view.oPath.setValue(localStorage["live3.path"]);
		view.oRows.setValue(localStorage["live3.rows"]);
		view.oNodeJS.setValue(localStorage["live3.nodejs"]);
	},

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backMaster();

	},

	reset: function() {
		var view = this.getView();
		view.oPath.setValue(localStorage["live3.path.default"]);
		view.oRows.setValue(localStorage["live3.rows.default"]);
		view.oNodeJS.setValue(localStorage["live3.nodejs.default"]);
		this.save();
	},

	validateFields: function() {
		var view = this.getView();
		if (view.oRows.getValue() === "")
			return false;
		else if (parseInt(view.oRows.getValue()) < 1)
			return false;
		else if (parseInt(view.oRows.getValue()) > 10000)
			return false;
		return true; 
	},
	
	save: function() {
		var view = this.getView();
		if (this.validateFields()) {
			localStorage["live3.path"] = view.oPath.getValue();
			localStorage["live3.rows"] = view.oRows.getValue();
			localStorage["live3.nodejs"] = view.oNodeJS.getValue();
			sap.m.MessageBox.show("Settings saved.",sap.m.MessageBox.Icon.SUCCESS,"Success",sap.m.MessageBox.Action.CLOSE);
			}
		else {
			sap.m.MessageBox.show("Max rows must be between 1 and 10000.",sap.m.MessageBox.Icon.ERROR,"Error",sap.m.MessageBox.Action.CLOSE);
		}
	}
	
});
