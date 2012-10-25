
/*
 * RECENT posts
 */


module.exports = function(app, callback){

	app.allPosts = app.allPosts || []; // save titles for all posts
	app.recentPosts = app.recentPosts || []; // save meta for top 10 posts

	if(app.allPosts.length == 0){

		app.reed.list(function(err, titles){

			app.allPosts = titles;

			var length = Math.min(10, titles.length);

			app.reed.getMetadata(titles[0], savePost);

			function savePost(err, meta){

				delete meta.markdown;
				app.recentPosts.push(meta);

				if(app.recentPosts.length == length) {
					callback(false, app.recentPosts);
				} else {
					app.reed.getMetadata(titles[app.recentPosts.length], savePost);
				}
			};

		});

	} else {

		callback(false, app.recentPosts);
	}

}