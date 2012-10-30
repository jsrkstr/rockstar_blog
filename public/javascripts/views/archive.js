App.views.Archive = Backbone.View.extend({

	tagName : "div",

	template : _.template($("#templ-archive-item").html()),

	initialize : function(){

	},

	render : function(){
		this.$el.append(this.template({ items : this.collection.toJSON() }) );
		return this;
	}

});