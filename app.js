
/**
 * Module dependencies.
 */

var express = require('express')
  , partials = require('express-partials')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , gzippo = require('gzippo');


var app = express();

// load the express-partials middleware
app.use(partials());

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'ejs');
  app.engine('ejs', require('ejs').renderFile);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(gzippo.staticGzip(__dirname + '/public', { contentTypeMatch : /text|javascript|json|font/ }));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.reed = require('reed');
app.reed.open("./public/posts");

app.getRecentPosts = require("./models/recent_posts");

// setup all routes
routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
