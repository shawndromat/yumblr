Yumblr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  routes: {
    "": "recipeIndex",
    "recipes/new": "recipeShow",
    "recipes/:id/edit": "recipeEdit",
    "recipes/:id": "recipeShow"
  },
  recipeIndex: function () {
    Yumblr.recipes.fetch();
    var indexView = new Yumblr.Views.RecipesIndex({
      collection: Yumblr.recipes
    });
    this._swapView(indexView);
  },
  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.leave();
    }
    this.currentView = view;
    this.$rootEl.html(this.currentView.render().$el);
  }

});
