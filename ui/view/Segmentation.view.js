sap.ui.jsview("view.Segmentation", {

      getControllerName : function() {
         return "view.Segmentation";
      },

      createContent : function(oController) {

			jQuery.sap.declare("app.ref.SegmentationView"); 
			app.ref.SegmentationView = this;

			sap.ui.core.Element.extend("academy.BubbleItem", { metadata : {
				properties : {
					"key" : {type : "string", group : "Misc", defaultValue : null},
					"x" : {type : "string", group : "Misc", defaultValue : null},
					"y" : {type : "string", group : "Misc", defaultValue : null},
					"z" : {type : "string", group : "Misc", defaultValue : null}		
				}
			}});	    
			
			sap.ui.core.Control.extend("academy.Bubble", { 
				/* the control API */
				metadata : {
					aggregations : {
						"items" : { type: "academy.BubbleItem", multiple : true, singularName : "item"}
					},
					events: {
						"select" : {},
						"selectEnd": {}				
					}			
				},
			
				// the part creating the HTML:
				renderer: function(oRm, oControl) {	// static function, so use the given "oControl" instance instead of "this" in the renderer function
					oRm.write("<div"); 
					oRm.writeControlData(oControl);		// writes the Control ID and enables event handling - important!
					oRm.addClass("bubble");				// add a CSS class for styles common to all control instances
					oRm.writeClasses();					// this call writes the above class plus enables support for academy.Bubble.addStyleClass(...)				
					oRm.write(">");
					oRm.write("</div>");
				},
				
				onAfterRendering: function() {
					this.doRefresh();
				},
				
				doRefresh: function() {

					/* get the Items aggregation of the control and put the data into an array */
					var aItems = this.getItems();
					var data = [];
					for (var i=0;i<aItems.length;i++){
						var oEntry = {};
						for (var j in aItems[i].mProperties) {
							oEntry[j]=aItems[i].mProperties[j];
						}					
						data.push(oEntry);
					}
					
					var containerWidth = jQuery.sap.byId(this.oParent.sId).width() || 800;
					var containerHeight = jQuery.sap.byId(this.oParent.sId).height() || 500;
					
					var margin = {top: 20, right: 20, bottom: 30, left: 40},
						width = containerWidth - margin.right - margin.left,
						height = containerHeight - margin.top - margin.bottom - 110;
						//console.log(sap.ui.Device.os.name);
						if (sap.ui.Device.os.name === 'win' || sap.ui.Device.os.name === 'mac') {height = height - 50;}; // pullToRefresh always visible on desktop
					color = d3.scale.category20c();
					
					/* scales for x, y and radius */
					xScale = d3.scale.linear()
							.domain([
								d3.min(data,function(d){return parseInt(d.x)})-10,
								d3.max(data,function(d){return parseInt(d.x)})+10
							])
							.range([0,width]);
					yScale = d3.scale.linear()
							.domain([
								d3.max(data,function(d){return parseInt(d.y)})+10,
								d3.min(data,function(d){return parseInt(d.y)})-10
							])
							.range([0,height]);	

					rScale = d3.scale.linear()
							.domain([
								d3.min(data,function(d){return parseInt(d.z)}),
								d3.max(data,function(d){return parseInt(d.z)})
							])
							.range([8,40]);						

					d3.select("svg")
					.remove();			

					/* create rectangle which contains the chart */
					var vis = d3.select("#"+this.getId())
					.append("svg")
					.attr("width", width + margin.right + margin.left)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
						
					/* introduce gradients in bubbles */	
					var defs = vis.append('defs');
					var grad = defs
						.selectAll("radialGradient")
						.data(data)
						.enter()
						.append('radialGradient')
						.attr('id', function(d, i) { return "grad"+i; })
						.attr('cx', "50%").attr('cy', "50%").attr('fx', "10%").attr('fy', "10%")
						.attr('r', '1')
						.call(
						function(gradient) {
							gradient.append('stop')
								.attr('offset', '0%')
								.attr('style', 'stop-color:white;stop-opacity:0');
							gradient.append('stop')
								.attr("class", "gradstop")
								.attr('offset', '50%')
								.attr('style', 'stop-opacity:1')
						});
					var stops = defs.selectAll(".gradstop");
					stops.attr('style', function(d,i){ return 'stop-color:'+color(i);});	

					/* x and y axis */
					vis.append("g")
						.attr("class", "axis")
						.attr("transform", "translate(0," + height + ")")
						.call(d3.svg.axis().scale(xScale).orient("bottom").ticks(5));

					vis.append("g")
						.attr("class", "axis")
						.call(d3.svg.axis().scale(yScale).orient("left").ticks(5));	

					/* Add an x-axis label */
					vis.append("text")
						.attr("text-anchor", "end")
						.attr("x", width)
						.attr("y", height - 6)
						.text("Influence");	
					/* Add a y-axis label */
					vis.append("text")
						.attr("text-anchor", "end")
						.attr("y", 6)
						.attr("dy", ".75em")
						.attr("transform", "rotate(-90)")
						.text("Stance");				
						
					/* bubbles */	
					var bubbles = vis
						.selectAll("circle")
						.data(data)
						.enter()
						.append("circle")
						.attr("class", "bubbles")
						.attr("cx",function(d) { return xScale(d.x)})
						.attr("cy",function(d) { return yScale(d.y)})
						.attr("r",function(d) { return rScale(d.z)})
						.style("fill", function(d) { return color(d.key) })
						.on("mouseover",function(d){
							vis.append("text")
							.attr("x",xScale(d.x))
							.attr("y",yScale(d.y))
							.text("Cluster " + d.key + " (" + d.z + ")")
							.style("fill", "black" )
							.attr("class","tip")
						})
						.on("mouseout",function(d){
							d3.selectAll(".tip").remove();
						})
						.on("click",function(d){
							app.ref.TweetersView.getController().doTweeters(d.key,d.x,d.y);
						});

				}	
			});  

			this.oSegmentationPullToRefresh = new sap.m.PullToRefresh({ refresh: function() {oController.doSegmentation()}});
			this.oSegmentationHeader = new sap.m.Label({design: sap.m.LabelDesign.Bold}).addStyleClass('margin');
			this.oSegmentationBubbleItem = new academy.BubbleItem({key:"{ClusterNumber}",x:"{influence}",y:"{stance}",z:"{users}"});
			this.oSegmentationBubble = new academy.Bubble({
                items: {path: "/results", template: this.oSegmentationBubbleItem} 	
			});
			this.oModel = new sap.ui.model.json.JSONModel();			
			this.oSegmentationBubble.setModel(this.oModel);
			this.oSegmentationFooter = new sap.m.Label({design: sap.m.LabelDesign.Bold}).addStyleClass('margin');

            this.page = new sap.m.Page( {
							title: "{i18n>Segmentation}",
							showNavButton: true,
							navButtonTap: [oController.onNavButtonTap],
							content: [
								this.oSegmentationPullToRefresh,
								this.oSegmentationHeader,
								this.oSegmentationBubble,
								this.oSegmentationFooter
							]

			});

            return this.page;

      }

});
