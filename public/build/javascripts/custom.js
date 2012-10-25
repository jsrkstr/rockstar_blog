/*! JSRockstar.in - v0.1 - 2012-10-25
* http://jsrockstar.in
* Copyright (c) 2012; */

var allJs = 'public/javascripts/jquery-1.8.2.min.js,public/javascripts/jquery.mousewheel.min.js,public/javascripts/underscore.js,public/javascripts/backbone.js,public/javascripts/app.js,public/javascripts/collections/recent_posts.js,public/javascripts/collections/posts.js,public/javascripts/views/recent_post.js,public/javascripts/views/post.js,public/javascripts/router/router.js'.split(',');
var sIndex = 0;
function getS(){
if(sIndex < allJs.length){
s = document.createElement('script');
s.setAttribute('src', allJs[sIndex].replace('public', ''));
s.onload = getS;
document.head.appendChild(s);
sIndex++;
}
};
getS();
