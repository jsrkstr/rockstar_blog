
/*
 * All routes.
 */

module.exports = function(app){

	app.get("/planeup", function(req, res){
		res.redirect("/planeup/index.html");
	});

	// GET home page.
	app.get("/", function(req, res){

		res.render('index', { allPosts : app.allPosts || [] });
	});


	// GET a blog entry.
	app.get("/posts/:post_id", function(req, res){

		app.reed.get(req.params.post_id, function(err, metadata, htmlContent){
			if(err || req.params.post_id != metadata.id || !htmlContent){
				res.render("errors/500");
			}

			res.render('post', { content : htmlContent, meta : metadata, allPosts : app.allPosts || [] });
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
			console.log("error - ", err);
			
			if(err){
				res.render("errors/500");
			}

			if(req.params.post_id != metadata.id){
				console.log("ids not matched");
				res.render("errors/500");
			}

			if(!htmlContent){
				console.log("no html content");
				res.render("errors/500");
			}

			res.json({ content : htmlContent.toString("utf8") , meta : metadata });

		});
	});

};

