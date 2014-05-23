window.Yumblr.Models.IngredientEntry = Backbone.Model.extend({
  urlRoot: function () {
    return this.collection.recipe.url() + "/ingredient_entries"
  }
});
