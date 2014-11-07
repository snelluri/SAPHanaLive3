sap.ui.controller("view.Tracking", {

	onAfterRendering: function() {
		var view = this.getView();
		$.ajax({
			url: localStorage["live3.path"] + "services.xsodata/Settings?$format=json&$filter=name eq 'TRACK'",
			type: 'get',
			headers: {"X-CSRF-Token": "Fetch"},
			error: function (dataTrack) { console.log(dataTrack);}, 
			success: function (dataTrack, textStatus, jqXHR) {
				view.oTrack.setValue(dataTrack.d.results[0].value);
				XCSRFToken = jqXHR.getResponseHeader("X-CSRF-Token");
			}
		});
	},

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backMaster();

	},

	validateFields: function() {
		var view = this.getView();
		if (view.oTrack.getValue() === "")
			return false;
		return true; 
	},
	
	save: function() {
		var view = this.getView();
		if (this.validateFields()) {
			$.ajax({
				url: localStorage["live3.path"] + "services.xsodata/Settings('TRACK')",
				type: 'put',
				headers: {"X-CSRF-Token": XCSRFToken, "Content-Type": "application/json"},
				data: '{"value": "' + view.oTrack.getValue() + '"}',
				error: function (dataTrack) { console.log(dataTrack);}, 
				success: function (dataTrack) {
					sap.m.MessageBox.show("Tracking value saved.",sap.m.MessageBox.Icon.SUCCESS,"Success",sap.m.MessageBox.Action.CLOSE);
				}
			});
			}
		else {
			sap.m.MessageBox.show("Tracking value is required.",sap.m.MessageBox.Icon.ERROR,"Error",sap.m.MessageBox.Action.CLOSE);
		}
	},
	
	start: function() {
		var view = this.getView();
		$.ajax({
			url: localStorage["live3.nodejs"] + "start",
			type: "get",
			headers: {"Content-Type": "text/plain", "xtoken": "WotULookingAt?"},
            // need to encode value in case of special characters!
			data: {track: view.oTrack.getValue()},
			error: function (dataStart) { console.log(dataStart);}, 
			success: function (dataStart) {
				sap.m.MessageBox.show("Tracking started.",sap.m.MessageBox.Icon.SUCCESS,"Success",sap.m.MessageBox.Action.CLOSE);
			}
		});
	},
	
	stop: function() {
		var view = this.getView();
		$.ajax({
			url: localStorage["live3.nodejs"] + "stop",
			type: "get",
			headers: {"Content-Type": "text/plain", "xtoken": "WotULookingAt?"},
			error: function (dataStop) { console.log(dataStop);}, 
			success: function (dataStop) {
				sap.m.MessageBox.show("Tracking stopped.",sap.m.MessageBox.Icon.SUCCESS,"Success",sap.m.MessageBox.Action.CLOSE);
			}
		});
	},
	
	reset: function() {
		var view = this.getView();
		$.ajax({
			url: localStorage["live3.path"] + "services.xsjs?cmd=reset",
			type: 'get',
			error: function (dataReset) { console.log(dataReset);}, 
			success: function (dataReset) {
				sap.m.MessageBox.show("Tracking reset.",sap.m.MessageBox.Icon.INFORMATION,"{i18n>information}",sap.m.MessageBox.Action.CLOSE);
			}
		});
	}
	
});
