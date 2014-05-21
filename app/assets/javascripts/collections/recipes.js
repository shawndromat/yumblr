window.Yumblr.Collections.Recipes = Backbone.Collection.extend({
  model: Yumblr.Models.Recipe,
  url: "/api/recipes",
  getOrFetch: function (id) {
    var recipe = this.get(id);
    if (recipe) {
      recipe.fetch();
      return recipe;
    } else {
      recipe = new Yumblr.Models.Recipe({id: id});
      recipe.fetch();
      this.add(recipe);
      return recipe;
    }
  }
});
