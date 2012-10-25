App.Router = Backbone.Router.extend({

  routes : {
    ""                                : "home",
    "home"                            : "home",
    "posts/:post_id"                   : "post"
  },

  home : function(){

    $(".page-region-content.page-region-post").hide();

    if($(".page-region-content.tiles").length == 0){
      
      $(".page-region").prepend("<div class='page-region-content tiles'></div>");

    } else {
      $(".page-region-content.tiles").show();
    }

    if(!App.recentPosts){
      App.recentPosts = new App.collections.RecentPosts();
      var recentPostsView = new App.views.RecentPosts({ collection : App.recentPosts });
      App.recentPosts.fetch();
      $(".page-region-content.tiles").prepend(recentPostsView.render().el);
    }

  },


  post : function(post_id){
    $(".page-region-content.tiles").hide();

    var postRegion = $(".page-region-content.page-region-post");

    if(postRegion.data("post-id") == post_id){
      postRegion.show();
      return true;
    }

    if(!App.currentPosts)
      App.currentPosts = new App.collections.Posts();

    var post = App.currentPosts.get(post_id);

    if(!post){
      post = App.currentPosts.add({ id : post_id }).get(post_id);
      post.fetch();
    }

    postRegion.remove();

    App.currentPageView = new App.views.Post({ model : post });
    $(".page-region").append(App.currentPageView.render().el);

  }

});