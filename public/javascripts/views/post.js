App.views.Post = Backbone.View.extend({
	
	tagName : "div",

	className : "page-region-content page-region-post",

	initialize : function(){
		this.model.on("change", this.render, this);
	},

	render : function(){
		this.$el.html(this.model.get("content"));
		return this;
	}

});