
/*
 * All routes.
 */

module.exports = function(app){

	// GET home page.
	app.get("/", function(req, res){

		res.render('index');
	});


	// GET a blog entry.
	app.get("/posts/:post_id", function(req, res){
		console.log("id - ", req.params.post_id);
		app.reed.get(req.params.post_id, function(err, metadata, htmlContent){
			if(err || req.params.post_id != metadata.id || !htmlContent){
				res.render("errors/500");
			}
			console.log("out id - ", metadata.id);
			res.render('post', { content : htmlContent, meta : metadata });
		});
	});


	// GET recent posts.
	app.get("/ajax/recentposts", function(req, res){

		app.getRecentPosts(app, function(err, posts){
			if(err){
				res.render("errors/500");
			}
			res.json(posts);
		});
	});


	// GET a blog content.
	app.get("/ajax/posts/:post_id", function(req, res){
		console.log("id - ", req.params.post_id);

		app.reed.get(req.params.post_id, function(err, metadata, htmlContent){
			console.log("out id - ", metadata.id);
			if(err || req.params.post_id != metadata.id || !htmlContent){
				res.render("errors/500");
			}
			res.json({ content : htmlContent, meta : metadata });
		});
	});

};

