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
      App.recentPosts.reset(_all_posts.slice(0, 10));
      $(".page-region-content.tiles").prepend(recentPostsView.el);
    }

  },


  post : function(post_id){
    var tilesRegion = $(".page-region-content.tiles");
    tilesRegion.hide();

    var postRegion = $(".page-region-content.page-region-post");
    postRegion.show();

    if(postRegion.data("post-id") == post_id){ // rendered from server

      App.currentPageView  = new App.views.Post({ postId : postRegion.data("post-id")});
      postRegion.data("post-id", null);

    } else if(!App.currentPageView || !App.currentPageView.model || App.currentPageView.model.id != post_id){ // js render

      var post = App.currentPosts.get(post_id);

      if(!post){
        post = App.currentPosts.add({ id : post_id }).get(post_id);
        post.fetch();
      }

      App.currentPageView = new App.views.Post({ model : post });

    } else { // rendered by js
      // do nothing
    }

  }

});