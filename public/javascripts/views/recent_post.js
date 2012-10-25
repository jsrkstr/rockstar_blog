App.views.RecentPosts = Backbone.View.extend({
	
	tagName : "div",

	className : "tile-group",

	template : _.template($('#templ-post-tile').html()),

	events : {
		"click .tile" : "showPost"
	},

	initialize : function(){
		this.collection.on("reset", this.render, this);
	},

	render : function(){

		this.collection.each(this.addOne, this);
		return this;
	},


	addOne : function(model){
		this.$el.append(this.template(model.toJSON()));
	},


	showPost : function(e){
		var post_id = $(e.currentTarget).data("post-id");
		App.router.navigate("/posts/" + post_id, { trigger : true });
	}

});