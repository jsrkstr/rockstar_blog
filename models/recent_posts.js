
/*
 * RECENT posts
 */


module.exports = function(app, callback){

	app.allPosts = app.allPosts || []; // save titles for all posts
	app.recentPosts = app.recentPosts || []; // save meta for top 10 posts

	if(app.allPosts.length == 0){

		app.reed.all(function(err, posts){

			for (var i = 0; i < posts.length; i++) {
				delete posts[i].htmlContent;
				delete posts[i].metadata.markdown;

				app.allPosts.push(posts[i].metadata);
			};

			app.recentPosts = app.allPosts.slice(0, 10);

			callback(false, app.recentPosts);
		});

	} else {

		callback(false, app.recentPosts);
	}

}