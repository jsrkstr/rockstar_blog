App.views.Post = Backbone.View.extend({

	el : $(".page-region-content.page-region-post"),

	template : _.template($("#templ-post").html()),

	events : {
		"click .back-button" : "navigateBack"
	},


	initialize : function(){
		// cases other than server render
		if(this.model){
			this.model.on("change", this.render, this);
			this.render();
		} else {
			this.renderedArchive();
		}
	},

	render : function(){
		this.$(".page-content").html(this.template(this.model.toJSON()));
		if(!this.renderedArchive){
			this.renderedArchive();
		}
		return this;
	},

	navigateBack : function(){
		history.back();
		return false;
	},


	renderedArchive : function(){
		this.renderedArchive = true;
		var archiveView = new App.views.Archive({ collection : App.allPosts });
		this.$(".right-sidebar").html(archiveView.render().el);
	}

});