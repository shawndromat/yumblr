window.Yumblr.Collections.IngredientEntries = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.recipe = options.recipe;
  },
  model: Yumblr.Models.IngredientEntry
})
