App.views.Post = Backbone.View.extend({
	
	tagName : "div",

	className : "page-region-content page-region-post",

	template : _.template($("#templ-post").html()),

	events : {
		"click .back-button" : "navigateBack"
	},


	initialize : function(){
		if(this.model)
			this.model.on("change", this.render, this);
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	navigateBack : function(){
		history.back();
		return false;
	}

});