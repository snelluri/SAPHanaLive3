sap.ui.controller("view.Tweets", {

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backDetail();
	},

	doTweets: function(user) {
		var view = this.getView();

		$.ajax({
			url: localStorage["live3.path"] + "services.xsodata/Tweets?$format=json&$select=user,created,text&$filter=user eq '" + user + "'&$top=" + localStorage["live3.rows"] + "&$orderby=created%20desc",
			type: 'get',
			error: function (dataTweets) { console.log(dataTweets);}, 
			success: function (dataTweets) { 
				view.page.setTitle("Tweets by @" + user);
				view.oModel.setData(dataTweets.d);
				app.ref.AppView.splitApp.toDetail("tweets");
			}
		});
			
	}	

});
