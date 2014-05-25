window.Yumblr.Models.IngredientEntry = Backbone.Model.extend({
  initialize: function (options) {
    this.recipe = options.recipe || Yumblr.recipes.getOrFetch(options.recipe_id);
  },
  urlRoot: function () {
    return this.recipe.url() + "/ingredient_entries"
  }
});
