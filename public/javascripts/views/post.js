App.views.Post = Backbone.View.extend({
	
	tagName : "div",

	className : "page-region-content page-region-post",

	template : _.template($("#templ-post").html()),
	

	initialize : function(){
		this.model.on("reset", this.render, this);
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});