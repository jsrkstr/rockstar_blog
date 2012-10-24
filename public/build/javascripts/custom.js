/*! JSRockstar.in - v0.1 - 2012-10-24
* http://jsrockstar.in
* Copyright (c) 2012; */

var allJs = 'public/javascripts/jquery-1.8.2.min.js,public/javascripts/jquery.mousewheel.min.js,public/javascripts/app.js'.split(',');
var sIndex = 0;
function getS(){
if(sIndex < allJs.length){
s = document.createElement('script');
s.setAttribute('src', allJs[sIndex].replace('public/', ''));
s.onload = getS;
document.head.appendChild(s);
sIndex++;
}
};
getS();
