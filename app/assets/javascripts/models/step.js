window.Yumblr.Models.Step = Backbone.Model.extend({
  initialize: function (options) {
    this.recipe = options.recipe || Yumblr.recipes.getOrFetch(options.recipe_id);
  },
  urlRoot: function () {
    return this.recipe.url() + "/steps";
  }
});
