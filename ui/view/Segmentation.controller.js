sap.ui.controller("view.Segmentation", {

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backMaster();
	},

	doSegmentation: function() {
		var view = this.getView();

		$.ajax({
			url: localStorage["live3.path"] + "services.xsodata/Tweets/$count",
			type: 'get',
			error: function (dataTweets) { console.log(dataTweets);}, 
			success: function (dataTweets) {
				$.ajax({
					url: localStorage["live3.path"] + "services.xsodata/Tweeters/$count",
					type: 'get',
					error: function (dataTweeters) { console.log(dataTweeters);}, 
					success: function (dataTweeters) {
						var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({groupingEnabled: true});
						view.oSegmentationHeader.setText("Tweets:" + oNumberFormat.format(dataTweets) + " Tweeters:" + oNumberFormat.format(dataTweeters));
					}
				});
			}
		});

		$.ajax({
			url: localStorage["live3.path"] + "services.xsodata/TweetersClusteredSummary?$format=json",
			type: 'get',
			error: function (dataClusters) { console.log(dataClusters);}, 
			success: function (dataClusters) { 
				view.oModel.setData(dataClusters.d);
				view.oSegmentationBubble.doRefresh();
				view.oSegmentationPullToRefresh.hide();
				app.ref.AppView.splitApp.toDetail("segmentation");
			}
		});

		$.ajax({
			url: localStorage["live3.path"] + "services.xsodata/Settings?$format=json&$filter=name eq 'TRACK'",
			type: 'get',
			error: function (dataTrack) { console.log(dataTrack);}, 
			success: function (dataTrack) {
				view.oSegmentationFooter.setText("Tracking:" + dataTrack.d.results[0].value);
			}
		});

	}	

});
