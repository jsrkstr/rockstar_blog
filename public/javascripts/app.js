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

        this.hijackLink();

    },


    hijackLink : function(){
        // Use absolute URLs  to navigate to anything not in your Router.

        // Only need this for pushState enabled browsers
        if (Backbone.history && Backbone.history._hasPushState) {

          // Use delegation to avoid initial DOM selection and allow all matching elements to bubble
          $(document).delegate("a", "click", function(evt) {
            // Get the anchor href and protcol
            var href = $(this).attr("href");
            var protocol = this.protocol + "//";

            // Ensure the protocol is not part of URL, meaning its relative.
            // Stop the event bubbling to ensure the link will not cause a page refresh.
            if (href.slice(protocol.length) !== protocol) {
              evt.preventDefault();

              // Note by using Backbone.history.navigate, router events will not be
              // triggered.  If this is a problem, change this to navigate on your
              // router.
              Backbone.history.navigate(href, true);
            }
          });

        }
    }

};


// Start here...
$($.proxy(App.init, App));

_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};