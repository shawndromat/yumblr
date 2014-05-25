window.Yumblr.Models.IngredientEntry = Backbone.Model.extend({
  initialize: function (options) {
    this.recipe = options.recipe;
  },
  urlRoot: function () {
    return this.recipe.url() + "/ingredient_entries"
  }
});
