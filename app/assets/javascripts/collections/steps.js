window.Yumblr.Collections.RecipeSteps = Backbone.Collection.extend({
  model: Yumblr.Models.Step,
  initialize: function (models, options) {
    this.recipe = options.recipe;
  },
  // url: function () {
  //   return "/api/recipes/" + this.recipe.id + "/steps"
  // }
});
