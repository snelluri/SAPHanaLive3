sap.ui.controller("view.Tweeters", {

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backDetail();
	},

	doTweeters: function(cluster,influence,stance) {
		var view = this.getView();

		$.ajax({
			url: localStorage["live3.path"] + "services.xsodata/TweetersClustered?$format=json&$select=user,stance,influence&$filter=ClusterNumber eq " + cluster + " and influence eq " + influence + " and stance eq " + stance + "&$top=" + localStorage["live3.rows"],
			type: 'get',
			error: function (dataTweeters) { console.log(dataTweeters);}, 
			success: function (dataTweeters) {
				var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({groupingEnabled: true});
				view.page.setTitle("Cluster:" + cluster + " Stance:" + oNumberFormat.format(stance) + " Influence:" + oNumberFormat.format(influence));
				view.oModel.setData(dataTweeters.d);
				app.ref.AppView.splitApp.toDetail("tweeters");
			}
		});
			
	}	

});
