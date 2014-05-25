Yumblr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  routes: {
    "": "recipeIndex",
    "recipes/new": "recipeNew",
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
  recipeShow: function (id) {
    
    var recipe = Yumblr.recipes.getOrFetch(id);
    var showView = new Yumblr.Views.RecipeShow({
      model: recipe
    });
    recipe.fetch();
    this._swapView(showView);
  },
  recipeNew: function () {
    var newRecipe = new Yumblr.Models.Recipe();
    var formView = new Yumblr.Views.RecipeForm({
      model: newRecipe,
      collection: Yumblr.recipes
    });
    this._swapView(formView);
  },
  recipeEdit: function (id) {
    var recipe = Yumblr.recipes.getOrFetch(id);
    var formView = new Yumblr.Views.RecipeForm({
      model: recipe,
      collection: Yumblr.recipes
    });
    this._swapView(formView);
  },
  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(this.currentView.render().$el);
  }
});
