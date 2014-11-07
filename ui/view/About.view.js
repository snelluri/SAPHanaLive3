sap.ui.jsview("view.About", {

	getControllerName : function() {
		return "view.About";
	},

	createContent : function(oController) {

		return new sap.m.Page( {
			title: "{i18n>about}",
			showNavButton: true,
			navButtonTap: [oController.onNavButtonTap],
			content: [ 
				new sap.ui.core.HTML({content:
					"<p><strong>About Live3</strong></p>"+
					"<p>This app is part of the SAP enablement offering <i>SAP HANA SPS08 by HANA Academy</i> which is a free course presented by the SAP HANA Academy.</p>"+ 
					"<p>During this 3-day bootcamp, we help you get started with SAP HANA SPS08 by walking through a step-by-step project to build a mobile application using real-time data feeds that combines sentiment analysis with predictive analytics whilst exploiting native development features of the SAP HANA development platform.</p>"+
					"<p>Whether you are new to SAP HANA, or just looking to expand your knowledge, this is a great opportunity to gain hands-on experience with SAP HANA.</p>"+
					"<p><strong>What is the scenario?</strong></p>"+
					"<p>The Live3 project allows the CMO to better understand social network sentiment relating to his company, services, or products in order to identify those in a position of influence that publish negative sentiment - so that this <i>segment</i> they can be recruited into a specialized education program. The insight evolves in real-time as new data is posted to social media sites.</p>"+
					'<p>Live3 a native SAP HANA application built using the SAP HANA platform - leveraging real-time data feeds from social media, data modeling in SAP HANA Studio, native SAP HANA text analytics for sentiment analysis and native SAP HANA clustering for segmentation, SAP HANA extended application services (XS), OData, and OpenUI5. It can easily be deployed as a native mobile app (iOS, Android...) via <a href="http://cordova.apache.org/" target="_system">Cordova</a>.</p>'+
					"<p><strong>What is sentiment analysis?</strong></p>"+
					"<p>It's said that structured data tells us what and unstructured data tells us why. With approximately 80% of enterprise-relevant information originating in unstructured data, you can gain a distinct business advantage by using this data effectively. With the text search and analysis features in the SAP HANA platform, now you can quickly and across large volumes of data.</p>"+
					"<p>Unstructured text data generally does not support automated processing. There's no data model, and it's not easily understood. Structured data conforms to data models associated with databases and spreadsheets. SAP HANA gives structure to unstructured textual content so you can unlock information that drives insight.</p>"+
					"<p>SAP HANA exposes the linguistic mark-up for text-mining uses. You can classify entities, such as people, companies, or things. And you can identify domain facts, such as sentiments, topics, and requests. The platform supports up to 31 languages for linguistic mark-up and extraction dictionaries, 11 languages for predefined core extractions, and 5 languages for sentiment analysis.</p>"+
					"<p><strong>What is segmentation?</strong></p>"+
					"<p>Predictive analytics has been around for decades. However, new market forces are changing the landscape and creating new opportunities for its powerful application. With data volumes exploding, organizations need to extract the maximum possible value, whether from transactional data typically generated within the enterprise or from unstructured data created by external sources like social media. The introduction of in-memory technology has dramatically reduced the time and cost of data processing and makes it possible to perform predictive analysis against vast volumes of data in real time.</p>"+
					"<p>The predictive analysis library of SAP HANA contains numerous powerful, native predictive algorithms for in-database processing that fully exploit the power and speed of SAP HANA, resulting in quicker insight and faster implementations. Common and specialized algorithms are supported including the following clustering algorithms to perform segmentation:<p>"+
					"<ul><li>K-means</li><li>K-medoids</li><li>DBSCAN</li><li>Agglomerate Hierarchical Clustering</li><li>Self-Organized Maps</li><li>Affinity Propagation</li><li>Anomaly Detection</li><li>Slight Silhouette</li></ul>"+
					"<p><strong>Does the SAP HANA Academy have any more enablement?</strong></p>"+
					'<p>Yes! Check out the hundreds of videos and enablement topics at <a href="http://youtube.com/saphanaacademy">SAP HANA Academy YouTube Channel</a></p>'+
					"<p><strong>Contact us</strong></p>"+
					'<p>Email: <a href="mailto:HanaAcademy@sap.com">HanaAcademy@sap.com</a><br>Visit us at: <a href="http://youtube.com/saphanaacademy" target="_system">http://youtube.com/saphanaacademy</a></p>'
				})
			]
		});

	}

});
