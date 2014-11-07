sap.ui.jsview("view.Tweets", {

      getControllerName : function() {
         return "view.Tweets";
      },

      createContent : function(oController) {

			jQuery.sap.declare("app.ref.TweetsView"); 
			app.ref.TweetsView = this;

			this.oTweetsList = new sap.m.List({
				showSeparators: sap.m.ListSeparators.Inner
			}); 

			this.oTweetsList.bindItems({
				path : "/results", 
				template : new sap.m.StandardListItem({
					title: "{text}",
					description: {
						parts: [
							{path: "created"}
							],
						formatter: function(created) {
							var timeStamp = new Date(parseInt(created.substr(6)));
							var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance(); 
							var dateStr = dateFormat.format(timeStamp);
							return dateStr;
						}
					},
					adaptTitleSize: true,
					customData: [
						new sap.ui.core.CustomData({
							key: "text",
							value: "{text}"
						})
					],
					type: sap.m.ListType.Navigation,
					press: function(evt){
						sap.m.MessageBox.show(evt.getSource().data("text"),sap.m.MessageBox.Icon.INFORMATION,"{i18n>information}",sap.m.MessageBox.Action.CLOSE);
					}
				})
			});
			
			this.oModel = new sap.ui.model.json.JSONModel();
			this.oModel.setSizeLimit(localStorage["live3.rows"]);
			this.oTweetsList.setModel(this.oModel);

			this.page = new sap.m.Page( {
							showNavButton: true,
							navButtonTap: [oController.onNavButtonTap],
							content: [
								this.oTweetsList
							]

			});

			return this.page;	    	  

      }

});