sap.ui.jsview("view.Tweeters", {

      getControllerName : function() {
         return "view.Tweeters";
      },

      createContent : function(oController) {

			jQuery.sap.declare("app.ref.TweetersView"); 
			app.ref.TweetersView = this;

			this.oTweetersList = new sap.m.List({
				showSeparators: sap.m.ListSeparators.Inner
			}); 

			this.oTweetersList.bindItems({
				path : "/results", 
				template : new sap.m.StandardListItem({
					title: {
						path: "user",
						formatter: function(user) {
							return "@" + user;
						}
					},
					customData: [
						new sap.ui.core.CustomData({
							key: "user",
							value: "{user}"
						})
					],
					type: sap.m.ListType.Navigation,
					press: function(evt){
						app.ref.TweetsView.getController().doTweets(evt.getSource().data("user"));
					}
				})
			});
			
			this.oModel = new sap.ui.model.json.JSONModel();
			this.oModel.setSizeLimit(localStorage["live3.rows"]);
			this.oTweetersList.setModel(this.oModel);

			this.page = new sap.m.Page( {
							showNavButton: true,
							navButtonTap: [oController.onNavButtonTap],
							content: [
								this.oTweetersList
							]

			});

			return this.page;	    	  

      }

});