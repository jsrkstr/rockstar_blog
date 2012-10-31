App.views.Post = Backbone.View.extend({

	el : $(".page-region-content.page-region-post"),

	template : _.template($("#templ-post").html()),

	disqusTemplate : _.template($("#templ-disqus").html()),

	events : {
		"click .back-button" : "navigateBack"
	},


	initialize : function(args){

		this.postId = args.postId || null;

		// cases other than server render
		if(this.model){
			this.model.on("change", this.render, this);
			this.render();
		} else {
			this.renderArchive();
			this.renderDisqus();
		}
	},

	render : function(){
		this.$(".page-content").html(this.template(this.model.toJSON()));

		if(!this.renderedArchive){
			this.renderArchive();
		}

		if(this.$(".disqus-box").data("init") != 1){
			this.renderDisqus();
		} else {
			this.reinitDisqus();
		}

		return this;
	},

	navigateBack : function(){
		history.back();
		return false;
	},


	renderArchive : function(){
		this.renderedArchive = true;
		var archiveView = new App.views.Archive({ collection : App.allPosts });
		this.$(".right-sidebar").html(archiveView.render().el);
	},

	renderDisqus : function(){
		this.renderedDisqus = true;
		this.$(".disqus-box").html(this.disqusTemplate({ postId : this.postId || this.model.id })).data("init", 1).data("post-id", this.postId || this.model.id);
	},


	reinitDisqus : function(){
		var disqusBox = this.$(".disqus-box");
		if(disqusBox.data("post-id") == this.model.id)
			return false;

		disqusBox.data("post-id", this.model.id);

		var identifier = this.model.id;
		
		setTimeout(function() {
			
			DISQUS.reset({
			  reload: true,
			  config: function () {  
			    this.page.identifier = identifier;  
			    // this.page.url = document.location.href;
			  }
			});

		}, 500);

	}

});