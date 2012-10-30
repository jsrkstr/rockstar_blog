// function Resize(){
//     var tiles_area = 0;
//     $(".tile-group").each(function(){
//         tiles_area += $(this).outerWidth() + 80;

//     });

//     $(".tiles").css("width", 120 + tiles_area + 20);

//     $(".page").css({
//         height: $(document).height() - 20,
//         width: $(document).width()
//     });
// }

// function AddMouseWheel(){
//     $("body").mousewheel(function(event, delta){
//         var scroll_value = delta * 50;
//         if (!jQuery.browser.chrome) {
//             document.documentElement.scrollLeft -= scroll_value;
//         } else {
//             this.scrollLeft -= scroll_value;
//         }
//         return false;
//     });
// }



App = {

    models : {},

    views : {},

    collections : {},

    init : function(){
        // AddMouseWheel();

        App.currentPosts = new App.collections.Posts();

        App.allPosts = new Backbone.Collection(_all_posts);

        App.router = new App.Router();

        Backbone.history.start({ pushState : true });
        // Resize();
    }

};


// Start here...
$($.proxy(App.init, App));

_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};