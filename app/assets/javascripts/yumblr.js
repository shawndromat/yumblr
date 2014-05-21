window.Yumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Yumblr.recipes = new Yumblr.Collections.Recipes();
    new Yumblr.Routers.AppRouter({
      $rootEl: $("#content"),
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Yumblr.initialize();
});
