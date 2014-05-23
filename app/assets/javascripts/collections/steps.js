window.Yumblr.Collections.RecipeSteps = Backbone.Collection.extend({
  model: Yumblr.Models.Step,
  initialize: function (models, options) {
    this.recipe = options.recipe
  }
});
